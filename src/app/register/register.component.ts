import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelregister = new EventEmitter();
  model: any = {}
  registerForm:FormGroup = new FormGroup({});
  maxdate :Date=new Date

  constructor(private accountservice:AccountService, private toster:ToastrService,
     private fb:FormBuilder){}
  ngOnInit(): void {
    this.initializeForm();
    this.maxdate.setFullYear(this.maxdate.getFullYear() - 18);
  }

  initializeForm(){
    this.registerForm = this.fb.group({
      gender:['male'],
      username:['',Validators.required],
      knownAs:['',Validators.required],
      dateOfBirth:['',Validators.required],
      city:['',Validators.required],
      country:['',Validators.required],
      password: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(8)]],
      confirmPassword:['',[Validators.required,this.matchValue('password')]]
    })
    this.registerForm.controls['password'].valueChanges.subscribe({
      next:()=>this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  matchValue(matchTo:string):ValidatorFn{
    return (control : AbstractControl)=>{
      return control.value ===control.parent?.get(matchTo)?.value ?null:{nomatching:true}
    }

  }

  register() {
    console.log(this.registerForm?.value)
    // this.accountservice.register(this.model).subscribe({
    //   next: response=>{
    //     console.log(response);
    //     this.cancel();
    //   },
    //   error:error => {this.toster.error(error.error),
    //   console.log(error);
    //   }
    // })


  }

  cancel() {
    this.cancelregister.emit(false);
  }

}
