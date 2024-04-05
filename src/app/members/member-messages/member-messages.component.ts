import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, NgForm } from '@angular/forms';
import { TimeagoModule } from 'ngx-timeago';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/_services/message.service';
import { CallComponent } from 'src/app/call/call.component';


@Component({
  selector: 'app-member-messages',
  standalone: true,
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css'],
  imports: [CommonModule, TimeagoModule, FormsModule, CallComponent]

})
export class MemberMessagesComponent implements OnInit {
  @ViewChild('messageForm') messageForm?: NgForm
  @Input() username?: string
  messageContent = ''
  IsTyping?: boolean;
  searchControl = new FormControl();
  typingSubscription?: Subscription;
  buttonvisible: boolean = true;
  isCallDeclined:boolean=false;
  showCallComponent: boolean = false;
  currentTime?: Date;

  constructor(public messageservice: MessageService) {
    this.typingSubscription = messageservice.typingStatusChanged$.subscribe((istyping) => {
      this.IsTyping = istyping
    });
  }
  ngOnInit(): void {
    this.messageservice.typingStatusChanged$.subscribe((isTyping: boolean) => {
      this.IsTyping = isTyping;
    })

  }



  onTyping() {
    const isTyping = true;
    if (!this.username) return;
    this.messageservice.typing(isTyping, this.username, this.messageContent);
  }

  offTyping() {
    const isTyping = false;
    if (!this.username) return;
    this.messageservice.typing(isTyping, this.username, this.messageContent);
  }

  sendMesage() {
    if (!this.username) return;
    this.messageservice.sendMessage(this.username, this.messageContent)?.then(() => {
      this.messageForm?.reset();
    });

  }

  initiatecall(user: string) {
    this.showCallComponent = true;
    this.messageservice.initiateCall(user);
  }

  acceptcall(user: string) {
    this.buttonvisible = false;
    this.showCallComponent=true;
    this.isCallDeclined=false;
    this.messageservice.acceptCall(user);

  }

  declinecall(user: string) {
    this.buttonvisible = false;
    this.isCallDeclined=true;
    this.messageservice.declineCall(user);
  }

  endcall(user: string) {
    this.buttonvisible = false;
    this.showCallComponent = false
    this.isCallDeclined=true;
    this.messageservice.endCall(user);

  }



}
