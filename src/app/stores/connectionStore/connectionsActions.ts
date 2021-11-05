import {Action, createAction, props} from '@ngrx/store';
import {UserProfile} from '../../../models/userProfile.model';

export const FETCH_CONNECTIONS = 'Fetch CONNECTIONS';
export const FETCH_CONNECTIONS_SUCCESS = 'Fetch CONNECTIONS Success';

export class FetchConnections implements Action {
  readonly type = FETCH_CONNECTIONS;
  constructor(public payload: []) { };
}

export class FetchConnectionsSuccess implements Action {
  readonly type = FETCH_CONNECTIONS_SUCCESS;
  constructor(public payload: []) {
  };
}
export type ConnectionsActions = FetchConnections | FetchConnectionsSuccess;
