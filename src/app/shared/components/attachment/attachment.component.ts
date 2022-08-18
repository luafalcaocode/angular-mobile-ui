import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMAGE_EXTENSIONS } from '../../constants/extensions';
import { DomSanitizer } from '@angular/platform-browser';

import { CommonService } from '../../services/common.service';

@Component({
  selector: 'attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.scss']
})
export class AttachmentComponent implements OnInit {
  @Input() fieldId;
  @Output() fileSelectedEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() clear: boolean;
  @Input() attachmentSelectedField: any;

  imageLoadedFromEditScreen: boolean;

  files: any[];
  file: any;
  src: any;
  countFiles: number;

  constructor(private commonService: CommonService, private sanitizer: DomSanitizer) {
    this.files = [];
    this.countFiles = 0;
  }

  ngOnInit(): void {

  }

  ngDoCheck() {
    if (this.clear && this.files.length > 0) {
      this.files = [];

      const field = (<HTMLInputElement>document.getElementById(this.fieldId));
      field.value = '';
    }
  }

  ngAfterViewInit() {
    if (this.attachmentSelectedField && !this.checkForInvalidExtension(this.attachmentSelectedField)) {
      const imagemBase64 = this.commonService.formatarImagemComoBase64(this.attachmentSelectedField.file, this.attachmentSelectedField.type);
      const thumbnail = this.sanitizer.bypassSecurityTrustResourceUrl(imagemBase64);

      this.src = thumbnail;

      this.fileSelectedEvent.emit({ foiSelecionado: true, id: this.fieldId, file: this.file });
    }
  }


  openFileBox(field: any) {
    field.click();
  }

  onSelectedFiles(input) {
    this.file = input.files[0];
    if (this.file) {
      if (this.checkForInvalidExtension(this.file)) {
        input.value = ''
        this.fileSelectedEvent.emit({ foiSelecionado: false, id: this.fieldId });
        return;
      }

      this.setImageFromFile(this.file);
      this.files.push(this.file);

      this.fileSelectedEvent.emit({ foiSelecionado: true, id: this.fieldId, file: this.file });
    }
  }

  checkForInvalidExtension(file) {
    const dotPosition = file.name.lastIndexOf('.');
    if (dotPosition >= 0) {
      const extension = file.name.substring(dotPosition).toLowerCase();
      return (!IMAGE_EXTENSIONS.includes(extension))
    }

    return false;
  }

  setImageFromFile(file) {
    var fileReader = new FileReader();

    fileReader.onload = () => {
      this.src = fileReader.result;
    };

    fileReader.readAsDataURL(file);
  }
}
