import {UserProfile} from "../../../models/userProfile.model";
import * as UserActions from './userActions';
import {ActionReducerMap, createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";

export interface UserState {
  user: UserProfile;
}

const initialUserState: UserState = {
  user: new UserProfile(),
};

export const userReducer = (state = initialUserState,
                            action: UserActions.UserActions ): UserState => {
 switch (action.type) {
   case UserActions.FETCH_USER: {
     return {
       ...state,
     };
   }
   case UserActions.FETCH_USER_SUCCESS: {
     return {
       user: action.payload
     };
   }
   default: {
     return state;
   }
 }
};


export const selectUserState = createFeatureSelector<
  ReadonlyArray<string>
  >('user');

export const selectUserObs = createSelector(
  selectUserState,
  (state: any) => state.user
);
