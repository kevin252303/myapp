import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { MemberListsComponent } from './members/member-lists/member-lists.component';
import { SharedModule } from './_module/shared.module';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { MembersCardsComponent } from './members/members-cards/members-cards.component';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatePickerComponent } from './_forms/date-picker/date-picker.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteStrategy } from './_services/CustomRouteStrategy';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MessagesComponent,
    ListsComponent,
    MemberListsComponent,
    MembersCardsComponent,
    PhotoEditorComponent,
    TextInputComponent,
    DatePickerComponent,
    MemberEditComponent,
    



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: RouteReuseStrategy, useClass: CustomRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
