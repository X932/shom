import { EndpointMetaData } from '../models/endpoints.type';
import { CreateEndpointDto } from '../models/endpoints.dto';

export function getNewEndpointSub() {
  const endpoint = new CreateEndpointDto();
  endpoint.key = 'DELETE /api/users';
  endpoint.title = 'Delete user';
  return endpoint;
}

export function createSubEndpoint() {
  const subEndpoint = new EndpointMetaData();
  subEndpoint.id = 0;
  subEndpoint.key = 'GET /api/users';
  subEndpoint.title = 'Get users';
  return subEndpoint;
}

export function getEndpointsSub(params: { where: EndpointMetaData }) {
  const subEndpointGetUsers = createSubEndpoint();

  const subEndpointUpdateUser = new EndpointMetaData();
  subEndpointUpdateUser.id = 1;
  subEndpointUpdateUser.key = 'PUT /api/users';
  subEndpointUpdateUser.title = 'Update user data';
  const endpoints = [subEndpointGetUsers, subEndpointUpdateUser];

  return endpoints.filter(
    (endpoint) =>
      endpoint.id === params.where.id &&
      endpoint.key === params.where.key &&
      endpoint.title === params.where.title,
  );
}
