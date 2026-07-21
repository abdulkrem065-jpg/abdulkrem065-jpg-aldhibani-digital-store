export interface ApiConfig {
    port: number;
    basePath: string;
    enableDocs: boolean;
}

export class ApiConfigurationLoader {
    public static load(): ApiConfig {
        return {
            port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
            basePath: process.env.API_BASE_PATH || '/api',
            enableDocs: process.env.API_DOCS_ENABLED === 'true'
        };
    }
}
