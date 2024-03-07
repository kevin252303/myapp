import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Observable, take } from 'rxjs';
import { Pagination } from 'src/app/_models/Pagination';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { userparams } from 'src/app/_models/userparams';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-member-lists',
  templateUrl: './member-lists.component.html',
  styleUrls: ['./member-lists.component.css']
})
export class MemberListsComponent implements OnInit {

  members: Member[] = [];
  pagination: Pagination | undefined;
  userparams: userparams | undefined;
  user: User | undefined;
  genderList = [{ value: 'male', display: 'Males' }, { value: 'female', display: 'Females' }]

  constructor(private memberservice: MembersService, private accservice: AccountService) {
    this.userparams=this.memberservice.getuserparams();
  }
  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    
    if (this.userparams){
      this.memberservice.setuserparams(this.userparams);
      this.memberservice.getMembers(this.userparams).subscribe({
        next: response => {
          if (response.result && response.pagination) {
            this.members = response.result;
            this.pagination = response.pagination;
          }
        }
      })
    } 

  }

  reserFilters() {
    if (this.user) {
      this.userparams = this.memberservice.resetuserparams();
      this.loadMembers();
    }
  }

  pageChanged(event: any) {
    if (this.userparams && this.userparams?.pageNumber !== event.page) {
      this.userparams.pageNumber = event.page;
      this.memberservice.setuserparams(this.userparams);
      this.loadMembers();
    }

  }



}
