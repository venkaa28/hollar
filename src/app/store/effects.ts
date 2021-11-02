import { Injectable } from '@angular/core';
import {createEffect, Actions, ofType} from "@ngrx/effects";
import { EMPTY, Observable } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as UserActions from './actions';
import {FirebaseService} from "../services/firebase.service";
import {Action} from "@ngrx/store";




@Injectable()
export class Effects {

  // fetchUser$: Observable<Action> = this.actions$.ofType(UserActions.FetchUser) // filtering actions
  //   .switchMap(() => this.firebaseService.items
  //     .do((payload) => new actions.FetchEventsSuccess(payload))
  //   );

  fetchUser$ = createEffect(() => this.actions$.pipe(
      ofType(UserActions.FETCH_USER),
      mergeMap(() => this.firebaseService.user$()
        .pipe(
          map(user => ({ type: UserActions.FETCH_USER_SUCCESS, payload: user })),
          catchError(() => EMPTY)
        ))
    )
  );

  constructor(
    private actions$: Actions,
    private firebaseService: FirebaseService
  ) {}

}
