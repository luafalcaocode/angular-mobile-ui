import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RevealWindowService } from './reveal-window.service';

@Component({
  selector: 'reveal-window',
  templateUrl: './reveal-window.component.html',
  styleUrls: ['./reveal-window.component.scss']
})
export class RevealWindowComponent implements OnInit {
  @Input() title;
  @Input() icon;
  @Input() leftIcon;
  @Input() toolbarPosition: string = 'relative';

  @Output() onClickLeftIconEvent: EventEmitter<any> = new EventEmitter<any>();

  closeReveal: boolean;

  usuario: any = {
    nome: null,
    email: null
  };

  constructor(private revealService: RevealWindowService) { }

  ngOnInit(): void {
  }

  onClose() {
    this.revealService.close();
  }

  onClickLeftIcon(event) {
    console.log('emitindo do reveal pro app...');
    this.onClickLeftIconEvent.emit(event);
  }
}
