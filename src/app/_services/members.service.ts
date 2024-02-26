import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseurl = environment.apiurl;

  constructor(private http : HttpClient) { }

  getMembers(){
    return this.http.get<Member[]>(this.baseurl+'getusers', this.getHttpOptions())
  }

  getMember(){
    return this.http.get<Member>(this.baseurl + 'getuser/', this.getHttpOptions())
  }

  getHttpOptions(){
    const userstring = localStorage.getItem('user');
    if(!userstring) return;
    const user = JSON.parse(userstring);
    return{
      headers:new HttpHeaders({
        Authorization:'Bearer '+ user.token
      })
    }
  }
}
