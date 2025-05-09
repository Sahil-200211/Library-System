import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME:string = process.env.MONGOO_USERNAME || '';
const MONGO_PASSWORD:string = process.env.MONGO_PASSWORD || '';

const MONGO_URL:string = `mongodb://user:password@localhost:27017/librarydb?authMechanism=DEFAULT`;

const PORT:number = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 8000;
const ROUNDS:number = process.env.SERVER_ROUNDS ? Number(process.env.SERVER_ROUNDS) : Math.floor(Math.random() * 11);

export const config = {
    mongo: {
        url: MONGO_URL
    },

    server: {
        port: PORT,
        rounds: ROUNDS
    },

    openaiApiKey: process.env.LMSTUDIO_API_KEY || '',
    openaiBaseUrl: process.env.LMSTUDIO_API_BASE_URL || 'http://localhost:1234/v1',
};

if (!config.openaiApiKey) {
    throw new Error('OpenAI API key is not set in the environment variables.');
}