import {UserProfile} from "../../models/userProfile.model";
import * as UserActions from './actions';
import {createReducer} from "@ngrx/store";

export interface UserState {
  loading: boolean; // indicates loading while fetching data
  user: UserProfile;
}

const initialUserState: UserState = {
  loading: false,
  user: new UserProfile()
};

export const reducer = (state = initialUserState,
                        action: UserActions.Actions ): UserState => {
 switch (action.type) {
   case UserActions.FETCH_USER: {
     return {
       ...state,
       loading: true
     };
   }
   case UserActions.FETCH_USER_SUCCESS: {
     return {
       loading: false,
       user: action.payload
     };
   }
   default: {
     return state;
   }
 }
};

export const userStateSelector = (state: UserState) => state.user;
