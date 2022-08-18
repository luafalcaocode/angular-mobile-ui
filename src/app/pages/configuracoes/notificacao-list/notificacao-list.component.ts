import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'notificacao-list',
  templateUrl: './notificacao-list.component.html',
  styleUrls: ['./notificacao-list.component.scss']
})
export class NotificacaoListComponent implements OnInit {
  @Input() notificacoes: any[];

  isLoading = true;

  colorRipple = 'rgba(0,0,0,0.1)'

  @Output() onNotificacoesLidas: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    this.notificacoes = [
      {
        title: 'Novo anúncio cadastrado',
        name: 'Luã Falcão',
        city: 'Rio de Janeiro',
        state: 'RJ',
        time: '7h',
        type: null
      },
      {
        title: 'Novo anúncio cadastrado',
        name: 'Eleanor',
        city: 'São Paulo',
        state: 'SP',
        time: '3d',
        type: null
      },
      {
        title: 'Novo anúncio cadastrado',
        name: 'John Constantine',
        city: 'Rio de Janeiro',
        state: 'RJ',
        time: '1sem',
        type: null
      },
      {
        title: 'Novo anúncio cadastrado',
        name: 'Arliquina',
        city: 'Rio de Janeiro',
        state: 'RJ',
        time: '1sem',
        type: null
      },
      {
        title: 'Novo anúncio cadastrado',
        name: 'Floyd',
        city: 'Rio de Janeiro',
        state: 'RJ',
        time: '1sem',
        type: null
      },
      {
        title: 'Novo anúncio cadastrado',
        name: 'Robert Plant',
        city: 'Rio de Janeiro',
        state: 'RJ',
        time: '1sem',
        type: null
      }
    ]

    const mainContainer: any = document.querySelector('.main-container');
    mainContainer.style.paddingLeft = '0';
    mainContainer.style.paddingRight = '0';

    setTimeout(() => {
      this.isLoading = false;
    }, 1500);

    localStorage.setItem('notificacoesForamLidas', 'true');

  }

  ngDoCheck() {
    localStorage.setItem('notificacoesForamLidas', 'true');
  }

  ngOnDestroy() {
    const mainContainer: any = document.querySelector('.main-container');

    mainContainer.style.paddingLeft = '20px';
    mainContainer.style.paddingRight = '20px';
  }

}
