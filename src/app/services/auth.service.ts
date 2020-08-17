import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getUserByToken(token): Observable<User[]> {
    const url = `${this.BASE_URL}/users?token=${token}`;
    return this.http.get<User[]>(url);
  }

  getUserByName(username: string): Observable<User[]> {
    const url = `${this.BASE_URL}/users?username=${username}`;
    return this.http.get<User[]>(url);
  }

  get(username: string, password: string): Observable<User[]> {
    const url = `${this.BASE_URL}/users?username=${username}&password=${password}`;
    return this.http.get<User[]>(url);
  }

  signUp(username: string, password: string): Observable<User> {
    const url = `${this.BASE_URL}/users`;
    return this.http.post<User>(url, {username, password, token: uuidv4()});
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.BASE_URL}/users/${user.id}`;
    return this.http.put<User>(url, user);
  }
}
