import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class RevealWindowService {
  revealContent: string;
  revealTitle: string;
  isOpened: boolean;

  constructor() { }

 init(flagEstaLogado?:any) {
    if (flagEstaLogado) {
      localStorage.setItem('revealContent', 'logout');
      localStorage.setItem('revealTitle', 'Minha conta');
    }
    else {
      localStorage.setItem('revealContent', 'login');
      localStorage.setItem('revealTitle', 'Acesse sua conta');
    }
  }

  open() {
    const revealElement = (<HTMLElement> document.querySelector('.reveal-window'));
    revealElement.classList.remove('reveal-close');
    revealElement.style.paddingTop = '0';
    revealElement.style.transition = '.7s ease-out';

    const body = (<HTMLElement> document.querySelector('body'));
    body.classList.add('u-no-scroll');

    this.isOpened = true;
  }

  close() {
    const revealElement = (<HTMLElement> document.querySelector('.reveal-window'));
    revealElement.classList.add('reveal-close');

    const body = (<HTMLElement> document.querySelector('body'));
    body.classList.remove('u-no-scroll');

    this.isOpened = false;
  }
}
