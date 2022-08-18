import { Component, OnInit, Input, EventEmitter, Output, HostListener, ViewChild } from '@angular/core';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title: string = "Desapp";
  @Input() icon: string = "account_circle";
  @Input() toolbarPosition: string = 'fixed';
  @Input() leftIcon: string = '';
  @Input() titleMarginLeft: string = '-9px';

  @Output() onClickIconEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() onClickLeftIconEvent: EventEmitter<any> = new EventEmitter<any>();

  maxLengthTitle: number = 20;
  maxWidth: number = 360;

  @ViewChild(MatRipple) ripple: MatRipple;

  colorRipple = 'rgba(0,0,0,0.1)'


  constructor() { }

  ngOnInit(): void {
    this.onResize();
  }

  getTitle() {
      return (this.title && this.title.length > this.maxLengthTitle && this.maxWidth < 360 ? this.title.substring(0, this.maxLengthTitle) + '...' : this.title);
  }

  onClickIcon() {
    this.onClickIconEvent.emit(this.icon);
  }


  onClickLeftIcon() {
    const URL = document.URL;
    if (URL.search("detalhes") > -1 || URL.search('estatisticas') > -1) {
      window.history.back();
      return;
    }

    this.onClickLeftIconEvent.emit(true);
  }

  addLogoIconClass() {
    const title = this.title ? this.title.toLocaleLowerCase() : "";
    return title.includes('voltar') || title.includes('cadastre-se') || title.includes('senha');
  }

  @HostListener('window:resize', ['$event'])
  onResize()
  {
    this.maxWidth = window.innerWidth;
  }
}
