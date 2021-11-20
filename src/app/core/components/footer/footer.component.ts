import { Component } from '@angular/core';

import { Link } from '../../models/link.model';

@Component({
  selector: 'gear-by-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  public socialLinks: Link[] = [
    { name: 'vk', href: 'https://vk.com' },
    { name: 'facebook', href: 'https://www.facebook.com' },
    { name: 'instagram', href: 'https://www.instagram.com' },
    { name: 'telegram', href: 'https://telegram.org' },
    { name: 'twitter', href: 'https://twitter.com' },
    { name: 'linkedin', href: 'https://www.linkedin.com' },
  ]
}
