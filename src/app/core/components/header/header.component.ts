import { UserInfoService } from './../../services/user-info.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map, debounceTime, switchMap } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { PartItem } from 'src/app/catalog/models/parts.model';
import { CartService } from '../../services/cart.service';
import { PartsService } from '../../services/parts.service';

@Component({
  selector: 'gear-by-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  searchForm = new FormControl();
  currentLang = 'ru';

  filteredOptions$: Observable<PartItem[]>;
  cartCount$: Observable<number | undefined>;
  isAuthenticated$: Observable<boolean>;

  isMenuOpened: boolean;

  constructor(
    private partsService: PartsService,
    private cartService: CartService,
    private userInfoService: UserInfoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.userInfoService.getUserInfo().pipe(
      map((user) => !!user),
      debounceTime(300),
    );
    this.cartCount$ = combineLatest([
      this.cartService.getCartUpdates(),
      this.isAuthenticated$,
    ]).pipe(
      map(([items, isAuthenticated]) =>
        isAuthenticated && items && items.length ? items.length : undefined
      )
    );
    this.filteredOptions$ = this.searchForm.valueChanges.pipe(
      debounceTime(300),
      map((value) => this.partsService.searchItems(value))
    );
  }

  navigateToProduct(item: PartItem) {
    this.router.navigateByUrl(`/catalog?id=${item.id}`);
    this.searchForm.setValue(item.name);
    this.toggleMenu();
  }

  performNavigation(value: string): void {
    if (value === '/auth/logout') {
      this.userInfoService.clearUserData();
      this.router.navigateByUrl('/auth/sign-in');
    } else {
      this.router.navigateByUrl(value);
    }
    this.toggleMenu();
  }

  toggleMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
  }
}
