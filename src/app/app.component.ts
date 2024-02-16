import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'myapp';
  users: any;

  constructor(private http:HttpClient){}
  ngOnInit(): void {
    this.http.get('https://localhost:44377/api/Classes/getall').subscribe({
      next: respose=> this.users=respose,
      error:error=> console.log(error),
      complete:()=>console.log('Request completed')
  })
  }

  public getall(){
    this.http.get('https://localhost:44377/api/Classes/getall').subscribe({
      next: respose=> this.users=respose,
      error:error=> console.log(error),
      complete:()=>console.log('Request completed')
  })
}
}
