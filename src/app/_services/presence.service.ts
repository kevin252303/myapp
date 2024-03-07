import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.development';
import { User } from '../_models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  hubUrl = environment.huburl;
  private hubconnection?: HubConnection;
  private onlineUserSource=new BehaviorSubject<string[]>([]);
  onlineUsers$=this.onlineUserSource.asObservable();

  constructor(private toaster: ToastrService) { }

  createHubConnection(user: User) {
    this.hubconnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'presence', {
        accessTokenFactory: () => user.token
      })
      .withAutomaticReconnect()
      .build()

    this.hubconnection.start().catch(error => console.log(error));
    this.hubconnection.on('UserIsOnline', username => {
      this.toaster.info(username + ' has connected');
    })
    this.hubconnection.on('UserIsOffline', username => {
      this.toaster.warning(username + ' has disconnectd')
    })
    this.hubconnection.on('GetOnlineUsers',username=>{
      this.onlineUserSource.next(username);
    })
  }

  stopHubConnection() {
    this.hubconnection?.stop().catch(error => console.log(error));
  }
}
