import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/_models/Pagination';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-member-lists',
  templateUrl: './member-lists.component.html',
  styleUrls: ['./member-lists.component.css']
})
export class MemberListsComponent implements OnInit {
  //members$: Observable<Member[]> | undefined;
  members: Member[] = [];
  pagination: Pagination | undefined;
  pageNumber = 1;
  pageSize = 5;

  constructor(private memberservice: MembersService, private http: HttpClient) { }
  ngOnInit(): void {
    //this.members$ = this.memberservice.getMembers();
    this.loadMembers();
  }

  loadMembers() {
    this.memberservice.getMembers(this.pageNumber, this.pageSize).subscribe({
      next: response => {
        if (response.result && response.pagination) {
          this.members = response.result;
          this.pagination = response.pagination;
        }
      }
    })
  }



}
