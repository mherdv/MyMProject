import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { UsersService } from './sheard/services/users.service';
import { AuthServic } from './sheard/services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './sheard/services/auth.guard';
import { NotFoundComponent } from './sheard/components/not-found/not-found.component';
@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AuthModule,
    AppRoutingModule,
    
    BrowserAnimationsModule
  ],
  providers: [UsersService,AuthServic,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
