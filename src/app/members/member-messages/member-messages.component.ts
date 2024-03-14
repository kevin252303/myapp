import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, NgForm } from '@angular/forms';
import { TimeagoModule } from 'ngx-timeago';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/_services/message.service';


@Component({
  selector: 'app-member-messages',
  standalone: true,
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css'],
  imports: [CommonModule, TimeagoModule, FormsModule]

})
export class MemberMessagesComponent implements OnInit {
  @ViewChild('messageForm') messageForm?: NgForm
  @Input() username?: string
  messageContent = ''
  IsTyping?:boolean;
  searchControl = new FormControl();
  typingSubscription?:Subscription;

  constructor(public messageservice: MessageService) {
    this.typingSubscription=messageservice.typingStatusChanged$.subscribe((istyping)=>{
      this.IsTyping=istyping
    });
   }
  ngOnInit(): void {
    this.messageservice.typingStatusChanged$.subscribe((isTyping:boolean)=>{
      this.IsTyping=isTyping;
    })

  }

  onTyping() {
    const isTyping = true;
    if(!this.username)return;
    this.messageservice.typing(isTyping,this.username,this.messageContent);
  }
  
  offTyping() {
    const isTyping = false;
    if(!this.username)return;
    this.messageservice.typing(isTyping,this.username,this.messageContent);
  }
  
  sendMesage() {
    if (!this.username) return;
    this.messageservice.sendMessage(this.username, this.messageContent)?.then(() => {
      this.messageForm?.reset();
    });

  }



}
