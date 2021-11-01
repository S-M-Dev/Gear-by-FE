import { Component } from '@angular/core';

import { LoadingSpinnerService } from './core/services/loading-spinner.service';

@Component({
  selector: 'gear-by-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoading$ = this.loadingSpinnerService.isLoading();

  constructor(
    private loadingSpinnerService: LoadingSpinnerService,
  ) {}
}
