import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'form-esqueci-senha',
  templateUrl: './form-esqueci-senha.component.html',
  styleUrls: ['./form-esqueci-senha.component.scss']
})
export class FormEsqueciSenhaComponent implements OnInit {
  isLoading: boolean;

  @ViewChild("email") email: ElementRef;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  ngDoCheck() {
    this.isLoading = this.loginService.isLoading;
  }

  onSubmitAtualizarSenha(form) {
    this.email.nativeElement.blur();
    this.loginService.preAtualizar(form);
  }
}
