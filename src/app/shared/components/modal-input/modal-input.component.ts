import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { RevealWindowService } from '../reveal-window/reveal-window.service';
import { LoginService } from '../../services/login.service';
import { CommonService } from '../../services/common.service';
import { GoogleAnalyticsService } from '../../services/google-analytics.service';

@Component({
  selector: 'modal-input',
  templateUrl: './modal-input.component.html',
  styleUrls: ['./modal-input.component.scss']
})
export class ModalInputComponent implements OnInit {
  public modalType: string;
  public isLoading: boolean;


  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, private apiService: ApiService,
    private revealWindowService: RevealWindowService,
    private loginService: LoginService,
    private commonService: CommonService,
    private googleService: GoogleAnalyticsService) { }

  ngOnInit(): void {
    this.modalType = this.data.modalType;
  }

  closeDialog() {
    this.dialogRef.close();
    if (this.data.url) {
      this.router.navigate([this.data.url]);
    }

    if (this.revealWindowService.isOpened && this.modalType == 'success') {
      this.revealWindowService.close();
    }
  }

  async action() {
    this.isLoading = true;

    let action = localStorage.getItem('action');
    let endpoint = localStorage.getItem('endpoint_action');
    let response: any;

    try {
      switch (action) {
        case 'delete':
          response = await this.apiService.delete(endpoint).toPromise();

          this.googleService.logEvent('exclusao_usuario', {
            usuario: localStorage.getItem('user'),
            data_operacao: new Date().toLocaleDateString('pt-BR')
          });

          this.isLoading = false;

          if (response.success) {
            this.modalType = 'success';
            this.data.caption = 'Seu usuário foi excluído com sucesso!';
            this.data.action = null;
            this.data.buttonText = 'Entendi';
            this.data.url = '/home';

            this.loginService.removeActiveKeys();
            this.loginService.removeActiveStyles();

            this.loginService.isLoading = false;
          }

          break;
        case 'delete_anuncio':
          response = await this.apiService.delete(endpoint).toPromise();

          const registroSelecionado = localStorage.getItem('registroSelecionado');

          if (registroSelecionado) {
            const desaparecido = JSON.parse(registroSelecionado);

            this.googleService.logEvent('exclusao_desaparecido', {
              desaparecidoId: desaparecido.id,
              nome_desaparecido: desaparecido.nome,
              cidade_desaparecido: desaparecido.cidade,
              estado_desaparecido: desaparecido.estado,
              usuario: localStorage.getItem('user'),
              data_operacao: new Date().toLocaleDateString('pt-BR')
            });
          }

          this.isLoading = false;

          if (response.success) {
            this.modalType = 'success';
            this.data.caption = 'Seu anúncio foi excluído com sucesso!';
            this.data.action = null;
            this.data.buttonText = 'Entendi';
            this.data.url = '/home/seus-anuncios';

            this.loginService.isLoading = false;
          }

          break;
      }
    }
    catch(err) {
      this.commonService.openDialog(null, 'Ops! Ocorreu um erro!', '/home', 'error', null);
    }
  }
}
