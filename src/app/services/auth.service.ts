import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of, throwError, timer } from 'rxjs';
import { delay, catchError, mergeMap } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  isLoginSubject = new BehaviorSubject<boolean>(this.hasUser());

  private hasUser() : boolean {
    return !!localStorage.getItem('loggedIn');
  }
  
  isLoggedIn() : Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  loginUser(username:string,password:string):Observable<any>{
    if(username=="alok" && password=="alok123"){
      //set loggedIn true in localStorage to track already logged user after 2.95 sec
      setTimeout(() => {
        localStorage.setItem('loggedIn',"true");
        //let all subscribers know that user is loggedIn
        this.isLoginSubject.next(true);
        //return observable true;
      }, 2950);
      
      // return obserbale after 3s to simulate response from server
      return of({username:username,login:"success"}).pipe( delay(3000));
    }
    else{
      //return error in observable
      // setTimeout( () => {
      //   return throwError({username:username,login:"failed",error:"username or password is incorrect"}).pipe(delay(30000))
      // },3000);
      return throwError({username:username,login:"failed",error:"username or password is incorrect"})
      .pipe(
        // We catch the error, we delay by adding timer stream, then we mergeMap to the error.
        catchError(e => timer(3000).pipe(mergeMap(t => throwError(e)))
      ))

    }
  }

  logout() : void {
    localStorage.removeItem('loggedIn');
    //let all subscribers know that user is loggedOut
    this.isLoginSubject.next(false);
  }

}
