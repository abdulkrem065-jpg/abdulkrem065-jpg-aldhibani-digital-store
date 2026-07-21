import { IConfigurationValidator } from './interfaces';

export class DefaultConfigurationValidator implements IConfigurationValidator {
    public validate(config: Record<string, any>): void {
        // Base implementation allows for schema-less validation by default
        // In real domains, this can be swapped with a Zod or Joi validator via DI/Kernel extensions
        if (!config || typeof config !== 'object') {
            throw new Error("Configuration must be a valid object.");
        }
    }
}
