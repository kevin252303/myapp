import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-member-lists',
  templateUrl: './member-lists.component.html',
  styleUrls: ['./member-lists.component.css']
})
export class MemberListsComponent implements OnInit {
  members :Member[] = [];
  baseurl = environment.apiurl

  constructor(private memberservice : MembersService, private http:HttpClient){}
  ngOnInit(): void {
    this.http.get(this.baseurl + 'classes/getall')
    this.loadMembers();
  }

  loadMembers(){
    this.memberservice.getMembers().subscribe({
      next: members=>this.members=members
    })
  }

}
