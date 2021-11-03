import {UserProfile} from "../../../models/userProfile.model";
import * as ConnectionsActions from './connectionsActions';
import {ActionReducerMap, createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";

export interface ConnectionsState {
  connections: UserProfile[];
}

const initialConnectionsState: ConnectionsState = {
  connections: [],
};

export const connectionReducer = (state = initialConnectionsState,
                            action: ConnectionsActions.UserActions ): ConnectionsState => {
  switch (action.type) {
    case ConnectionsActions.FETCH_CONNECTIONS: {
      return {
        ...state,
      };
    }
    case ConnectionsActions.FETCH_CONNECTIONS_SUCCESS: {
      console.log(action.payload);
      return {
        connections: action.payload
      };
    }
    default: {
      return state;
    }
  }
};


export const selectConnectionsState = createFeatureSelector<
  ReadonlyArray<string>
  >('connections');

export const selectConnectionsObs = createSelector(
  selectConnectionsState,
  (state: any) => state.connections
);
