import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { getPaginatedResult, getPaginationHeader } from './PaginationHelper';
import { Message } from '../_models/message';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { User } from '../_models/user';
import { BehaviorSubject, take } from 'rxjs';
import { group } from '@angular/animations';
import { Group } from '../_models/group';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseUrl = environment.apiurl;
  huburl = environment.huburl;
  private hubconnection?: HubConnection;
  private messageSource = new BehaviorSubject<Message[]>([])
  messageThread$ = this.messageSource.asObservable();

  constructor(private http: HttpClient) { }

  createHubConnection(user: User, otherUsername: string) {
    this.hubconnection = new HubConnectionBuilder()
      .withUrl(this.huburl + 'message?user=' + otherUsername, {
        accessTokenFactory: () => user.token
      })
      .withAutomaticReconnect()
      .build();

    this.hubconnection.start().catch(error => console.log(error));
    this.hubconnection.on('ReceiveMessageThread', message => {
      this.messageSource.next(message);
    })
    this.hubconnection.on('UpdatedGroup',(group:Group)=>{
      if(group.connections.some(x=>x.username===otherUsername)){
        this.messageThread$.pipe(take(1)).subscribe({
          next:messages=>{
            messages.forEach(message=>{
              if(!message.dateRead){
                message.dateRead = new Date(Date.now());
              }
            })
            this.messageSource.next([...messages]);
          }
        })
      }
    })

    this.hubconnection.on('NewMessage',message=>{
      this.messageThread$.pipe(take(1)).subscribe({
        next:messages=>{
          this.messageSource.next([...messages,message]);
        }
      })
    })
  }

  stopHubConnection() {
    if(this.hubconnection){
      this.hubconnection.stop();
    }
    
  }

  getMessages(pageNumber: number, pageSize: number, container: string) {
    let params = getPaginationHeader(pageNumber, pageSize);
    params = params.append('container', container);
    return getPaginatedResult<Message[]>(this.baseUrl + 'messages', params, this.http);
  }

  getMessageThread(username: string) {
    return this.http.get<Message[]>(this.baseUrl + 'messages/thread/' + username);
  }

  sendMessage(username: string, content: string) {
    return this.hubconnection?.invoke('SendMessage',{recipientUsername:username,content})
      .catch(error=>console.log(error));
  }

  deleteMessage(id: number) {
    return this.http.delete(this.baseUrl + 'messages/' + id);
  }
}
