import { createSelector } from 'reselect';
import { AppState } from '../root.reducer';

const selectUserState = (state: AppState) => state.userState;

export const selectError = createSelector(
	[selectUserState],
	(userState) => userState.error
);

export const selectLoading = createSelector(
	[selectUserState],
	(userState) => userState.loading
);

export const selectUser = createSelector(
	[selectUserState],
	(userState) => userState.user
);

export const selectUserProviderId = createSelector(
	[selectUser],
	(user) => user?.providerId!
);

export const selectIsAuth = createSelector(
	[selectUserState],
	(userState) => !!userState.user
);
