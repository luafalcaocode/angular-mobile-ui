import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'edit-in-form',
  templateUrl: './edit-in-form.component.html',
  styleUrls: ['./edit-in-form.component.scss']
})
export class EditInFormComponent implements OnInit {
  @Input() showEditIcon: boolean;
  @Input() showDeleteIcon: boolean;
  @Input() linkEdit: string;

  @Output() onClickDeleteIconEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openEditScreen() {
    this.router.navigate([this.linkEdit]);
  }

  onClickDeleteIcon() {
    this.onClickDeleteIconEvent.emit(true);
  }
}
