import {Action, createAction, props} from '@ngrx/store';
import {UserProfile} from "../../models/userProfile.model";

export const FETCH_USER = 'Fetch USER';
export const FETCH_USER_SUCCESS = 'Fetch USER Success';

export class FetchUser implements Action {
  readonly type = FETCH_USER;
  constructor() { };
}

export class FetchUserSuccess implements Action {
  readonly type = FETCH_USER_SUCCESS;
  constructor(public payload: UserProfile) {
  };
}
export type Actions = FetchUser | FetchUserSuccess;
