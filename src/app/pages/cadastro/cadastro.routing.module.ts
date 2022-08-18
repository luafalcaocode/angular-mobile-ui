import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CadastroComponent } from './cadastro.component';

const rotas = [
  {
    path: 'cadastro', component: CadastroComponent, children: [
      { path: '**', component: CadastroComponent},
      { path: 'cadastro/:id', component: CadastroComponent }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})

export class CadastroRoutingModule {

}
