import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment.development';
import { PresenceService } from './presence.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiurl
  private currentuser = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentuser.asObservable();

  constructor(private http: HttpClient, private presence: PresenceService) { }

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    )
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + '/register', model).pipe(
      map(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentuser.next(user);
        }
      })
    )
  }

  setCurrentUser(user: User) {
    this.currentuser.next(user);
    this.presence.createHubConnection(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentuser.next(null);
    this.presence.stopHubConnection();
  }
}
