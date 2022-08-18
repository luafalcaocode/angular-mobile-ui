import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../shared/services/common.service';
import { Message } from '../../../shared/utils/message';
import { CatalogoService } from '../catalogo.service';
import { SimpleCarouselComponent } from '../../../shared/components/simple-carousel/simple-carousel.component';

import { DomSanitizer, ɵangular_packages_platform_browser_platform_browser_j } from '@angular/platform-browser';
import { GoogleAnalyticsService } from '../../../shared/services/google-analytics.service';

@Component({
  selector: 'catalogo-details',
  templateUrl: './catalogo-details.component.html',
  styleUrls: ['./catalogo-details.component.scss']
})
export class CatalogoDetailsComponent implements OnInit {

  itemList: any[];
  images: any[];
  isLoading: boolean = true;
  carousel: SimpleCarouselComponent;

  constructor(private router: ActivatedRoute,
    private commonService: CommonService,
    private catalogoService: CatalogoService,
    private sanitizer: DomSanitizer,
    private googleService: GoogleAnalyticsService) { }


  ngOnInit() {
    window.scrollTo(0, 0);
    window.removeEventListener('scroll', () => {
      console.log('removendo o listener de scroll');
    });

    this.commonService.setMainContainer('0px', '0px', '57px');
    this.isLoading = true;
    this.router.params.subscribe(param => {
      this.catalogoService.obterAnuncioPorId(param.id)
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
    });

    this.googleService.logPageView();

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


      if (prop.includes('enderecos')) {
        const enderecos = message.data[prop];
        for (const prop in enderecos) {
          this.itemList.push({
            title: 'Cidade',
            description: enderecos[prop].cidade,
            icon: this.setListIconByProp('cidade')
          });

          this.itemList.push({
            title: 'Estado',
            description: enderecos[prop].estado,
            icon: this.setListIconByProp('estado')
          });
        }
      }
    }
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
}
