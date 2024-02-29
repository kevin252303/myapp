import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Member } from '../_models/member';
import { map, of } from 'rxjs';
import { PaginatedResult } from '../_models/Pagination';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseurl = environment.apiurl;
  members: Member[]=[];
  paginatedResult: PaginatedResult<Member[]> = new PaginatedResult<Member[]>;

  constructor(private http : HttpClient) { }

  getMembers(page?:number, itemsPerPage?:number){
    let params = new HttpParams();
    if(page && itemsPerPage){
      params = params.append('pageNumber',page);
      params = params.append('pageSize',itemsPerPage);
    }


    // if(this.members.length > 0) return of (this.members);
    return this.http.get<Member[]>(this.baseurl+'user' ,{observe:'response',params}).pipe(
      map(response=>{
        if(response.body){
          this.paginatedResult.result = response.body;
        }
        const pagination = response.headers.get('Pagination');
        if(pagination){
          this.paginatedResult.pagination = JSON.parse(pagination);
        }
        return this.paginatedResult;
      } )
      
    )
  }

  getMember(username: string){
    return this.http.get<Member>(this.baseurl + 'user/' + username)
  }

  

  setMainPhoto(photoid :number){
    return this.http.put(this.baseurl + 'users/set-main-photo' + photoid,{});

  } 

  deletePhoto(photoId:number){
    return this.http.delete(this.baseurl + 'users/delete-photos/' + photoId);
  }

}
