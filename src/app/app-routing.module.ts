import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListsComponent } from './members/member-lists/member-lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { authGuard } from './_guard/auth.guard';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { preveentUnsavedChangesGuard } from './_guard/preveent-unsaved-changes.guard';
import { memberDetailedResolver } from './_resolvers/member-detailed.resolver';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      { path: 'members', component: MemberListsComponent },
      { path: 'member/edit', component: MemberEditComponent,canDeactivate:[preveentUnsavedChangesGuard] },
      { path: 'members/:username', component: MemberDetailComponent, resolve:{member:memberDetailedResolver} },
      { path: 'lists', component: ListsComponent },
      { path: 'messages', component: MessagesComponent }

    ]
  },
  { path: '**', component: HomeComponent, pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
