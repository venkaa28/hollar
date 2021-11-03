import { Injectable } from '@angular/core';
import {createEffect, Actions, ofType} from "@ngrx/effects";
import { EMPTY, Observable } from 'rxjs';
import {map, mergeMap, catchError, tap} from 'rxjs/operators';
import * as ConnectionActions from './connectionsActions';
import {FirebaseService} from "../../services/firebase.service";
import {Action} from "@ngrx/store";



@Injectable()
export class ConnectionsEffects {

  fetchConnections$ = createEffect(() => this.actions$.pipe(
      ofType(ConnectionActions.FETCH_CONNECTIONS),
      mergeMap((payload) => this.firebaseService.connections$(payload) //change here
        .pipe(
          map(connections => ({ type: ConnectionActions.FETCH_CONNECTIONS_SUCCESS, payload: connections })),
          catchError(() => EMPTY)
        ))
    )
  );

  constructor(
    private actions$: Actions,
    private firebaseService: FirebaseService
  ) {}

}
