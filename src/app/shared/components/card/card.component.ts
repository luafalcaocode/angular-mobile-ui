import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() type: string;
  @Input() content: any;
  @Input() anuncio: any;
  @Input() isLoading: boolean;
  @Input() hasError: boolean;
  @Input() route: string;
  @Input() icon: string = 'person';

  @Output() onOpenCardEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() onReload: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('cardImage') image;

  cardImageIsVisible: boolean;
  alreadyCheckIsAuthenticated: boolean;
  isReloading: boolean;

  src: any;

  constructor(private element: ElementRef, private commonService: CommonService, private loginService: LoginService) { }

  ngAfterViewInit(): void {
    if (this.image) {
      this.image.nativeElement.onload = () => {
        this.cardImageIsVisible = true;
      };
    }
  }


  ngOnInit() {
  }

  ngDoCheck() {
  }

  ngOnChanges() {
  }

  reload() {
    this.onReload.emit(true);
  }

  onOpenCard(type) {
    if (this.hasError) {
      type = 'error';
    }

    let route = '';

    switch (type) {
      case 'info':
        route = this.route ? this.route : '/home/seus-anuncios';
        break;
      case 'add':
        route = '/cadastro'
        break;
      case 'error':
        route = null;
        this.reload();
        break;
      case 'anuncio':
        route = this.anuncio.url;

    }

    if (route) {
      this.onOpenCardEvent.emit(route);
    }
  }
}
