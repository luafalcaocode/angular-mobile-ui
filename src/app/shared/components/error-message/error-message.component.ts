import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {
  @Input() errorTitle: string;
  @Input() errorMessage:string;

  constructor() { }

  ngOnInit(): void {
  }

}
