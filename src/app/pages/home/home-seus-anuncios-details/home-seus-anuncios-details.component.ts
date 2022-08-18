import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../shared/services/common.service';
import { Message } from '../../../shared/utils/message';
import { HomeService } from '../home.service';
import { SimpleCarouselComponent } from '../../../shared/components/simple-carousel/simple-carousel.component';

import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';

import { GoogleAnalyticsService } from 'src/app/shared/services/google-analytics.service';

@Component({
  selector: 'app-home-seus-anuncios-details',
  templateUrl: './home-seus-anuncios-details.component.html',
  styleUrls: ['./home-seus-anuncios-details.component.scss']
})
export class HomeSeusAnunciosDetailsComponent implements OnInit {
  itemList: any[];
  images: any[];
  isLoading: boolean = true;
  carousel: SimpleCarouselComponent;
  anuncioId: string;
  permissaoEdicao: boolean;
  permissaoExclusao: boolean;

  linkEdicao: string;

  constructor(private router: ActivatedRoute, private commonService: CommonService, private homeService: HomeService, private sanitizer: DomSanitizer,
    private googleService: GoogleAnalyticsService) { }


  ngOnInit() {
    this.googleService.logPageView();

    window.scrollTo(0, 0);
    this.commonService.setMainContainer('0px', '0px', '57px');
    this.isLoading = true;
    this.router.params.subscribe(param => {
      this.anuncioId = param.id;

      this.homeService.verificarPermissaoParaEditarAnuncioCadastrado(this.anuncioId)
      .toPromise()
      .then((response: any) => {
        if (response.success) {
          this.permissaoEdicao = true;
          this.permissaoExclusao = true;
          this.linkEdicao = `/cadastro/${this.anuncioId}`;
        }

        this.homeService.obterAnuncioPorId(param.id)
        .toPromise()
        .then((message: Message) => {
          this.onSuccessObterAnuncioPorId(message);
        })
        .catch(err => {
          this.onErrorObterAnuncioPorId(err);
        })
        .finally(() => {
          this.isLoading = false;
        });
      })
    });
  }

  ngOnDestroy() {
    this.commonService.unSetMainContainer();
  }

  onSuccessObterAnuncioPorId(message: Message) {
    this.itemList = [];
    this.images = [];

    this.commonService.renderizarImagensNoIvyCarousel(message.data.anexos, this.carousel);

    for (const prop in message.data) {
      if (prop != 'id' && !prop.includes('anexos') && !prop.includes('enderecos')) {
        this.itemList.push({
          title: this.setListTitle(prop),
          description: message.data[prop] && message.data[prop] != '0' ? message.data[prop] : 'Não Informado',
          icon: this.setListIconByProp(prop)
        });
      }
    }

    const json = JSON.stringify(message.data);
    localStorage.setItem('registroSelecionado', json);
  }


  onLoadCarousel(data) {
    this.carousel = data;
  }

  onErrorObterAnuncioPorId(err: any) {
    console.log(err);
  }

  setListIconByProp(prop: string) {
    switch (prop) {
      case 'nome':
        return 'person_pin';
      case 'idade':
        return 'elderly';
      case 'cidade':
        return 'near_me';
      case 'estado':
        return 'place';
      case 'dataDesaparecimento':
        return 'event';
      case 'dataNascimento':
        return 'event';
      case 'genero':
        return 'sentiment_satisfied';
      case 'etnia':
        return 'sentiment_very_satisfied';
      case 'altura':
        return 'emoji_people';
      case 'peso':
        return 'self_improvement';
      case 'caracteristicaParticular':
        return 'accessible_forward';
      case 'observacao':
        return 'menu_book';
    }
  }

  setListTitle(prop: string) {
    switch (prop) {
      case 'dataDesaparecimento':
        return 'Data do desaparecimento';
      case 'dataNascimento':
        return 'Data de nascimento';
      case 'caracteristicaParticular':
        return 'Característica particular';
      case 'genero':
        return 'Gênero';
      case 'observacao':
        return 'Observação';
      case 'idade':
        return 'Idade';
      default:
        return prop;
    }
  }

  onClickDeleteIcon(event) {
    if (event) {
      localStorage.setItem('action', 'delete_anuncio');
      localStorage.setItem('endpoint_action', `${environment.endpoints.desaparecidos}/anuncios/${this.anuncioId}`)
      this.commonService.openDialog(null, 'Tem certeza que deseja excluir o anúncio?', null, 'warning', 'Sim', true);
    }
  }
}
