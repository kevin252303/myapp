import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-members-cards',
  templateUrl: './members-cards.component.html',
  styleUrls: ['./members-cards.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class MembersCardsComponent {
  @Input() member: Member | undefined;
  constructor(private memberservice: MembersService, private toaster: ToastrService,public presence:PresenceService) { }

  addLike(member: Member) {
    this.memberservice.addLike(member.userName).subscribe({
      next: () => this.toaster.success("you have liked " + member.knownAs)
    })

  }

}
