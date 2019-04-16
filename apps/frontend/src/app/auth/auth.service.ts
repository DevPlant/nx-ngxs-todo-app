import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginRequest, TokenResponse, User} from '@todo/common-api';


@Injectable()
export class AuthService {

  constructor(private readonly httpClient: HttpClient) {

  }

  getCurrentUser(): Observable<User> {
    return this.httpClient.get<User>('/api/auth/me');
  }

  login(loginRequest: LoginRequest): Observable<TokenResponse> {
    return this.httpClient.post<TokenResponse>('/api/auth/login', loginRequest);
  }

  saveToken(tokenResponse: TokenResponse) {
    localStorage.setItem('JWT_TOKEN', tokenResponse.token);
  }

  getToken() {
    return localStorage.getItem('JWT_TOKEN');
  }

  clearToken() {
    localStorage.removeItem('JWT_TOKEN');
  }
}
