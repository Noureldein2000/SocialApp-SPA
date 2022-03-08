import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FileUploadModule } from 'ng2-file-upload';
import { ModalModule } from 'ngx-bootstrap/modal';
// import {TimeAgoPipe} from 'time-ago-pipe';
import { JwtModule } from '@auth0/angular-jwt';


import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather/weather.component';
import { NavComponent } from './nav/nav/nav.component';
import { AuthService } from './_services/auth/auth.service';
import { HomeComponent } from './home/home/home.component';
import { RegisterComponent } from './register/register/register.component';
import { ErrorInterceptorProdvider } from './_services/auth/error.interceptor';
import { AlertifyService } from './_services/auth/AlertifyService/alertify.service';
import { MemberListComponent } from './Members/member-list/member-list.component';
import { MessageComponent } from './Messages/message/message.component';
import { PageNotFoundComponent } from './PageNotFound/page-not-found/page-not-found.component';
import { AuthGuard } from './_guards/auth.guard';
import { UserService } from './_services/auth/UserService/user.service';
import { MemberCardComponent } from './Members/member-list/member-card/member-card/member-card.component';
import { MemberDetailsComponent } from './Members/member-list/member-details/member-details/member-details.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './Members/member-list/member-edit/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { PhotoEditorComponent } from './Members/member-list/photo-editor/photo-editor/photo-editor.component';
import { LikesComponent } from './Likes/likes/likes.component';
import { LikesListResolver } from './_resolvers/likes-list.resolver';
import { MessageListResolver } from './_resolvers/message-list.resolver';
import { MemberMessagesComponent } from './Members/member-list/member-messages/member-messages/member-messages.component';
import { AdminPanelComponent } from './Admin/admin-panel/admin-panel.component';
import { HasRoleDirective } from './_directives/hasRole/has-role.directive';
import { PhotoManagementComponent } from './Admin/admin-panel/photo-management/photo-management/photo-management.component';
import { UserManagementComponent } from './Admin/admin-panel/user-management/user-management/user-management.component';
import { AdminService } from './_services/auth/AdminService/admin.service';
import { RolesModalComponent } from './Admin/admin-panel/roles-modal/roles-modal/roles-modal.component';

export function tokenGetter() {
  return localStorage.getItem("token");
}


@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MessageComponent,
    PageNotFoundComponent,
    MemberCardComponent,
    MemberDetailsComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    LikesComponent,
    MemberMessagesComponent,
    AdminPanelComponent,
    HasRoleDirective,
    PhotoManagementComponent,
    UserManagementComponent,
    RolesModalComponent,
    // TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FileUploadModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    ModalModule.forRoot()
    // JwtModule.forRoot({
    //   config:{
    //     tokenGetter:tokenGetter,
    //     allowedDomains:["https://localhost:44326"],
    //     disallowedRoutes:["https://localhost:44326/auth/"]
    //   }
    // })
  ],
  providers: [
    AuthService,
    ErrorInterceptorProdvider,
    AlertifyService,
    AdminService,
    AuthGuard,
    PreventUnsavedChanges,
    UserService,
    MemberDetailResolver,
    MemberListResolver,
    MemberEditResolver,
    LikesListResolver,
    MessageListResolver
  ],
  entryComponents: [RolesModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
