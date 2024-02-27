import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiurl
  private currentuser = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentuser.asObservable();

  constructor(private http: HttpClient) { }

  login(model:any){
    return this.http.post<User>(this.baseUrl + '/login', model).pipe(
      map((response: User) => {
        const user=response;
        if(user){
          localStorage.setItem('user',JSON.stringify(user))
          this.currentuser.next(user);
        }
      })
    )
  }

  register(model:any){
    return this.http.post<User>(this.baseUrl + 'classes/register',model).pipe(
      map(user => {
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.currentuser.next(user);
        }
      })
    )
  }

  setCurrentUser(user :User){
    this.currentuser.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentuser.next(null);
  }
}
