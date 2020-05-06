import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ReplaySubject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';
import { AuthService } from 'src/app/services/auth.service';

import { Store } from '@ngrx/store';
import { FormValue } from '../../../ngrx/interfaces/form-value.interface';
import { AppState } from '../../../ngrx/app.state';

//import actions for updating state
import * as FormValueActions from '../../../ngrx/actions/form-value.actions';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  formValues:Observable<FormValue>;
  constructor(private auth:AuthService, private fb:FormBuilder, private store:Store<AppState>) { }
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  ngOnInit(): void {
    this.initInfoForm();
    this.formValues = this.store.select('formValue');
    console.log('formValues output');
    console.log(this.formValues);
    let i=0;
    this.formValues.subscribe( (res) => {
      console.log('returned formValues');
      if(i==0){ // to stop looping value will be set only first time
        if(res.name !=''){
          this.infoForm.controls['name'].patchValue(res.name);
        }
        if(res.type !=undefined){
          this.infoForm.controls['type'].patchValue(res.type);
          this.gType=res.type;
        }
        i++;
      }
      
    })
    //this.infoForm.get('date').setValue(this.currentDate());
  }

  graphTypes=["Pie", "Bar"];

  infoForm:FormGroup;
  initInfoForm() {
    this.infoForm = this.fb.group({
      name: ['',[Validators.required]],
      type: [this.graphTypes[0]],
      date:['']
    });
    
    
  }
  get filename(){
    return this.infoForm.get('name').value;
  }
  // get gType(){
  //   return this.infoForm.get('type').value;
  // }
  get controls(){
    return this.infoForm.controls;
  }

  setDate(event){
    this.infoForm.get('date').setValue(event);
  }

  gType:string;
  updateState(){
    this.gType =this.infoForm.get('type').value;
    let name = this.infoForm.get('name').value;

      //dispatch action
      this.store.dispatch(new FormValueActions.AddFormValue({name:name,type:this.gType}));
  }
  

  ngOnDestroy(){
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }


}
