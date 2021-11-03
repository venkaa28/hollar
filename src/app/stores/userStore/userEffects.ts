import { Injectable } from '@angular/core';
import {createEffect, Actions, ofType} from "@ngrx/effects";
import { EMPTY, Observable } from 'rxjs';
import {map, mergeMap, catchError, tap} from 'rxjs/operators';
import * as UserActions from './userActions';
import {FirebaseService} from "../../services/firebase.service";
import {Action} from "@ngrx/store";




@Injectable()
export class UserEffects {

  fetchUser$ = createEffect(() => this.actions$.pipe(
      ofType(UserActions.FETCH_USER),
      mergeMap(() => this.firebaseService.user$()
        .pipe(
          map(user => ({ type: UserActions.FETCH_USER_SUCCESS, payload: user['user'] })),
          catchError(() => EMPTY)
        ))
    )
  );

  constructor(
    private actions$: Actions,
    private firebaseService: FirebaseService
  ) {}

}
