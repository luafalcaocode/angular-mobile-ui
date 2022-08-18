import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { Message } from '../../../shared/utils/message';

import { CatalogoService } from '../catalogo.service';
import { CommonService } from '../../../shared/services/common.service';
import { LoginService } from '../../../shared/services/login.service';
import { ApiService } from '../../../shared/services/api.service';
import { GoogleAnalyticsService } from 'src/app/shared/services/google-analytics.service';

import { URLs } from '../../../constants/urls.const';

@Component({
  selector: 'catalogo-list',
  templateUrl: './catalogo-list.component.html',
  styleUrls: ['./catalogo-list.component.scss']
})
export class CatalogoListComponent implements OnInit {

  quantidadeItensNoCatalogo: number;
  quantidadeItensRetornadosNaPesquisa: number = 1;

  anuncios: any;
  anunciosPesquisados: any;

  cardType: string = 'anuncio';
  alturaSearchBar: string = '90%';
  statusPesquisa: string = '';

  isPesquisarAtivado: boolean = false;
  isLoading: boolean = false;
  isLoadingSearchBar: boolean;
  isLightboxVisible: boolean;
  isSearchBarVisible: boolean;
  error: boolean;
  usouScroll: boolean;
  onScrollInterval: any;
  currentScroll: any = 0;

  pagina: number = 1;
  quantidade: number = 4;
  paginaPesquisa: number = 1;
  quantidadeItensPesquisa: number = 4;
  filtroPesquisa: string;

  index: number = 0
  indexPesquisa: number = 0;
  scrollAtual: number = 0;

  loadingInterval: any;


  constructor(private router: Router, private catalogoService: CatalogoService, private commonService: CommonService,
    private loginService: LoginService, private sanitizer: DomSanitizer, private apiService: ApiService, private googleService: GoogleAnalyticsService) { }

  ngOnInit(): void {
    this.setStyles(true);
    this.inicializar();
    this.anunciosPesquisados = [];

    this.googleService.logPageView();
  }

  ngOnDestroy() {
    this.setStyles(false);
    this.limparListaPesquisa();
    this.pagina = 1;
    this.index = 0;

    localStorage.removeItem('screenPath');
  }

  inicializar() {
    this.anuncios = [];
    this.isLoading = true;

    localStorage.setItem('screenPath', '/catalogo');

    this.quantidadeItensNoCatalogo = parseInt(localStorage.getItem('quantidadeItensNoCatalogo'));

    if (this.anuncios.length < this.quantidadeItensNoCatalogo) {
      for (var indice = 0; indice < this.quantidade && indice < this.quantidadeItensNoCatalogo; indice++) {
        this.anuncios.push({ imagem: null, nomeDoDesaparecido: '', quantidadePessoasQueViramDesaparecido: 0 })
      }
    }

    this.obterImagens();


    window.scrollTo(0, 0);
  }

