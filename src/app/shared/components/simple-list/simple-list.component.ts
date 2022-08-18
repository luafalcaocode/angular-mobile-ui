import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

export interface List {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'simple-list',
  templateUrl: './simple-list.component.html',
  styleUrls: ['./simple-list.component.scss']
})
export class SimpleListComponent implements OnInit {

  @Input() items: any[];
  @Input() type: string;

  colorRipple = 'rgba(0,0,0,0.1)';

  @Output() onSelectedItem: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {

  }

  onClickListItem(selectedItem) {
    console.log('emitindo...');
    console.log(selectedItem);
    this.onSelectedItem.emit(selectedItem);
  }

}
