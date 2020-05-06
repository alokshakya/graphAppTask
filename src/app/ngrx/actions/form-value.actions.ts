// Section 1
import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { FormValue } from '../interfaces/form-value.interface';

// Section 2
export const ADD_FORM_VALUE       = 'FormValue'
//export const REMOVE_TUTORIAL    = '[TUTORIAL] Remove'

// Section 3
export class AddFormValue implements Action {
    readonly type = ADD_FORM_VALUE

    constructor(public payload: FormValue) {}
}

// export class RemoveTutorial implements Action {
//     readonly type = REMOVE_TUTORIAL

//     constructor(public payload: number) {}
// }

// Section 4
export type Actions = AddFormValue;