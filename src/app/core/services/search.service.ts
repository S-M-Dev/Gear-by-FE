import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PartItem } from 'src/app/catalog/models/parts.model';
import { environment } from './../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly apiUrl = 'part';
  private http: HttpClient;

  constructor(handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }

  performGlobalSearch(name: string): Observable<PartItem[]> {
    return this.http.get<PartItem[]>(`${environment.apiUrl}/${this.apiUrl}/search`, { params: { name } });
  }
}
