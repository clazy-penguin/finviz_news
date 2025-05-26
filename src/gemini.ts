import { GenerateContentConfig, GoogleGenAI } from '@google/genai';

export default {
	async translate(apiKey: string, text: string) {
		const ai = new GoogleGenAI({ apiKey });
		const model = 'gemma-3-4b-it';
		const config: GenerateContentConfig = {
			temperature: 0,
		};
		const contents = `You are an expert translator specialized in translating economic news headlines from English to Korean, maintaining accuracy, clarity, and conciseness. Translate the following English economic news headline into fluent, concise, and natural Korean. Ensure financial and economic terminologies are accurately translated and contextually appropriate. Do not translate English initials or proper nouns; keep them as-is. The headline is from a reputable economic news outlet, covering global market movements, financial trends, corporate performance, or economic policy updates. The translation is intended for a Korean audience familiar with basic economic terms. Return only the translated Korean headline, without any additional commentary, quotation marks, or explanations. ${text}`;
		const response = await ai.models.generateContent({
			model,
			contents,
			config,
		});
		return response.text?.trim() ?? '';
	},
};
