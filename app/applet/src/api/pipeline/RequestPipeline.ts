import { Router } from 'express';
import { ApiLoggingIntegration } from '../middleware/ApiLoggingIntegration';
import { SecurityEntryGate } from '../middleware/SecurityEntryGate';

export class RequestPipeline {
    public static configure(router: Router): void {
        router.use(ApiLoggingIntegration.logRequest);
        router.use(SecurityEntryGate.verify);
        // Core parsers and configuration should be appended here
    }
}
