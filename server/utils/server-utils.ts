import path from 'path';


export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function getOsEnvOrThrow(key?: string): string {
    if (!key) {
        throw new Error('Environment variable key is not set.');
    }
    if (typeof process.env[key] === 'undefined') {
        throw new Error(`Environment variable ${key} is not set.`);
    }

    return process.env[key] as string;
}

export function getOsEnvOptional(key: string): string | undefined {
    return process.env[key];
}

export function normalizePort(port: string): number | string | boolean {
    const parsedPort = parseInt(port, 10);
    if (isNaN(parsedPort)) { // named pipe
        return port;
    }
    if (parsedPort >= 0) { // port number
        return parsedPort;
    }
    return false;
}

export function absServerProjectRoot() {
    return path.join(__dirname, '..');
}

export function hourInMs(hour: number) {
    return hour * 60 * 60 * 1000;
}
