import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TimeagoModule } from 'ngx-timeago';
import { Message } from 'src/app/_models/message';
import { MessageService } from 'src/app/_services/message.service';


@Component({
  selector: 'app-member-messages',
  standalone: true,
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css'],
  imports: [CommonModule, TimeagoModule, FormsModule]

})
export class MemberMessagesComponent implements OnInit {
  @ViewChild('messageForm') messageForm?:NgForm
  @Input() username?: string
  messageContent = ''

  constructor(public messageservice: MessageService) { }
  ngOnInit(): void {

  }

  sendMesage() {
    if (!this.username) return;
    this.messageservice.sendMessage(this.username, this.messageContent)?.then(()=>{
      this.messageForm?.reset();
    });
      
    

  }



}