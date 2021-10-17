import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Reviews } from '@/_models/reviews';

@Injectable({ providedIn: 'root' })
export class ReviewService {
    constructor(private http: HttpClient) { }

    getAll() {
        console.log('service');
        return this.http.get<Reviews[]>(`${config.apiUrl}/reviews`);
    }

    add(review: Reviews) {
        return this.http.post(`${config.apiUrl}/reviews/add`, review);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/reviews/${id}`);
    }
}