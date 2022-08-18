import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'simple-carousel',
  templateUrl: './simple-carousel.component.html',
  styleUrls: ['./simple-carousel.component.scss']
})
export class SimpleCarouselComponent implements OnInit {

  @Output() carousel: EventEmitter<any> = new EventEmitter<any>();
  @Input() images: any[];
  @Input() objectFit: string = 'cover';
  @Input() cellsToShow: number = 1;
  @Input() height: number = 320;
  @Input() hasDots: boolean = true;
  @Input() loop: boolean = false;
  @Input() autoplay: boolean = false;

  hasLoop: boolean;


  constructor() { }


  ngOnInit(): void {
    this.images = this.images ? this.images : this.images = [
      { path: '' },
      { path: '' },
      { path: '' },
      { path: '' }
    ]

    this.carousel.emit(this);
  }

  clearEmptySpaceAtImages() {
    do {
      this.images.forEach((item, index) => {
       if (!item.path) {
        this.images.splice(index, 1);
       }
      });
    } while (this.images.filter(item => !item.path).length > 0);
  }

}
