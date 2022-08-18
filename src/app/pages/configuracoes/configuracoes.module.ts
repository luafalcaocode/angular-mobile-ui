import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { MatListModule } from '@angular/material/list';
import {MatRippleModule} from '@angular/material/core';

import { ConfiguracoesComponent } from './configuracoes.component';
import { NotificacaoListComponent } from './notificacao-list/notificacao-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [ConfiguracoesComponent, NotificacaoListComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule
  ]
})
export class ConfiguracoesModule { }
