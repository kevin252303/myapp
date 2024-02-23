import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Output() cancelregister = new EventEmitter();
  model: any = {}

  constructor(private accountservice:AccountService, private toster:ToastrService){}

  register() {
    this.accountservice.register(this.model).subscribe({
      next: response=>{
        console.log(response);
        this.cancel();
      },
      error:error => {this.toster.error(error.error),
      console.log(error);
      }
    })


  }

  cancel() {
    this.cancelregister.emit(false);
  }

}
