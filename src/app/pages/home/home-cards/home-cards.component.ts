import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { LoginService } from '../../../shared/services/login.service';

import { HomeService } from '../home.service';


import { Message } from '../../../shared/utils/message';
import { CommonService } from '../../../shared/services/common.service';
import { ApiService } from '../../../shared/services/api.service';


@Component({
  selector: 'home-cards',
  templateUrl: './home-cards.component.html',
  styleUrls: ['./home-cards.component.scss']
})
export class HomeCardsComponent implements OnInit {
  usuarioEstaLogado: boolean;
  anuncio: any = {};
  isLoading: boolean;
  isLoadingCarousel: boolean;

  cardType: string = 'info';
  public error: boolean;

  estatistica: any = {};

  carouselImages: any[];

  desaparecidos: any;

  colorRipple = 'rgba(0,0,0,0.1)'

  constructor(private loginService: LoginService,
    private homeService: HomeService,
    private apiService: ApiService,
    private commonService: CommonService,
    private sanitizer: DomSanitizer,
    private router: Router) { }


  ngOnInit(): void {
    this.carouselImages = [];

    this.inicializar();
  }

  ngDoCheck() {
    this.usuarioEstaLogado = this.loginService.getUsuarioEstaLogado();
    const fezLogin = localStorage.getItem('fezLogin');
    if (this.usuarioEstaLogado && fezLogin) {
      this.inicializar();
      localStorage.removeItem('fezLogin');
    }
  }

  inicializar() {
    this.estatistica.titulo = 'Desaparecidos';
    this.estatistica.subtitulo = 'Cadastrados';

    try {
      this.isLoadingCarousel = true;
      this.homeService.obterDesaparecidosCadastradosRecentemente(5)
        .toPromise()
        .then((message: Message) => {
          if (message.success) {
            message.data.forEach(item => {
              const imagem_formatada = this.commonService.formatarImagemComoBase64(item.anexos[0].arquivo, item.anexos[0].tipo);
              const imagem_final = this.sanitizer.bypassSecurityTrustResourceUrl(imagem_formatada);
              this.carouselImages.push({ path: imagem_final });
              this.isLoadingCarousel = false;
            });
          }
        });
    }
    catch(err){
      this.commonService.onErrorResponse(err);
    }


    this.usuarioEstaLogado = this.loginService.getUsuarioEstaLogado();
    if (this.usuarioEstaLogado) {
      this.cardType = 'info';
      this.error = false;
      this.isLoading = true;
      this.homeService.initialize(this)
        .toPromise()
        .then((message: Message) => {
          this.anuncio.quantidade = message.data;
          this.anuncio.subtitulo = "Anúncios";
          localStorage.setItem('quantidadeItensCadastrados', this.anuncio.quantidade);
          window.scrollTo(0, 0);
        })
        .catch(err => {
          this.error = true;
          this.anuncio.quantidade = 0;
          // this.commonService.onErrorResponse(err, null, true);
        })
        .finally(() => {
          this.isLoading = false;
        });
    }

    this.homeService.obterQuantidadeItensDoCatalogo()
    .toPromise()
    .then((message: Message) => {
        localStorage.setItem('quantidadeItensNoCatalogo', message.data);
        this.estatistica.quantidade = message.data;
    });

  }

  recarregarAnuncios(event) {
    console.log('capturando evento no home cards...', event);
    if (event) {
      this.inicializar();
    }
  }

  onClickCarousel() {
    this.router.navigate(['/catalogo']);
  }
}
