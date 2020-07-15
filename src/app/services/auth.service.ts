import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getUserByName(username: string): Observable<any> {
    const url = `${this.BASE_URL}/users?usernName=${username}`;
    return this.http.get<User>(url);
  }

  get(username: string, password: string): Observable<any> {
    const url = `${this.BASE_URL}/users?usernName=${username}&password=${password}`;
    return this.http.get<User>(url);
  }

  signUp(username: string, password: string): Observable<User> {
    const url = `${this.BASE_URL}/users`;
    return this.http.post<User>(url, {username, password, token: '1q2w3e4r5t6y7u8i9o0p'});
  }
}
