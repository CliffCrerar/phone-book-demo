/* NG Modules */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/* Submodules */
import { AppRoutingModule } from 'src/app/zub-modules/app-routing.module';
/* Developed components */
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { NbLayoutModule, NbIconModule, NbButtonModule, NbCardModule, NbThemeModule, NbSidebarModule, NbToastrModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AppDataService } from './_services/app-data.service';
import { LoginBackgroundAuthorComponent } from './login/bg-author.component';
import { SideNavControlsComponent } from './side-nav-controls/side-nav-controls.component';
import { ContactCardComponent } from './contact-card/contact-card.component';


@NgModule({
  /* DECLARATIONS */
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    LoginBackgroundAuthorComponent,
    SideNavControlsComponent,
    ContactCardComponent
  ],
  /* IMPORTS */
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbEvaIconsModule,
    NbIconModule,
    NbButtonModule,
    NbCardModule,
    NbToastrModule.forRoot()
  ],
  /* PROVIDERS */
  providers: [AppDataService],
  /* APP STRAP */
  bootstrap: [AppComponent]
})
export class AppModule { } // export app module
