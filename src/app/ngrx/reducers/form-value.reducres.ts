import { Action } from '@ngrx/store';
import { FormValue } from '../interfaces/form-value.interface';
import * as FormValueActions from '../actions/form-value.actions';

// Section 1
const initialState: FormValue = {
    name: '',
    type: 'Pie'
}

// Section 2
export function reducer(state: FormValue=initialState, action: FormValueActions.Actions) {

    // Section 3
    switch(action.type) {
        case FormValueActions.ADD_FORM_VALUE:
            console.log('reducer called value ',action);
            // state.name = action.payload.name;
            //let name = state.name; 
            return {
                ...state,
                name:action.payload.name,
                type:action.payload.type
            }
        default:
            return state;
    }
}