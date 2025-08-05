var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
let CatalogService = class CatalogService {
    constructor(http) {
        this.http = http;
        this.apiUrl = `${environment.apiBaseUrl}/api/v1/catalog-items`;
    }
    getItems(page, size, sort, direction, search) {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString())
            .set('sort', sort)
            .set('direction', direction);
        if (search && search.trim()) {
            params = params.append('search', search);
        }
        return this.http.get(this.apiUrl, { params, observe: 'response' }).pipe(map(response => ({
            items: response.body || [],
            totalCount: Number(response.headers.get('X-Total-Count') || '0')
        })));
    }
    getItemById(id) {
        return this.http.get(`${this.apiUrl}/${id}`);
    }
    createItem(item) {
        return this.http.post(this.apiUrl, item);
    }
    updateItem(id, item) {
        return this.http.put(`${this.apiUrl}/${id}`, item);
    }
    deleteItem(id) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
};
CatalogService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], CatalogService);
export { CatalogService };
