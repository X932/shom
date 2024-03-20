import { ROUTES } from '@constants/routes';
import { CreateEndpointDto } from './endpoints.dto';

export const ENDPOINTS: CreateEndpointDto[] = [
  {
    key: `${ROUTES.BASE}${ROUTES.ACCOUNTS} GET`,
    title: 'получение списка счетов',
  },
  {
    key: `${ROUTES.BASE}${ROUTES.ACCOUNTS_HISTORY}${ROUTES.ACCOUNTS_STATISTIC} GET`,
    title: 'получение статистики',
  },
  {
    key: `${ROUTES.BASE}${ROUTES.BRANCHES} GET`,
    title: 'получение списка точек',
  },
  {
    key: `${ROUTES.BASE}${ROUTES.ENDPOINTS} GET`,
    title: 'получение списка эндпоинтов',
  },
  {
    key: `${ROUTES.BASE}${ROUTES.ENDPOINTS} POST`,
    title: 'создание эндпоинта',
  },
  {
    key: `${ROUTES.BASE}${ROUTES.ENDPOINTS} PUT`,
    title: 'изменение эндпоинта',
  },
  {
    key: `${ROUTES.BASE}${ROUTES.ENDPOINTS} DELETE`,
    title: 'удаление эндпоинта',
  },
  {
    key: `${ROUTES.BASE}${ROUTES.PRODUCTS} GET`,
    title: 'получение списка продуктов',
  },
  {
    key: `${ROUTES.BASE}${ROUTES.PRODUCTS} POST`,
    title: 'создание продукта',
  },
  {
    key: `${ROUTES.BASE}${ROUTES.PRODUCTS} PUT`,
    title: 'изменение продукта',
  },
  {
    key: `${ROUTES.BASE}${ROUTES.PRODUCTS} DELETE`,
    title: 'удаление продукта',
  },
  {
    key: `${ROUTES.BASE}${ROUTES.ROLES} GET`,
    title: 'получение списка ролей',
  },
  {
    key: `${ROUTES.BASE}${ROUTES.ROLES} POST`,
    title: 'создание роли',
  },
  {
    key: `${ROUTES.BASE}${ROUTES.ROLES} PUT`,
    title: 'изменение роли',
  },
  {
    key: `${ROUTES.BASE}${ROUTES.ROLES} DELETE`,
    title: 'удаление роли',
  },
  {
    key: `${ROUTES.BASE}${ROUTES.USERS} GET`,
    title: 'получение списка юзеров',
  },
  {
    key: `${ROUTES.BASE}${ROUTES.USERS} PUT`,
    title: 'изменение юзера',
  },
  {
    key: `${ROUTES.BASE}${ROUTES.USERS} DELETE`,
    title: 'удаление юзера',
  },
  {
    key: `${ROUTES.BASE}${ROUTES.INVENTORY} GET`,
    title: 'получение списка складов',
  },
  {
    key: `${ROUTES.BASE}${ROUTES.INVOICES} POST`,
    title: 'создание инвойса',
  },
  {
    key: `${ROUTES.BASE}${ROUTES.MEDIA} POST`,
    title: 'создание медиа',
  },
  {
    key: `${ROUTES.BASE}${ROUTES.MEDIA} DELETE`,
    title: 'удаление медиа',
  },
];
