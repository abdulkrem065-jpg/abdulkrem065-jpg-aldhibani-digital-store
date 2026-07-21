import { ApiConfig } from '../config/ApiConfigurationLoader';

export class ApiBootVerification {
    public static verify(config: ApiConfig): void {
        if (!config.port || isNaN(config.port)) {
            throw new Error('API Boot Verification Failed: Invalid PORT configuration.');
        }
        if (!config.basePath || !config.basePath.startsWith('/')) {
            throw new Error('API Boot Verification Failed: Invalid API_BASE_PATH configuration.');
        }
        console.log(`[API] Boot verification passed. Validation constraints satisfied.`);
    }
}
