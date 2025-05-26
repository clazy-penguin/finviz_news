import discord from './discord';
import finviz from './finviz';
import gemini from './gemini';

export default {
	async fetch(req) {
		const url = new URL(req.url);
		url.pathname = '/__scheduled';
		url.searchParams.append('cron', '* * * * *');
		return new Response(`To test the scheduled handler, ensure you have used the "--test-scheduled" then try running "curl ${url.href}".`);
	},

	async scheduled(_, env, __): Promise<void> {
		const news = await finviz.load(env.FINVIZ_NEWS);
		if (news.length === 0) {
			console.log('뉴스 없음');
			return;
		}
		console.log('뉴스 있음');
		for (const item of news) {
			const isRelated = await gemini.evaluate(env.GEMINI_API_KEY, item.title);
			if (!isRelated) {
				console.log(`관련 없는 뉴스: ${item.title}`);
				continue;
			}
			const koreanTitle = await gemini.translate(env.GEMINI_API_KEY, item.title);
			await discord.sendMessage(env.DISCORD_WEBHOOK_URL, `- [${koreanTitle} (${item.title})](${item.link})`);
		}
	},
} satisfies ExportedHandler<Env>;
