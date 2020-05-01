import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private fb:FormBuilder, private router:Router) { }
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  ngOnInit(): void {
    this.initLoginForm();
  }

  loginForm:FormGroup;
  initLoginForm() {
    this.loginForm = this.fb.group({
      username: ['',[Validators.required]],
      password: ['',[Validators.required]]
    });
    // this.loginForm.get('username').valueChanges.subscribe(val => {
    //   //emit event
    // });
    // this.loginForm.get('password').valueChanges.subscribe(val => {
    //   // emit event
    // });
    this.loginForm.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe( (r) =>{
      this.errorCondition=false;
    })
    
  }

  get controls(){
    return this.loginForm.controls;
  }

  errorMessage:string;
  errorCondition:boolean=false;
  overlayMessage:string='Logging In.. Please Wait..';
  loading:boolean=false;
  login(){
    this.overlayMessage = 'Logging In.. Please Wait..';
    this.loading=true;
    this.auth.loginUser(this.loginForm.get('username').value,this.loginForm.get('password').value).pipe(takeUntil(this.destroyed$))
    .subscribe( (res) => {
      this.loading=false;
      this.router.navigateByUrl('home');
      console.log('in success');
      console.log(res);
    },
    (err) => {
      this.loading=false;
      this.errorCondition=true;
      this.errorMessage= err.error;
      console.log('in error');
      console.log(err);
    })

  }

  ngOnDestroy(){
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
