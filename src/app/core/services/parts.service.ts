import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AmountUpdatePayload, PartItem } from '../../catalog/models/parts.model';
import { tap } from 'rxjs/operators';
import { SortOrder } from '../models/sort.model';
import { CatalogFilter, Facet } from '../../catalog/models/catalog.model';

@Injectable({
  providedIn: 'root'
})
export class PartsService {
  private readonly apiUrl = 'part';
  private items: PartItem[];
  private categories: CatalogFilter[];

  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get<PartItem[]>(this.apiUrl).pipe(
      tap(items => {
        this.items = items;

        this.categories = [
          {
            name: 'Марка',
            key: 'carMark',
            facets: [...new Set(this.items.map(item => item.carMark))].map(name => ({ name }))
          },
          {
            name: 'Модель',
            key: 'carModel',
            partOf: 'carMark',
            facets: [...new Set(this.items.map(item => ({
              name: item.carModel,
              relatedValue: item.carMark,
            })))].filter((v, i, a) => a.findIndex(t => (t.name === v.name)) === i),
          },
        ]
      })
    );
  }

  getLocalItems() {
    return this.items;
  }

  getCategories(active?: CatalogFilter, facet?: Facet): CatalogFilter[] {
    return active && facet
      ? this.categories.map(category => {
        const relatedCategory = category.partOf && this.categories.find(cat => cat.key === category.partOf);

        return {
          ...category,
          facets: relatedCategory ? category.facets.filter(fct => fct.relatedValue?.toLowerCase() === facet.name.toLowerCase() || fct.name === facet.name) : category.facets,
        }
      })
      : [...this.categories];
  }

  addItem(item: PartItem) {
    return this.http.post<PartItem>(this.apiUrl, item);
  }

  searchItems(term: string) {
    return this.items.filter(item => [
      item.name.toLowerCase(),
      item.carMark.toLowerCase(),
      item.carModel.toLowerCase(),
    ].some(name => name.includes(term.toLowerCase())));
  }

  sortItems(sortOrder: SortOrder | null) {
    if (sortOrder === null) {
      return [...this.items];
    }

    return [...this.items].sort((first, second) => {
      const sortCoefficient = sortOrder === SortOrder.Asc ? 1 : -1;

      return (first.price - second.price) * sortCoefficient;
    });
  }

  filterItems(category: CatalogFilter, facet: Facet) {
    return this.items.filter(item => (item as any)[category.key] === facet.name);
  }

  updateAmount(payload: AmountUpdatePayload) {
    return this.http.patch<PartItem>(this.apiUrl, payload);
  }
}
