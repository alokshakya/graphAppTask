import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  isLoginSubject = new BehaviorSubject<boolean>(this.hasUser());

  private hasUser() : boolean {
    return !!localStorage.getItem('user');
  }
  
  isLoggedIn() : Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  loginUser(username:string,password:string):Observable<any>{
    if(username=="alok" && password=="alok123"){
      //set loggedIn true in localStorage to track already logged user
      localStorage.setItem('loggedIn',"true");
      //let all subscribers know that user is loggedIn
      this.isLoginSubject.next(true);
      //return observable true;
      // return obserbale after 3s to simulate response from server
      return of({username:username,login:"success"}).pipe( delay(3000));
    }
    else{
      //return error in observable
      return throwError({username:username,login:"failed",error:"username or password is incorrect"}).pipe(delay(3000));

    }
  }

  logout() : void {
    localStorage.removeItem('user');
    //let all subscribers know that user is loggedOut
    this.isLoginSubject.next(false);
  }

}
