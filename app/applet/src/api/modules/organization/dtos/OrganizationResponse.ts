import { OrganizationDto } from './OrganizationDto';

export interface OrganizationListResponse {
    organizations: OrganizationDto[];
}

export interface OrganizationResponse {
    organization: OrganizationDto;
}
