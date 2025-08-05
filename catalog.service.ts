import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CatalogItem } from './models/catalog-item.model';

export interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  private apiUrl = `${environment.apiBaseUrl}/api/v1/catalog-items`;

  constructor(private http: HttpClient) { }

  getItems(page: number, size: number, sort: string, direction: string, search?: string): Observable<PagedResponse<CatalogItem>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort)
      .set('direction', direction);

    if (search && search.trim()) {
      params = params.append('search', search);
    }

    return this.http.get<CatalogItem[]>(this.apiUrl, { params, observe: 'response' }).pipe(
      map(response => ({
        items: response.body || [],
        totalCount: Number(response.headers.get('X-Total-Count') || '0')
      }))
    );
  }

  getItemById(id: number): Observable<CatalogItem> {
    return this.http.get<CatalogItem>(`${this.apiUrl}/${id}`);
  }

  createItem(item: Omit<CatalogItem, 'id'>): Observable<CatalogItem> {
    return this.http.post<CatalogItem>(this.apiUrl, item);
  }

  updateItem(id: number, item: Partial<CatalogItem>): Observable<CatalogItem> {
    return this.http.put<CatalogItem>(`${this.apiUrl}/${id}`, item);
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}