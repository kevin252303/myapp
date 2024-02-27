import { Component, Input } from '@angular/core';
import { Member } from 'src/app/_models/member';

@Component({
  selector: 'app-members-cards',
  templateUrl: './members-cards.component.html',
  styleUrls: ['./members-cards.component.css']
})
export class MembersCardsComponent {
  @Input() member:Member | undefined;

}
