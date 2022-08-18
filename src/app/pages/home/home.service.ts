import { Injectable } from '@angular/core';

import { LoginService } from '../../shared/services/login.service';
import { ApiService } from '../../shared/services/api.service';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  usuarioEstaLogado: boolean;

  constructor(private loginService: LoginService, private apiService: ApiService) {
    this.usuarioEstaLogado = this.loginService.getUsuarioEstaLogado();
  }

  initialize(homeComponent: any) {
    this.usuarioEstaLogado = this.loginService.estaLogado;
    this.loginService.homeComponent = homeComponent;

    return this.apiService.get(environment.endpoints.quantidade);
  }

  pesquisarDesaparecidoPorNome(filtro: string, pagina: number, quantidade: number) {
    return this.apiService.search(environment.endpoints.search, filtro, pagina, quantidade);
  }

  obterQuantidadeItensDoCatalogo() {
    return this.apiService.get(environment.endpoints.quantidade_anuncios_cadastrados);
  }

  obterQuantidadeAnunciosorUsuario() {
    return this.apiService.get(environment.endpoints.quantidade).toPromise();
  }

  obterAnuncioPorId(id: number) {
    return this.apiService.get(`${environment.endpoints.desaparecidos}/${id}`);
  }

  verificarPermissaoParaEditarAnuncioCadastrado(anuncioId) {
    return this.apiService.get(`${environment.endpoints.permissao_edicao_anuncio_cadastrado}/${anuncioId}`);
  }

  async obterQuantidadeItensPorPagina(pagina: number, quantidade: number) {
    return await this.apiService.get(`${environment.endpoints.quantidade_itens_pagina}/${pagina}/${quantidade}`).toPromise();
  }

  obterDesaparecidosCadastradosRecentemente(quantidade: number){
    return this.apiService.get(`${environment.endpoints.ultimos}/${quantidade}`);
  }
}
