import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'gear-by-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  constructor(private router: Router) { }

  navigateToCatalog(): void {
    this.router.navigate(['/catalog'], { state: { scrollToCatalog: true } });
  }
}
