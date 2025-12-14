const API_URL = import.meta.env.VITE_API_URL;
const STATIC_URL = import.meta.env.VITE_STATIC_URL;

export const ENDPOINTS = {
  static: {
    avatar: (path) => `${STATIC_URL}${path}`,
  },
  auth: {
    login: `${API_URL}/auth/login`,
    register: `${API_URL}/auth/register`,
    roles: `${API_URL}/auth/roles`,
  },
  cards: {
    list: `${API_URL}/cards`,
    create: `${API_URL}/cards/create`,
    delete: (id) => `${API_URL}/cards/${id}`,
    show: (id) => `${API_URL}/cards/${id}/show`,
    update: (id) => `${API_URL}/cards/${id}/edit`,
  },
  cart: {
    get: `${API_URL}/cart`,
    sync: `${API_URL}/cart/sync`,
  },
  inventory: {
    list: `${API_URL}/inventory`,
    show: (id) => `${API_URL}/inventory/${id}/show`,
  },
  permissions: {
    list: `${API_URL}/permissions`,
    create: `${API_URL}/permissions/create`,
    delete: (id) => `${API_URL}/permissions/${id}`,
    show: (id) => `${API_URL}/permissions/${id}/show`,
    update: (id) => `${API_URL}/permissions/${id}/edit`,
  },
  profile: {
    me: `${API_URL}/profile`,
    update: (id) => `${API_URL}/profile/${id}/edit`,
    changePassword: (id) => `${API_URL}/profile/${id}/password`,
    updateAvatar: `${API_URL}/users/avatar`,
  },
  purchases: {
    list: `${API_URL}/purchases`,
    create: `${API_URL}/purchases/create`,
  },
  roles: {
    list: `${API_URL}/roles`,
    create: `${API_URL}/roles/create`,
    delete: (id) => `${API_URL}/roles/${id}`,
    show: (id) => `${API_URL}/roles/${id}/show`,
    update: (id) => `${API_URL}/roles/${id}/edit`,
  },
  users: {
    list: `${API_URL}/users`,
    create: `${API_URL}/users/create`,
    delete: (id) => `${API_URL}/users/${id}`,
    show: (id) => `${API_URL}/users/${id}/show`,
    update: (id) => `${API_URL}/users/${id}/edit`,
    restore: (id) => `${API_URL}/users/${id}/restore`,
  },
  store: {
    list: `${API_URL}/store`
  },
  contacts: {
    list: `${API_URL}/contacts`,
    create: `${API_URL}/contacts/create`,
    delete: (id) => `${API_URL}/contacts/${id}`,
    show: (id) => `${API_URL}/contacts/${id}/show`
  }
};