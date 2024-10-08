import { Component, OnInit } from '@angular/core';

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
  ) {}

  ngOnInit() {
    this.userInfoService.fetchUserInfo().subscribe();
  }
}
