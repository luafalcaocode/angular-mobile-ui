import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';
import { RevealWindowService } from 'src/app/shared/components/reveal-window/reveal-window.service';

@Component({
  selector: 'home-seus-anuncios',
  templateUrl: './home-seus-anuncios.component.html',
  styleUrls: ['./home-seus-anuncios.component.scss']
})
export class HomeSeusAnunciosComponent implements OnInit {
  @Input() titleCard: string;
  @Input() cardType: string;
  @Input() anuncio: any;
  @Input() isLoading: boolean;
  @Input() error: boolean;

  @Output() open: EventEmitter<any> = new EventEmitter<any>();
  @Output() reload: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router, private loginService: LoginService, private revealService: RevealWindowService) { }

  ngOnInit(): void {
  }

  onOpen(event) {
    const usuarioEstaLogado = this.loginService.getUsuarioEstaLogado();
    if (!usuarioEstaLogado) {
      localStorage.setItem('revealContent', 'login');
      localStorage.setItem('revealTitle', 'Acesse sua conta');

      this.revealService.open();
    }
    else {
      this.router.navigate([event]);
    }
  }

  recarregarAnuncios(event) {
    console.log('emitindo evento de seus anúncios para home cards...');
    this.reload.emit(event);
  }
}
