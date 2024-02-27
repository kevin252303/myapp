import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListsComponent } from './members/member-lists/member-lists.component';
import { SharedModule } from './_module/shared.module';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { MembersCardsComponent } from './members/members-cards/members-cards.component';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatePickerComponent } from './_forms/date-picker/date-picker.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MessagesComponent,
    ListsComponent,
    MemberDetailComponent,
    MemberListsComponent,
    MembersCardsComponent,
    PhotoEditorComponent,
    TextInputComponent,
    DatePickerComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
