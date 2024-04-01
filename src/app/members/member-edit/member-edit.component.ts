import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editform') editform: NgForm | undefined
  @HostListener('window:beforeunload',['$event']) unloadNotification($event:any){
    if(this.editform?.dirty){
      $event.returnValue=true;
    }

  }
  
  member: Member | undefined
  user: User | null = null;

  constructor(private accservice: AccountService, private memberservice: MembersService, private toaster: ToastrService) {
    this.accservice.currentUser$.pipe(take(1)).subscribe({
      next: user => this.user = user
    })
  }
  ngOnInit(): void {
    this.loadMember()
  }

  loadMember() {
    if (!this.user) return;
    this.memberservice.getMember(this.user.username).subscribe({
      next: member => this.member = member
    })
  }

  updateMember() {
    this.memberservice.updateMember(this.editform?.value).subscribe({
      next:_=>{
        this.toaster.success('profile updated');
        this.editform?.reset(this.member)

      }
    })
    
  }

}
