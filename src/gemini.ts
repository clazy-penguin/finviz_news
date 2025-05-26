import { GenerateContentConfig, GoogleGenAI } from '@google/genai';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

enum Gemma3 {
	_4b = 'gemma-3-4b-it',
	_27b = 'gemma-3-27b-it',
}

export default {
	async translate(apiKey: string, text: string) {
		const contents = `Translate English economic news headlines into Korean with professional accuracy, clarity, and conciseness, ensuring detailed contextual understanding and appropriate nuance; maintain English initials (e.g., GDP, IMF, ETF), acronyms, specialized financial terminology, and proper nouns such as names of corporations or institutions exactly as they appear, untranslated; translate any non-English terms (e.g., Japanese, Chinese, or other foreign-language terms) naturally into fluent Korean without using original foreign characters (such as hanja or kana), ensuring all translations are fully comprehensible to general Korean audiences; clearly and explicitly convey the headline’s economic significance, financial implications, market context, corporate activity, or policy details precisely as intended by authoritative sources like Bloomberg, CNBC, Financial Times, The Economist, or Wall Street Journal; provide only the final Korean translated headline text itself, strictly excluding any additional commentary, explanations, notes, transliterations, quotation marks, or parenthetical clarifications. ${text}`;
		return this.useModel(apiKey, Gemma3._4b, contents);
	},

	async evaluate(apiKey: string, text: string) {
		const contents = `You are an expert financial analyst strictly evaluating English-language economic news headlines to determine if the provided headline, "${text}", explicitly and directly reports market-moving events, critical economic indicators, significant monetary policy decisions, notable changes in bond yields or interest rates, substantial currency exchange rate movements (particularly USD/KRW), or major developments affecting indices and assets specifically included in the user's portfolio: ETFs tracking the U.S. S&P 500 (including covered call strategies), U.S. Treasury bonds (10-year and 30-year, including covered call ETFs), Korean equities (KOSPI200 covered call ETFs), Chinese equities (CSI300 ETFs), gold (spot and covered call ETFs), and a mutual fund tracking the U.S. S&P 500 without currency hedging; strictly exclude subjective analyses, opinion pieces, speculative commentaries, columns, or general financial advice, responding only with "T" if the headline directly and objectively reports information significantly relevant and immediately actionable for investment decisions tied to the portfolio described, or "F" if not, without any additional explanation, commentary, or clarification.`;
		let result;
		while (true) {
			result = await this.useModel(apiKey, Gemma3._27b, contents);
			if (result === 'T' || result === 'F') {
				break;
			}
		}
		return result === 'T';
	},

	async useModel(apiKey: string, model: string, contents: string) {
		const ai = new GoogleGenAI({ apiKey });
		const response = await ai.models.generateContent({
			model,
			contents,
		});
		await sleep(1000); // 1초 대기
		return response.text?.trim() ?? '';
	},
};
