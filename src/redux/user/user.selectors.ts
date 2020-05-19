import { createSelector } from 'reselect';
import { AppState } from '../root.reducer';

const selectUser = (state: AppState) => state.userState;

export const selectError = createSelector(
	[selectUser],
	(userState) => userState.error
);

export const selectLoading = createSelector(
	[selectUser],
	(userState) => userState.loading
);

export const selectIsAuth = createSelector(
	[selectUser],
	(userState) => !!userState.user
);
