import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CadastroComponent } from './cadastro.component';

import { LoginService } from '../../shared/services/login.service';
import { RevealWindowService } from '../../shared/components/reveal-window/reveal-window.service';
import { ApiService } from '../../shared/services/api.service';
import { environment } from '../../../environments/environment';
import { DesaparecidoModel } from '../../models/desaparecido.model';

import { Message } from '../../shared/utils/message';


@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  usuarioEstaLogado: boolean;

  constructor(private loginService: LoginService, private revealService: RevealWindowService, private apiService: ApiService) {

  }

  initialize(cadastroComponent: CadastroComponent) {
    document.documentElement.scrollTop = 0;
    this.usuarioEstaLogado = this.loginService.getUsuarioEstaLogado();
    this.loginService.cadastroComponent = cadastroComponent;

    if (!this.usuarioEstaLogado) {
      this.revealService.open();
    }
  }

  async cadastrarDesaparecido(dadosDoDesaparecido: DesaparecidoModel) {
     return await this.apiService.post(environment.endpoints.desaparecidos, dadosDoDesaparecido).toPromise();
  }


  async fazerUploadFotos(fotos: FormData) {
    return await this.apiService.upload(environment.endpoints.anexos, fotos).toPromise();
  }

  async validarAnexosExistentes(anexosIds: FormData) {
    return await this.apiService.postFormData(environment.endpoints.anexos_validacoes_existente, anexosIds).toPromise();
  }

  async removerAnexos(arquivoIds: any[]) {
    await this.apiService.update(`${environment.endpoints.anexos_exclusao}`, arquivoIds).toPromise();
  }

  removerCadastroDesaparecido(desaparecidoId: number) {
    return this.apiService.removerPorId(`${environment.endpoints.desaparecidos}/${desaparecidoId}`);
  }
}
