import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../../models/Usuario.model';
import { MatRipple } from '@angular/material/core';
import { LoginService } from '../../services/login.service';
import { CommonService } from '../../services/common.service';

import { Message } from '../../utils/message';
import { __assign } from 'tslib';

@Component({
  selector: 'form-logout',
  templateUrl: './form-logout.component.html',
  styleUrls: ['./form-logout.component.scss']
})
export class FormLogoutComponent implements OnInit {
  isLoading: boolean;
  isLoadingBtn: boolean;
  usuario: Usuario;

  @ViewChild(MatRipple) ripple: MatRipple;

  colorRipple = 'rgba(0,0,0,0.1)'

  constructor(private router: Router, private loginService: LoginService, private commonService: CommonService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.usuario = new Usuario();
    this.loginService.obterUsuarioLogado()
    .toPromise()
    .then((message: Message) => {
      this.usuario = message.data;
      this.isLoading = false;
    })
    .catch(err => {
      this.loginService.removeActiveKeys();

    });
  }

  onLogout() {
   this.isLoadingBtn = true;
   setTimeout(() => {
    this.loginService.logout();
   }, 1000);

  }

  quandoSelecionarExcluirConta() {
    localStorage.setItem('action', 'delete');
    localStorage.setItem('endpoint_action', '/reencontre/auth?excluirDadosAssociadosComUsuario=true')
    this.commonService.openDialog(null,
       "Tem certeza que deseja excluir sua conta?",
       null,
       "warning",
       "Sim",
       true
       );
  }
}
