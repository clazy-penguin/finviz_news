import ky from 'ky';

export default {
	async sendMessage(url: string, content: string): Promise<void> {
		try {
			await ky.post(url, {
				json: {
					content,
				},
				headers: {
					'Content-Type': 'application/json',
				},
			});
			console.log('전송 성공');
		} catch {
			console.error('전송 실패');
		}
	},
};
