import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'form-nova-senha',
  templateUrl: './form-nova-senha.component.html',
  styleUrls: ['./form-nova-senha.component.scss']
})
export class FormNovaSenhaComponent implements OnInit {
  isLoading: boolean;
  @ViewChild("senha") senha: ElementRef;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.isLoading = false;
  }


  onSubmitAtualizarSenha(param) {
    this.isLoading = true;
    this.senha.nativeElement.blur();
    this.loginService.atualizarSenha(param.form.value.senha);
  }
}
