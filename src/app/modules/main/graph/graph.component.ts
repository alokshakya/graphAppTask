import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  constructor(private auth:AuthService, private fb:FormBuilder) { }
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
    this.infoForm.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe( (r) =>{
      
    })
    
  }
  get filename(){
    return this.infoForm.get('name').value;
  }
  get gType(){
    return this.infoForm.get('type').value;
  }
  get controls(){
    return this.infoForm.controls;
  }

  setDate(event){
    this.infoForm.get('date').setValue(event);
  }
  currentDate() {
    const currentDate = new Date();
    return currentDate.toISOString().substring(0,10);
  }

  ngOnDestroy(){
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }


}
