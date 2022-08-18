import { Component } from '@angular/core';

import { RevealWindowService } from './shared/components/reveal-window/reveal-window.service';
import { LoginService } from './shared/services/login.service';
import { CommonService } from './shared/services/common.service';
import { HomeService } from './pages/home/home.service';
import { GoogleAnalyticsService } from './shared/services/google-analytics.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title: string;
  headerTitle: string;
  leftHeaderIcon: string;
  leftIconRevealWindow: string;
  revealContent: string;
  revealTitle: string;
  urlPath: string;

  temUmCodigoDeAcessoValido: boolean = true;
  codigoAcesso: string;
  campoDesabilitado: boolean = true;

  recuperabilidadeTemErros: boolean;
  gerenciouContadores: boolean = false;

  quantidadeNotificacoes: number;
  notificacoesForamLidas: boolean;

  constructor(private revealService: RevealWindowService, private loginService: LoginService,
    private commonService: CommonService, private homeService: HomeService, private googleService: GoogleAnalyticsService,
    private router: Router) {
  }

  ngOnInit() {
    this.recuperabilidadeTemErros = (localStorage.getItem('recuperabilidade_tem_erros') ? true : false);
    if (this.recuperabilidadeTemErros) {
      this.recuperarDeErros();
    }

    this.defineHeader();
    this.loginService.isAuthenticated();
    this.getRevealContent();
    this.info();
    this.obterQuantidadeDeNotificacoes();
  }

  ngDoCheck() {
    this.defineHeader();
    this.getRevealContent();

    if (localStorage.getItem('notificacoesForamLidas')) {
      this.notificacoesForamLidas = true;
    }
  }

  obterQuantidadeDeNotificacoes() {
    setInterval(() => {
      const quantidadeRetornadaPelaApi = 5; // chamar api aqui
      const quantidadeSalvaNoStorage = parseInt(localStorage.getItem('quantidadeNotificacoes'));

      if (quantidadeSalvaNoStorage != quantidadeRetornadaPelaApi) {
        this.quantidadeNotificacoes = quantidadeRetornadaPelaApi;

        localStorage.removeItem('notificacoesForamLidas');
        this.notificacoesForamLidas = false;

        localStorage.setItem('quantidadeNotificacoes', this.quantidadeNotificacoes.toString());
      }

    }, 60000);
  }

  onNotificacoesForamLidas() {
    localStorage.setItem('notificacoesForamLidas', 'true');
    this.notificacoesForamLidas = true;
  }

  validarAcesso() {
    this.loginService.validarCodigoAcesso(this.codigoAcesso)
      .then(codigo => {
        if (codigo)
          this.temUmCodigoDeAcessoValido = true;
      })
      .catch(err => {
        this.temUmCodigoDeAcessoValido = false;
      });
  }

  validarTamanhoCodigoAcesso() {
    if (this.codigoAcesso.length != 7) {
      this.campoDesabilitado = true;
    }
    else {
      this.campoDesabilitado = false;
    }
  }

  quandoSelecionarVoltar(event) {
    if (event) {
      switch (this.revealContent) {
        case 'cadastrar':
          this.setRevealContent('login');
          this.setRevealTitle('Acesse sua conta');
          break;
        case 'esqueci-senha':
          this.setRevealContent('login');
          this.setRevealTitle('Acesse sua conta');
          break;
      }
    }
  }

  getRevealContent() {
    this.revealContent = localStorage.getItem('revealContent');
    this.revealTitle = localStorage.getItem('revealTitle');

    if (this.revealContent) {
      if (this.revealContent.includes('cadastrar') || this.revealContent.includes('esqueci-senha') && this.revealService.isOpened) {
        this.leftIconRevealWindow = 'arrow_back_ios';
      }
      else {
        this.leftIconRevealWindow = '';
      }
    }
  }


  setRevealContent(content: string) {
    localStorage.setItem('revealContent', content);
  }

  setRevealTitle(title: string) {
    localStorage.setItem('revealTitle', title);
  }

  defineHeader() {
    const URL = document.URL;

    if (URL.search("cadastro") > -1) {
      this.headerTitle = "Cadastro de Desaparecidos";
      this.leftHeaderIcon = "";
    }
    else if (URL.search("catalogo") > -1 && URL.search("detalhes") < 0) {
      this.headerTitle = "Catálogo de Desaparecidos";
      this.leftHeaderIcon = "";
    }
    else if (URL.search("configuracoes") > -1) {
      this.headerTitle = "Alertas"
      this.leftHeaderIcon = "";
    }
    else if (URL.search("seus-anuncios") > -1 && URL.search("detalhes") < 0) {
      this.headerTitle = "Seus Anúncios"
      this.leftHeaderIcon = "";
    }
    else if (URL.search("detalhes") > -1 || URL.search("estatisticas") > -1) {
      this.leftHeaderIcon = "arrow_back_ios";
      this.headerTitle = "voltar";
    }
    else {
      this.headerTitle = "Desapp";
      this.leftHeaderIcon = "";
    }
  }

  info() {
    console.log(`Versão 1.0.0 de ${new Date().toLocaleDateString('pt-BR')}`);
  }

  onClickIcon(event) {
    this.revealService.init(this.loginService.getUsuarioEstaLogado());
    this.getRevealContent();
    this.revealService.open();
  }

  recuperarDeErros() {
    this.commonService.refazerOperacoesQueDeramErro('recuperabilidade_upload_anexos');
  }
}
