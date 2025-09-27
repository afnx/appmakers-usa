import dotenv from 'dotenv';
dotenv.config();

// Load environment variables from .env file
const env = process.env;

// Check if required environment variables exist
if (!env) {
    throw new Error('No .env file found.');
}

export default {
    // Server configuration
    port: env.SERVER_PORT || 5000,
    host: env.SERVER_HOST || 'localhost',
    serverUrl: env.SERVER_URL || 'http://localhost:5000',
    // React app configuration
    reactApp: {
        url: env.REACT_APP_URL || 'http://localhost:3000',
    }
};