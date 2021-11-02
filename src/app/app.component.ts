import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

import { LoadingSpinnerService } from './core/services/loading-spinner.service';
import { UserInfoService } from './core/services/user-info.service';

@Component({
  selector: 'gear-by-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoading$ = this.loadingSpinnerService.isLoading();

  constructor(
    private loadingSpinnerService: LoadingSpinnerService,
    private userInfoService: UserInfoService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.userInfoService.fetchUserInfo().subscribe();

    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loadingSpinnerService.setLoadingState(true);
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loadingSpinnerService.setLoadingState(false);
          break;
        }
        default: {
          break;
        }
      }
    })
  }
}
