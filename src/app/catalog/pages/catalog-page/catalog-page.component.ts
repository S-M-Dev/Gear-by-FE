import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'gear-by-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss']
})
export class CatalogPageComponent implements OnInit {
  mobileQuery: MediaQueryList;
  opened = true;
  goodsCategories = [
    'Категория',
    'Марка',
    'Модель',
    'Год выпуска',
  ];
  array = Array(20).fill(0);

  private _mobileQueryListener: () => void;

  constructor(private scroller: ViewportScroller, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit(): void {
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

}
