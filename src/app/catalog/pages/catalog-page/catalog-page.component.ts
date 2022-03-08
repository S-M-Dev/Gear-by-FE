import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { ItemModalComponent } from '../../components/item-modal/item-modal.component';
import { UserInfoService } from './../../../core/services/user-info.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PartItem } from '../../models/parts.model';
import { CatalogFilter, Facet } from '../../models/catalog.model';
import { SortOrder } from '../../../core/models/sort.model';
import { PartsService } from '../../../core/services/parts.service';

@Component({
  selector: 'gear-by-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss'],
})
export class CatalogPageComponent implements OnInit, AfterViewInit, OnDestroy {
  mobileQuery: MediaQueryList;
  opened = true;
  categories: CatalogFilter[] = [];
  array = Array(20).fill(0);

  user$ = this.userInfoService.getUserInfo();
  items: PartItem[];

  currentSortOrder: SortOrder | null;
  sortOrder = SortOrder;

  private _mobileQueryListener: () => void;
  private shouldScrollToGoods: boolean;

  constructor(
    private scroller: ViewportScroller,
    private dialog: MatDialog,
    private userInfoService: UserInfoService,
    private partsService: PartsService,
    private route: ActivatedRoute,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher
  ) {
    this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    const navigation = this.router.getCurrentNavigation();
    this.shouldScrollToGoods = navigation?.extras?.state?.scrollToCatalog;
  }
  ngOnInit(): void {
    this.items = this.route.snapshot.data.items;
    this.categories = this.partsService.getCategories();
  }

  ngAfterViewInit(): void {
    this.handleQueryParam();
    this.handleRouterState();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
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

  toggleSortOrder() {
    if (!this.currentSortOrder) {
      this.currentSortOrder = SortOrder.Asc;
    } else if (this.currentSortOrder === SortOrder.Asc){
      this.currentSortOrder = SortOrder.Desc;
    } else if (this.currentSortOrder === SortOrder.Desc) {
      this.currentSortOrder = null;
    }

    this.items = this.partsService.sortItems(this.currentSortOrder);
  }

  applyCategory(filter: CatalogFilter, facet: Facet) {
    this.categories = this.partsService.getCategories(filter, facet);
    this.items = this.partsService.filterItems(filter, facet);
  }

  private handleQueryParam(): void {
    this.route.queryParams.subscribe(() => {
      const partId = this.route.snapshot.queryParams.id;

      if (partId) {
        this.categories = this.partsService.getCategories();
        this.items = this.partsService.getLocalItems();

        const part = this.items.find((item) => item.id === +partId);
        setTimeout(() => this.scrollToGoods(), 0);
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
