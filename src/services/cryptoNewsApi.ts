import axios from 'axios';
import { API_CONFIG } from '../config/api';

const cryptoNewsApi = axios.create({
  baseURL: API_CONFIG.CRYPTO_NEWS_BASE_URL,
});

export const fetchCryptoNews = async (query: string = 'crypto', items: number = 20) => {
  try {
    const response = await cryptoNewsApi.get('/?tickers=' + query + '&items=' + items + '&token=' + API_CONFIG.CRYPTO_NEWS_API_KEY);
    return response.data.data; // The API returns data in a 'data' field
  } catch (error) {
    console.error('Error fetching Crypto News API news:', error);
    throw error;
  }
}; 