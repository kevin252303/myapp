import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequestCount = 0;

  constructor( private spinnerservice:NgxSpinnerService) { }

  busy(){
    this.busyRequestCount++;
    this.spinnerservice.show(undefined,{
      type:'ball-scale-multiple',
      bdColor:'rgba(51,51,51,0.8)',
      color:'#000000'
    })
  }

  idel(){
    this.busyRequestCount--;
    if(this.busyRequestCount <=0){
      this.busyRequestCount=0;
      this.spinnerservice.hide();
    }
  }
}
