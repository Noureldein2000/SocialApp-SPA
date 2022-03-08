import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './Admin/admin-panel/admin-panel.component';
import { HomeComponent } from './home/home/home.component';
import { LikesComponent } from './Likes/likes/likes.component';
import { MemberDetailsComponent } from './Members/member-list/member-details/member-details/member-details.component';
import { MemberEditComponent } from './Members/member-list/member-edit/member-edit/member-edit.component';
import { MemberListComponent } from './Members/member-list/member-list.component';
import { MessageComponent } from './Messages/message/message.component';
import { PageNotFoundComponent } from './PageNotFound/page-not-found/page-not-found.component';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { LikesListResolver } from './_resolvers/likes-list.resolver';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MessageListResolver } from './_resolvers/message-list.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'memberList', component: MemberListComponent,
        resolve: { users: MemberListResolver }
      },
      {
        path: 'memberList/:id', component: MemberDetailsComponent,
        resolve: { user: MemberDetailResolver }
      },
      {
        path: 'member/edit', component: MemberEditComponent,
        resolve: { user: MemberEditResolver },
        canDeactivate: [PreventUnsavedChanges]
      },
      {
        path: 'likes', component: LikesComponent,
        resolve: { users: LikesListResolver }
      },
      {
        path: 'messages', component: MessageComponent,
        resolve: { messages: MessageListResolver }

      },
      {
        path: 'admin', component: AdminPanelComponent,
        data: { roles: ['Admin', 'Moderator'] }
      }
    ]
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
  // { path: 'Product/:id', component: ProductDetailsComponent },
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
