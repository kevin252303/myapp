import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  users: any;

  constructor(private http:HttpClient){

  }
  ngOnInit(): void {
    // this.getuser();
  }

  registerToggle(){
    this.registerMode = !this.registerMode;
  }

  getuser(){
    this.http.get('https://localhost:44377/api/Classes/getall').subscribe({
      next: respose=> this.users=respose,
      error:error=> console.log(error),
      complete:()=>console.log('Request completed')
  })
  }

  cancelregistermode(event:boolean){
    this.registerMode = event;
  }

}