  obterImagens() {
    this.isLoading = true;
    if (this.index < this.quantidadeItensNoCatalogo && this.quantidadeItensNoCatalogo > 0) {
      this.catalogoService.obterAnuncios(this.pagina, this.quantidade)
        .toPromise()
        .then((message: Message) => {
          this.onSuccessObterAnunciosCadastrados(message);
        })
        .catch(err => {
          this.error = true;
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
    else if (this.quantidadeItensNoCatalogo == 0) {
      console.log('sem anúncios cadastrados');
    }
  }

  onSuccessObterAnunciosCadastrados(message: Message) {
    this.error = false;

    if (message.data && message.data.length > 0) {

      message.data.forEach(desaparecido => {
        if (desaparecido.anexos.length <= 0) {
          return;
        }

        const image_data = "data:";
        const image_type = desaparecido.anexos[0] ? desaparecido.anexos[0].tipo + ';' : null;
        const image_charset = "charset=utf-8;"
        const image_base64_prefix = 'base64,'
        const image_formated = `${image_data}${image_type}${image_charset}${image_base64_prefix}${desaparecido.anexos[0].arquivo}`;
        const image_final = this.sanitizer.bypassSecurityTrustResourceUrl(image_formated);

        const desaparecidosCardObject = this.anuncios[this.index];

        if (desaparecidosCardObject) {
          desaparecidosCardObject.url = `catalogo/detalhes/${desaparecido.id}`
          desaparecidosCardObject.imagem = image_final;
          desaparecidosCardObject.nomeDoDesaparecido = desaparecido.nome.length > 35 ? desaparecido.nome.substring(0, 35) + '...' : desaparecido.nome;
          desaparecidosCardObject.quantidadePessoasQueViramDesaparecido = 10;
        }

        ++this.index;
      });

      ++this.pagina;


      this.commonService.hideErrorPage();
    }
  }

  onOpen(event) {
    this.commonService.navigateTo(event);
  }

  setStyles(active: boolean) {
    const main_container = (<HTMLElement>document.querySelector('.main-container'));
    const grid = (<HTMLElement>document.querySelector('#containerPesquisaCatalogo'));

    if (active) {
      main_container.style.paddingLeft = '0px';
      main_container.style.paddingRight = '0px';
      main_container.style.paddingBottom = '50px';

      grid.style.paddingLeft = '20px';
      grid.style.paddingRight = '20px';

      return;
    }

    main_container.style.paddingLeft = '20px';
    main_container.style.paddingRight = '20px';
    main_container.style.paddingBottom = '70px';

    grid.style.paddingLeft = '20px';
    grid.style.paddingRight = '20px';

  }

  quandoUsuarioClicarNoIconeDePesquisa() {
    this.isSearchBarVisible = true;
    this.statusPesquisa = 'default';
    this.commonService.removerBarraDeRolagem();
  }

  quandoUsuarioClicarNoIconeDeRetorno(event) {
    this.alturaSearchBar = '90%';
    this.isSearchBarVisible = false;
    this.isLoadingSearchBar = false;
    this.limparListaPesquisa();

  }

  onClickBuscar() {
    this.isLoading = !this.isLoading;
  }

  pesquisar() {
    this.apiService
      .obterQuantidadeItensRetornadosPesquisaPorFiltro(environment.endpoints.search_catalogo_quantidade, this.filtroPesquisa)
      .toPromise()
      .then((message: Message) => {
        this.quantidadeItensRetornadosNaPesquisa = message.data;

        if (this.anunciosPesquisados.length < this.quantidadeItensRetornadosNaPesquisa) {
          for (var indice = 0; (indice < this.quantidadeItensPesquisa && indice < this.quantidadeItensRetornadosNaPesquisa); indice++) {
            this.anunciosPesquisados.push({
              imagem: '',
              nomeDoDesaparecido: '',
              quantidadePessoasQueViramDesaparecido: 10

            });
          }
        }

        this.googleService.logEvent('pesquisa_desaparecido_catalogo', {
          nome_desaparecido: this.filtroPesquisa,
          usuario: localStorage.getItem('user'),
          data_operacao: new Date().toLocaleDateString('pt-BR')
        });

        this.apiService.search(`${environment.endpoints.search_catalogo}`, this.filtroPesquisa, this.paginaPesquisa, this.quantidadeItensPesquisa)
          .toPromise()
          .then((message: Message) => {
            this.onSuccessPesquisa(message.data);
          }).catch(err => {
            this.statusPesquisa = 'resultadoNaoEncontrado';
          })
          .finally(() => {
            this.isLoadingSearchBar = true;
          });
      }).catch(err => {
        console.log(err);
      });

  }

  pesquisarComBarraDeRolagem() {
    if (this.anunciosPesquisados.length < this.quantidadeItensRetornadosNaPesquisa) {
      for (var indice = this.indexPesquisa; indice < this.quantidadeItensRetornadosNaPesquisa; indice++) {
        this.anunciosPesquisados.push({
          imagem: '',
          nomeDoDesaparecido: '',
          quantidadePessoasQueViramDesaparecido: 10

        });
      }
    }


    this.apiService.search(`${environment.endpoints.search_catalogo}`, this.filtroPesquisa, this.paginaPesquisa, this.quantidadeItensPesquisa)
      .toPromise()
      .then((message: Message) => {
        this.onSuccessPesquisa(message.data);
      }).catch(err => {
        this.statusPesquisa = 'resultadoNaoEncontrado';
      })
      .finally(() => {
        this.isLoadingSearchBar = true;
      });;
  }

  onSuccessPesquisa(resultados: any) {
    this.error = false;

    resultados.forEach(item => {

      if (item.anexos.length <= 0) {
        return;
      }

      const imagemBase64 = this.commonService.formatarImagemComoBase64(item.anexos[0].arquivo, item.anexos[0].tipo);
      const thumbnail = this.sanitizer.bypassSecurityTrustResourceUrl(imagemBase64);

      this.anunciosPesquisados[this.indexPesquisa].imagem = thumbnail;
      this.anunciosPesquisados[this.indexPesquisa].nomeDoDesaparecido = item.nome.length > 35 ? item.nome.substring(0, 35) + '...' : item.nome;
      this.anunciosPesquisados[this.indexPesquisa].quantiadePessoasQueViramDesaparecido = 10;
      this.anunciosPesquisados[this.indexPesquisa].url = `catalogo/detalhes/${item.id}`;

      this.indexPesquisa++;
    });

    this.statusPesquisa = 'ok';

    this.commonService.hideErrorPage();
  }

  @HostListener('document:scroll', ['$event'])
  onScroll(event) {
    let totalDePaginas = Math.trunc(this.quantidadeItensNoCatalogo / this.quantidade);
    let resto = this.quantidadeItensNoCatalogo % this.quantidade;

    if (resto >= 0) {
      totalDePaginas++;
    }


    this.onScrollInterval = setInterval(() => {
      if (!this.isLoading && this.currentScroll != window.scrollY && this.verificarURL()) {
        if (this.anuncios.length < this.quantidadeItensNoCatalogo && this.pagina < totalDePaginas) {
          for (var indice = 0; indice < this.quantidade && indice < this.quantidadeItensNoCatalogo; indice++) {
            this.anuncios.push({ imagem: null, nomeDoDesaparecido: '', quantidadePessoasQueViramDesaparecido: 0 })
          }

          this.currentScroll = window.scrollY;

          this.obterImagens();
        }
      }
    }, 300);
  }

  verificarURL() {
    const screenPath = localStorage.getItem('screenPath');
    return screenPath == '/catalogo';
  }

  quandoUsuarioConfirmarPesquisa(consulta: any) {
    this.filtroPesquisa = consulta.value;
    this.isSearchBarVisible = true;
    this.isLoadingSearchBar = true;
    this.statusPesquisa = 'carregando';

    if (consulta.pagina) {
      this.paginaPesquisa = consulta.pagina;
    }

    if (consulta.jaFezUmaPesquisaAntes && this.paginaPesquisa != 1) {
      this.isLoadingSearchBar = false;
      this.statusPesquisa = 'ok';
      this.pesquisarComBarraDeRolagem();
    }
    else {
      this.anunciosPesquisados = [];
      this.paginaPesquisa = 1;
      this.indexPesquisa = 0;
      this.pesquisar();
    }
  }

  quandoUsuarioLimparPesquisa(event) {
    this.isLoadingSearchBar = false;
  }

  onCloseLightBox(event) {
    this.isLightboxVisible = !event;
  }

  onSubmit() {

  }

  limparListaPesquisa() {
    this.anunciosPesquisados = [];
    this.statusPesquisa = '';
    this.paginaPesquisa = 1;
    this.quantidadeItensPesquisa = 4;
    this.commonService.inserirBarraDeRolagem();
  }

  obterQuantidadeItensNoCatalogo() {
    return this.apiService.get(environment.endpoints.quantidade_anuncios_cadastrados)
  }
}
