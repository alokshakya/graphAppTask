import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private auth:AuthService, private router:Router) { }
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  showDropdown:boolean=false;
  isLoggedIn:boolean;
  ngOnInit(): void {
    this.auth.isLoggedIn().pipe(takeUntil(this.destroyed$)).subscribe( (val) => {
      this.isLoggedIn=val;
    })
  }

  toggleSidenav(){
    this.auth.setSidenav();
  }

  updateDropdown(){
    this.showDropdown = !this.showDropdown;
  }

  logout(){
    this.auth.logout();
    this.showDropdown = !this.showDropdown;
    this.router.navigateByUrl('login');
  }


  ngOnDestroy(){
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
