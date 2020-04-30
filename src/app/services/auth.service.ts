import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  loginUser(username:string,password:string):Observable<any>{
    if(username=="alok" && password=="alok123"){
      //set loggedIn true in localStorage to track already logged user
      localStorage.setItem('loggedIn',"true");
      //return observable true;
      // return obserbale after 3s to simulate response from server
      return of({username:username,login:"success"}).pipe( delay(3000));
    }
    else{
      //return error in observable
      return throwError({username:username,login:"failed",error:"username or password is incorrect"}).pipe(delay(3000));

    }
  }
}
