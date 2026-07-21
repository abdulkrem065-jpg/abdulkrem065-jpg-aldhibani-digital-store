import { SupabaseClient } from '@supabase/supabase-js';
import { ApiBootstrap } from '../../api/bootstrap/ApiBootstrap';
import { ApiConfigurationLoader } from '../../api/config/ApiConfigurationLoader';

export class Application {
    private server: any;

    constructor(
        public readonly api: ApiBootstrap,
        public readonly supabase: SupabaseClient
    ) {}

    public async start(): Promise<void> {
        console.log('[Application] Starting application composition...');
        await this.api.run();
        
        const config = ApiConfigurationLoader.load();
        const app = this.api.getApp();

        return new Promise((resolve) => {
            this.server = app.listen(config.port, '0.0.0.0', () => {
                console.log(`[Application] Application started successfully. Listening on port ${config.port}`);
                resolve();
            });
        });
    }

    public async stop(): Promise<void> {
        console.log('[Application] Stopping application...');
        if (this.server) {
            return new Promise((resolve, reject) => {
                this.server.close((err: any) => {
                    if (err) return reject(err);
                    console.log('[Application] Application stopped cleanly.');
                    resolve();
                });
            });
        }
        console.log('[Application] Application stopped cleanly.');
    }
}
