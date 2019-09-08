/* NG Modules */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/* Submodules */
import { AppRoutingModule } from 'src/app/zub-modules/app-routing.module';
/* Developed components */
import { AppComponent } from './app.component';
import { LoginComponent } from './1_login/login.component';
import { MainComponent } from './2_main/main.component';
import { NbLayoutModule, NbIconModule, NbButtonModule, NbCardModule, NbThemeModule, NbSidebarModule, NbToastrModule, NbMenuModule, NbInputModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AppDataService } from './_services/app-data.service';
import { LoginBackgroundAuthorComponent } from './1_login/bg-author.component';
import { SideNavControlsComponent } from './2.1_side-nav-controls/side-nav-controls.component';
import { ContactCardComponent } from './2.3_contact-card/contact-card.component';
import { SearchInputComponent } from './2.2_search-input/search-input.component';


@NgModule({
  /* DECLARATIONS */
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    LoginBackgroundAuthorComponent,
    SideNavControlsComponent,
    ContactCardComponent,
    SearchInputComponent
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
    NbToastrModule.forRoot(),
    NbMenuModule.forRoot(),
    NbInputModule
  ],
  /* PROVIDERS */
  providers: [AppDataService],
  /* APP STRAP */
  bootstrap: [AppComponent]
})
export class AppModule { } // export app module
