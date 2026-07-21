import { IConfigurationSource } from './interfaces';

export class StaticConfigurationSource implements IConfigurationSource {
    public readonly name = 'Static Defaults';

    constructor(private readonly defaults: Record<string, any>) {}

    public async load(): Promise<Record<string, any>> {
        // Return a deep copy to prevent mutation of the original defaults object
        return JSON.parse(JSON.stringify(this.defaults));
    }
}
