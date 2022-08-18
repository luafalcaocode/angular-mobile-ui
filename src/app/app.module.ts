import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { SharedModule } from './shared/shared.module';
import { HomeModule } from './pages/home/home.module';
import { CadastroModule } from './pages/cadastro/cadastro.module';
import { CatalogoModule } from './pages/catalogo/catalogo.module';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor } from './interceptors/authentication.interceptor';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';
import { ConfiguracoesModule } from './pages/configuracoes/configuracoes.module';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    SharedModule,
    HomeModule,
    CadastroModule,
    CatalogoModule,
    ConfiguracoesModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    },
    MatDatepickerModule,
    MatNativeDateModule,
    {
      provide: MAT_DATE_LOCALE, useValue: 'pt-BR'
    },
    {
      provide: LocationStrategy, useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
