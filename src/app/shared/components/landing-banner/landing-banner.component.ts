import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'gear-by-landing-banner',
  templateUrl: './landing-banner.component.html',
  styleUrls: ['./landing-banner.component.scss']
})
export class LandingBannerComponent {
  @Output() goToCatalog = new EventEmitter();
}
