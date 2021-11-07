import { UserInfoService } from './../../services/user-info.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { PartItem } from 'src/app/catalog/models/parts.model';
import { CartService } from '../../services/cart.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'gear-by-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  searchForm = new FormControl();
  filteredOptions$: Observable<PartItem[]>;
  cartCount$: Observable<number | undefined>;
  currentLang = 'ru';

  constructor(
    private searchService: SearchService,
    private cartService: CartService,
    private userInfoService: UserInfoService
  ) {}

  ngOnInit(): void {
    this.cartCount$ = combineLatest([
      this.cartService.getCartUpdates(),
      this.userInfoService.getUserInfo(),
    ]).pipe(
      map(([items, user]) =>
        !!user && items && items.length ? items.length : undefined
      )
    );
    this.filteredOptions$ = this.searchForm.valueChanges.pipe(
      debounceTime(300),
      switchMap((value) => this.searchService.performGlobalSearch(value))
    );
  }
}
