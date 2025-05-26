import { GenerateContentConfig, GoogleGenAI } from '@google/genai';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

enum Gemma3 {
	_4b = 'gemma-3-4b-it',
	_27b = 'gemma-3-27b-it',
}

export default {
	async translate(apiKey: string, text: string) {
		const contents = `Translate English economic news headlines into Korean with professional accuracy, clarity, and conciseness, ensuring detailed contextual understanding and appropriate nuance; maintain English initials (e.g., GDP, IMF, ETF), acronyms, specialized financial terminology, and proper nouns such as names of corporations or institutions exactly as they appear, untranslated; translate any non-English terms (e.g., Japanese, Chinese, or other foreign-language terms) naturally into fluent Korean without using original foreign characters (such as hanja or kana), ensuring all translations are fully comprehensible to general Korean audiences; clearly and explicitly convey the headline’s economic significance, financial implications, market context, corporate activity, or policy details precisely as intended by authoritative sources like Bloomberg, CNBC, Financial Times, The Economist, or Wall Street Journal; provide only the final Korean translated headline text itself, strictly excluding any additional commentary, explanations, notes, transliterations, quotation marks, or parenthetical clarifications. ${text}`;
		return this.useModel(apiKey, Gemma3._27b, contents);
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
