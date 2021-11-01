import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PartItem } from 'src/app/catalog/models/parts.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly apiUrl = 'part';

  constructor(private http: HttpClient) { }

  performGlobalSearch(name: string): Observable<PartItem[]> {
    return this.http.get<PartItem[]>(`${this.apiUrl}/search`, { params: { name } });
  }
}
