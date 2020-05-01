import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private auth:AuthService) { }
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  showSidenav:boolean;
  ngOnInit(): void {
    this.auth.getSidenav().pipe(takeUntil(this.destroyed$)).subscribe(val => {
      this.showSidenav = val;
    })
  }
  ngOnDestroy(){
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
