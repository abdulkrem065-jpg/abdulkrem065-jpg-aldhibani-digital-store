import { IConfigurationSource } from './interfaces';

export class EnvConfigurationSource implements IConfigurationSource {
    public readonly name = 'Environment Variables';

    constructor(private prefix: string = 'QEOS_') {}

    public async load(): Promise<Record<string, any>> {
        const config: Record<string, any> = {};
        for (const [key, value] of Object.entries(process.env)) {
            if (key.startsWith(this.prefix)) {
                // e.g. QEOS_DB_HOST -> db.host
                const cleanKey = key.slice(this.prefix.length).toLowerCase().replace(/_/g, '.');
                this.setNested(config, cleanKey, value);
            }
        }
        return config;
    }

    private setNested(obj: any, path: string, value: any) {
        const keys = path.split('.');
        let current = obj;
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (!current[key]) {
                current[key] = {};
            }
            current = current[key];
        }
        
        current[keys[keys.length - 1]] = this.parseValue(value);
    }
    
    private parseValue(val: any): any {
        if (val === 'true') return true;
        if (val === 'false') return false;
        if (val !== null && val !== undefined && val.trim() !== '' && !isNaN(Number(val))) {
            return Number(val);
        }
        return val;
    }
}
