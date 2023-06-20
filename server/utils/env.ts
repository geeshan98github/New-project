import dotenv from 'dotenv';
import path from 'path';
import {getOsEnvOptional, getOsEnvOrThrow, normalizePort} from './server-utils';

dotenv.config({ path: path.join(process.cwd(), '.env') });

if (!['production', 'staging', 'development'].includes(getOsEnvOrThrow('SP_ENV') || '')) {
    throw new Error('Missing SP_ENV or SP_ENV is not valid');
}

if (!process.env.SP_SERVER_PORT || process.env.SP_SERVER_PORT === '' || isNaN(Number(getOsEnvOptional('SP_SERVER_PORT')))) {
    process.env.SP_SERVER_PORT = (process.env.SP_ENV === 'production') ? '6000' : '6001';
}

export const env = {
    isProduction: process.env.SP_ENV === 'production',
    isDevelopment: process.env.SP_ENV !== 'production',
    isStaging: process.env.SP_ENV === 'staging',
    port: normalizePort(process.env.SP_SERVER_PORT),
};
