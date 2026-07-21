import { IKernelHook } from '../bootstrap/interfaces';
import { ConfigurationManager } from './ConfigurationManager';
import { IConfigurationSource, IConfigurationValidator } from './interfaces';

export class ConfigurationBootHook implements IKernelHook {
    public readonly name = 'ConfigurationBootHook';

    constructor(
        private manager: ConfigurationManager,
        private sources: IConfigurationSource[],
        private validator: IConfigurationValidator
    ) {}

    public async execute(): Promise<void> {
        // 1. Load from all registered sources (e.g. Defaults -> Env)
        await this.manager.load(this.sources);
        
        // 2. Validate configuration against schema/rules
        this.manager.validate(this.validator);
        
        // 3. Freeze configuration making it deeply immutable per QEOS specs
        this.manager.freeze();
    }
}
