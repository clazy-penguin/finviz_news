import * as cheerio from 'cheerio';
import ky from 'ky';

interface News {
	title: string;
	link: string;
}

export default {
	async load(kv: KVNamespace<string>) {
		const url = 'https://finviz.com/news.ashx';
		const response = await ky.get(url, {
			headers: {
				'User-Agent': 'Mozilla/5.0',
			},
		});
		// console.log(response.status);
		const $ = cheerio.load(await response.text());
		const news = $('table.styled-table-new').first();
		const rows = news.find('a');
		const results: News[] = [];
		for (const row of rows) {
			const link = $(row).attr('href') || '';
			if ((await kv.get(link)) !== null) {
				console.log(`중복된 링크: ${link}`);
				break;
			}
			const title = $(row).text();
			results.push({ title, link });
		}
		await kv.put($(rows[0]).attr('href') || '', new Date().toISOString(), { expirationTtl: 60 * 60 });
		return results.reverse();
	},
};
