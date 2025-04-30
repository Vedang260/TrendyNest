import { Middleware } from '@reduxjs/toolkit';
import { AuthState } from '../../types/auth/auth';

export const persistMiddleware: Middleware = (store) => (next) => (action: any) => {
  const result = next(action);

  if (action.type === 'auth/login') {
    const { user, token } = store.getState().auth as AuthState;
    sessionStorage.setItem('authUser', JSON.stringify(user));
    sessionStorage.setItem('authToken', token || '');
  } else if (action.type === 'auth/logout') {
    sessionStorage.removeItem('authUser');
    sessionStorage.removeItem('authToken');
  }

  return result;
};