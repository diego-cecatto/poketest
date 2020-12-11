import axios from 'axios';

export default {
	async getGenerations() {
		const result = await axios.get('');
		return result;
	}
}