import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { GoogleAnalyticsService } from 'src/app/shared/services/google-analytics.service';

@Component({
  selector: 'home-estatisticas-list',
  templateUrl: './home-estatisticas-list.component.html',
  styleUrls: ['./home-estatisticas-list.component.scss']
})
export class HomeEstatisticasListComponent implements OnInit {
  @Input() itemList: any[];

  colorRipple = 'rgba(0,0,0,0.1)'

  constructor(private router: Router, private googleService: GoogleAnalyticsService) { }

  ngOnInit(): void {
    this.googleService.logPageView();

    this.itemList = [
      {
        title: 'visualizar por',
        description: 'ESTADO',
        icon: 'place'
      },
      {
        title: 'visualizar por',
        description: 'ANO DE NASCIMENTO',
        icon: 'elderly'
      },
      {
        title: 'visualizar por',
        description: 'ANO DO DESAPARECIMENTO',
        icon: 'elderly'
      },
      {
        title: 'visualizar por',
        description: 'GÊNERO',
        icon: 'sentiment_satisfied'
      },
      {
        title: 'visualizar por',
        description: 'ETNIA',
        icon: 'sentiment_very_satisfied'
      }
    ]

    const mainContainer: any = document.querySelector('.main-container');
    mainContainer.style.paddingLeft = '0';
    mainContainer.style.paddingRight = '0';
  }

  ngOnDestroy() {
    const mainContainer: any = document.querySelector('.main-container');

    mainContainer.style.paddingLeft = '20px';
    mainContainer.style.paddingRight = '20px';
  }

  quandoUsuarioSelecionarUmItemNaLista(item) {
    let filtroSelecionado = item.description.toLowerCase();

    if (filtroSelecionado.includes('etnia')) {
      filtroSelecionado = 'etnia';
    }
    else if (filtroSelecionado.includes('cidade')) {
      filtroSelecionado = 'cidade';
    }
    else if (filtroSelecionado.includes('estado')) {
      filtroSelecionado = 'estado';
    }
    else if (filtroSelecionado.includes('nascimento')) {
      filtroSelecionado = 'nascimento';
    }
    else if (filtroSelecionado.includes('desaparecimento')) {
      filtroSelecionado = 'desaparecimento';
    }
    else if (filtroSelecionado.includes('gênero')) {
      filtroSelecionado = 'gênero';
    }

    localStorage.setItem('filtro_estatistica', filtroSelecionado);

    this.router.navigate(['home/estatisticas/info']);
  }
}
