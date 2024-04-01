import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../_models/user';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CallingService {
  baseUrl = environment.apiurl;
  huburl = environment.huburl;
  private hubconnection?: HubConnection;
  type?:boolean;
  incomingCall$: Subject<string> = new Subject<string>();
  
  constructor(private http: HttpClient, private toaster:ToastrService) { }

  createHubConnection(user: User, otherUsername: string) {
    this.hubconnection = new HubConnectionBuilder()
      .withUrl(this.huburl + 'call?user=' + otherUsername, {
        accessTokenFactory: () => user.token
      })
      .withAutomaticReconnect()
      .build();
      console.log('hubconnection for call');
    
    this.hubconnection.start().catch(error => console.log(error));

    this.hubconnection.on('ReceiveIncomingCall', (callerName: string) => {
      this.incomingCall$.next(callerName);
      this.toaster.info('receive call from'+callerName);

    });
     
    
  }

  initiateCall(username:string,userid:number){
    console.log("Calling...");
    return this.hubconnection?.invoke('SendIncomingCallNotification',userid,username)
    .catch(error=>(console.log(error)));
  }

  acceptCall(callerId: string) {
    
  }

  endCall(callerId: string) {
    
  }
  
}
