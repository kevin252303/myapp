import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'myapp';
  users: any;

  constructor(private accountser: AccountService){}
  ngOnInit(): void {
    this.setcurrentuser();
  }

  setcurrentuser(){
    const userstring = localStorage.getItem('user');
    if(!userstring) return;
    const user:User =JSON.parse(userstring);
    this.accountser.setCurrentUser(user);

  }
}
