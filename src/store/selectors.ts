import type {RootState} from './index';

export const selectAuthorizationStatus = (state: RootState) => state.auth.authorizationStatus;
