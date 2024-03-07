import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Member } from '../_models/member';
import { map, of, take } from 'rxjs';
import { userparams } from '../_models/userparams';
import { getPaginatedResult, getPaginationHeader } from './PaginationHelper';
import { AccountService } from './account.service';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseurl = environment.apiurl;
  members: Member[] = [];
  memberCache = new Map();
  user: User | undefined;
  userparams: userparams | undefined;

  constructor(private http: HttpClient, private accountservice: AccountService) {
    this.accountservice.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) {
          this.userparams = new userparams(user);
          this.user = user;
        }
      }
    })

  }

  getuserparams() {
    return this.userparams;
  }

  setuserparams(params: userparams) {
    this.userparams = params;
  }

  resetuserparams(){
    if(this.user){
      this.userparams=new userparams(this.user);
      return this.userparams;
    }
    return;
  }

  getMembers(userparams: userparams) {
    const response = this.memberCache.get(Object.values(userparams).join('-'));
    if (response) return of(response);
    let params = getPaginationHeader(userparams.pageNumber, userparams.pageSize);
    params = params.append('minAge', userparams.minAge);
    params = params.append('maxAge', userparams.maxAge);
    params = params.append('gender', userparams.gender);
    params = params.append('orderBy', userparams.orderBy);


    return getPaginatedResult<Member[]>(this.baseurl + 'user', params, this.http).pipe(
      map(
        response => {
          this.memberCache.set(Object.values(userparams).join('-'), response);
          return response;
        }
      )
    )
  }

  getMember(userName: string) {
    const member=[...this.memberCache.values()]
        .reduce((arr,elem)=>arr.concat(elem.result),[])
        .find((member:Member)=>member.userName===userName);

    if(member) return of(member);
    return this.http.get<Member>(this.baseurl + 'user/' + userName)
  }


  updateMember(member: Member) {
    return this.http.put(this.baseurl + 'user', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = { ...this.members[index], ...member }
      })
    )
  }



  setMainPhoto(photoid: number) {
    return this.http.put(this.baseurl + 'user/set-main-photo/' + photoid, {});

  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseurl + 'user/delete-photo/' + photoId);
  }

  addLike(username: string) {
    return this.http.post(this.baseurl + 'likes/' + username, {});
  }

  getLikes(predicate: string, pageNumber: number, pageSize: number) {
    let params = getPaginationHeader(pageNumber, pageSize);
    params = params.append('predicate', predicate);

    return getPaginatedResult<Member[]>(this.baseurl + 'likes', params, this.http);
  }

}
