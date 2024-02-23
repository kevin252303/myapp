import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent {
  baseUrl = 'https://localhost:44377/api/';
  validationErrors :string[] = [];

  constructor(private http:HttpClient){}

  get404error(){
    this.http.get(this.baseUrl + 'classes/not-found').subscribe({
      next:response=> console.log(response),
      error:error=> console.log(error)
    })

  }

  get400error(){
    this.http.get(this.baseUrl + 'classes/bad-request').subscribe({
      next:response=> console.log(response),
      error:error=> console.log(error)
    })

  }

  get500error(){
    this.http.get(this.baseUrl + 'classes/server-error').subscribe({
      next:response=> console.log(response),
      error:error=> console.log(error)
    })

  }

  get401error(){
    this.http.get(this.baseUrl + 'classes/auth').subscribe({
      next:response=> console.log(response),
      error:error=> console.log(error)
    })

  }

  get400validationerror(){
    this.http.post(this.baseUrl + 'classes/register',{}).subscribe({
      next:response=> console.log(response),
      error:error=> {console.log(error),
      this.validationErrors=error
      }
    })

  }
}
