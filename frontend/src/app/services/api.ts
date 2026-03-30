import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:5000/api/users';

  
  userUpdated = new Subject<void>();

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any[]>(this.baseUrl);
  }

  addUser(user: any) {
    return this.http.post(this.baseUrl, user);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  googleLogin(data: any) {
    return this.http.post(`${this.baseUrl}/google-login`, data);
  }
}
