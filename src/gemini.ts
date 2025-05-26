import { GenerateContentConfig, GoogleGenAI } from '@google/genai';

export default {
	async translate(apiKey: string, text: string) {
		const ai = new GoogleGenAI({ apiKey });
		const model = 'gemma-3-4b-it';
		const config: GenerateContentConfig = {
			temperature: 0,
		};
		const contents = `Translate this economic news headline accurately and concisely into Korean; keep English initials and English proper nouns untranslated, translate non-English terms naturally into Korean; output only the translated headline without additional commentary: ${text}`;
		const response = await ai.models.generateContent({
			model,
			contents,
			config,
		});
		await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 대기
		return response.text?.trim() ?? '';
	},
};
