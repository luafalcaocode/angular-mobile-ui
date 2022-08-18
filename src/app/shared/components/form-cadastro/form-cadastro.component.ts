import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'form-cadastro',
  templateUrl: './form-cadastro.component.html',
  styleUrls: ['./form-cadastro.component.scss']
})
export class FormCadastroComponent implements OnInit {

  @ViewChild("email") email: ElementRef;
  @ViewChild("password") senha: ElementRef;
  @ViewChild("nome") nome: ElementRef;

  isLoading: boolean;

  constructor(private loginService: LoginService, private commonService: CommonService) { }

  ngOnInit(): void {
  }

  ngDoCheck() {
    this.isLoading = this.loginService.isLoading;
  }

  onSubmitCadastro(param) {
    this.loginService.preCadastrar(param);

    this.nome.nativeElement.blur();
    this.email.nativeElement.blur();
    this.senha.nativeElement.blur();
  }

  ngOnDestroy() {
    this.loginService.isLoading = false;
  }
}
