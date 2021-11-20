import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { ItemModalComponent } from '../../components/item-modal/item-modal.component';
import { UserInfoService } from './../../../core/services/user-info.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PartItem } from '../../models/parts.model';

@Component({
  selector: 'gear-by-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss'],
})
export class CatalogPageComponent implements OnInit, AfterViewInit {
  mobileQuery: MediaQueryList;
  opened = true;
  goodsCategories = ['Категория', 'Марка', 'Модель', 'Год выпуска'];
  array = Array(20).fill(0);

  user$ = this.userInfoService.getUserInfo();
  items: PartItem[];

  private _mobileQueryListener: () => void;
  private shouldScrollToGoods: boolean;

  constructor(
    private scroller: ViewportScroller,
    private dialog: MatDialog,
    private userInfoService: UserInfoService,
    private route: ActivatedRoute,
    private router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    const navigation = this.router.getCurrentNavigation();
    this.shouldScrollToGoods = navigation?.extras?.state?.scrollToCatalog;
  }
  ngOnInit(): void {
    this.items = this.route.snapshot.data.items;
  }

  ngAfterViewInit(): void {
    this.handleQueryParam();
    this.handleRouterState();
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + '$';
    }

    return value;
  }

  scrollToGoods() {
    this.scroller.scrollToAnchor('goods');
  }

  openItemModal(item: PartItem) {
    const dialogRef = this.dialog.open(ItemModalComponent, { data: item });
  }

  private handleQueryParam(): void {
    this.route.queryParams.subscribe(() => {
      const partId = this.route.snapshot.queryParams.id;

      if (partId) {
        const part = this.items.find((item) => item.id === +partId);
        this.scrollToGoods();
        setTimeout(() => this.openItemModal(part as PartItem), 1000);
      }
    });
  }

  private handleRouterState(): void {
    if (this.shouldScrollToGoods) {
      setTimeout(() => this.scrollToGoods(), 0);
    }
  }
}
