import { Router } from 'express';

export class VersioningArchitecture {
    public static applyVersion(version: string, router: Router): Router {
        const versionRouter = Router();
        versionRouter.use(`/${version}`, router);
        return versionRouter;
    }
}
