import { IApiModule } from '../../../modules/ApiModuleRegistration';
import { RouteRegistry, HttpMethod } from '../../../routing/RouteRegistry';
import { OrganizationController } from '../controllers/OrganizationController';
import { OrganizationValidation } from '../validation/OrganizationValidation';

export class OrganizationModule implements IApiModule {
    public registerRoutes(registry: RouteRegistry): void {
        const controller = new OrganizationController();

        registry.register({
            path: '/organizations',
            method: HttpMethod.POST,
            handler: controller.create.bind(controller),
            middlewares: [OrganizationValidation.validateCreate]
        });

        registry.register({
            path: '/organizations',
            method: HttpMethod.GET,
            handler: controller.getAll.bind(controller)
        });

        registry.register({
            path: '/organizations/:id',
            method: HttpMethod.GET,
            handler: controller.getById.bind(controller)
        });

        registry.register({
            path: '/organizations/:id/deactivate',
            method: HttpMethod.PATCH,
            handler: controller.deactivate.bind(controller)
        });

        registry.register({
            path: '/organizations/:id',
            method: HttpMethod.DELETE,
            handler: controller.delete.bind(controller)
        });
    }
}
