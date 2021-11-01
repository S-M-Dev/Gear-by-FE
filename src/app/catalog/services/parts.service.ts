import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AmountUpdatePayload, PartItem, PartsSearch } from '../models/parts.model';

@Injectable()
export class PartsService {
  private readonly apiUrl = 'part';

  constructor(private http: HttpClient) { }

  performFilteredSearch(payload: PartsSearch) {
    return this.http.get<PartItem[]>(`${this.apiUrl}/search`, { params: { ...payload } });
  }

  getItems() {
    return this.http.get<PartItem[]>(this.apiUrl);
  }

  addItem(item: PartItem) {
    return this.http.post<PartItem>(this.apiUrl, item);
  }

  updateAmount(payload: AmountUpdatePayload) {
    return this.http.patch<PartItem>(this.apiUrl, payload);
  }
}
