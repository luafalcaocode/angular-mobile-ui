import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { LoginService } from '../../services/login.service';
import { Message } from '../../utils/message';
import { RevealWindowService } from '../reveal-window/reveal-window.service';
import { GoogleAnalyticsService } from '../../services/google-analytics.service';

@Component({
  selector: 'form-verification-code',
  templateUrl: './form-verification-code.component.html',
  styleUrls: ['./form-verification-code.component.scss']
})
export class FormVerificationCodeComponent implements OnInit {

  @ViewChild('codigo_digito1') codigo_digito1;
  @ViewChild('codigo_digito2') codigo_digito2;
  @ViewChild('codigo_digito3') codigo_digito3;
  @ViewChild('codigo_digito4') codigo_digito4;
  @ViewChild('codigo_digito5') codigo_digito5;
  @ViewChild('codigo_digito6') codigo_digito6;

  isLoading: boolean;
  loadingMessage: string = 'Validando o código de acesso';
  codigoDeVerificacao: string = '';
  jaCadastrou: boolean

  digitosDoCodigoDeVerificacaoMap: Map<any, any>;

  constructor(private loginService: LoginService, private commonService: CommonService, private revealService: RevealWindowService, private googleService: GoogleAnalyticsService) { }

  ngOnInit(): void {
    this.digitosDoCodigoDeVerificacaoMap = new Map<any, any>();
  }

  ngAfterViewInit() {
    this.codigo_digito1.nativeElement.focus();
  }

  onPasteListener(event) {
    let value: any = event.clipboardData || window.Clipboard;
    value = value.getData('Text');

    if (value.length == 6) {
      let seletor;
      let next;

      for (let i = 0; i < 6; i++) {
        next = i + 1;
        seletor = `codigo_digito${next}`;
        this.codigoDeVerificacao += value[i];
        this[seletor].nativeElement.value = value[i];
      }

      event.preventDefault();

      this.isLoading = true;

      this.removerFocoDosCampos();
      this.selecionarQualTransacaoExecutar();
    }
  }

  onUpdateCodeField(posicaoDoCampo, digito) {
    const seletor = 'codigo_digito';
    const proximaPosicao = posicaoDoCampo + 1;
    let seletorAtual = `${seletor}${proximaPosicao}`

    if (!digito) {
      this.digitosDoCodigoDeVerificacaoMap.delete(`${seletor}${posicaoDoCampo}`);
      return;
    }

    this.digitosDoCodigoDeVerificacaoMap.set(`${seletor}${posicaoDoCampo}`, digito);

    if (this.digitosDoCodigoDeVerificacaoMap.size == 6) {
      this.digitosDoCodigoDeVerificacaoMap.forEach(item => {
        this.codigoDeVerificacao += item;
      });

      this.isLoading = true;

      this.removerFocoDosCampos();
      this.selecionarQualTransacaoExecutar();
    }

    if (this[seletorAtual]) {
      this[seletorAtual].nativeElement.focus();
    }
  }

  removerFocoDosCampos() {
    this.codigo_digito1.nativeElement.blur();
    this.codigo_digito2.nativeElement.blur();
    this.codigo_digito3.nativeElement.blur();
    this.codigo_digito4.nativeElement.blur();
    this.codigo_digito5.nativeElement.blur();
    this.codigo_digito6.nativeElement.blur();
  }

  reenviarCodigoDeVerificacaoPorEmail() {
    this.isLoading = true;
    this.loginService.reenviarCodigoDeVerificacao(this.loginService.emailUsuario).toPromise().then((message: Message) => {
      this.codigo_digito1.nativeElement.focus();
    })
      .catch((err: Message) => {
        this.onError(err);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  selecionarQualTransacaoExecutar() {
    const previousContent = localStorage.getItem('previousContent');
    if (previousContent && previousContent.includes('inserir-nova-senha')) {

      this.loginService.verificarCodigo(this.codigoDeVerificacao)
        .toPromise()
        .then((response) => {
          this.onSuccessVerificarCodigo(response);
        })
        .catch(err => {
          this.onError(err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
    else {
      this.loginService.cadastrar({ codigoDeVerificacao: this.codigoDeVerificacao, senha: this.loginService.senhaDoUsuario })
        .toPromise()
        .then((response) => {
          this.googleService.logEvent('cadastro_usuario', {
            codigo_verificacao: this.codigoDeVerificacao,
            data_operacao: new Date().toLocaleDateString('pt-BR')
          });

          this.onSuccessCadastro(response);
        })
        .catch(err => {
          this.onError(err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }

  onSubmit(form) {
    console.log(form);
  }

  onSuccessCadastro(message: any) {
    this.isLoading = false;

    this.loginService.setActiveKeys(message);
    this.loginService.setActiveStyles();

    this.commonService.abrirModalAposCadastroDoUsuario('Seu cadastro foi efetuado com sucesso.', '/home', 'success');
  }

  onSuccessVerificarCodigo(message: any) {
    localStorage.setItem('codigoDeVerificacao', message.data.codigoVerificacao)
    localStorage.setItem('revealContent', 'inserir-nova-senha');
    localStorage.removeItem('previousContent');
  }

  onError(message: any) {

    this.digitosDoCodigoDeVerificacaoMap.clear();

    for (let index = 1; index <= 6; index++) {
      let seletor = 'codigo_digito' + index;
      this[seletor].nativeElement.disabled = false;
      this[seletor].nativeElement.value = '';
      this.codigoDeVerificacao = '';
    }

    this.codigo_digito6.nativeElement.blur();
    this.codigo_digito1.nativeElement.focus();

    let legenda: string;
    let modalType: string;

    if (message.status == 400) {
      legenda = message.error.validations.join();
      modalType = 'warning';
    }
    else {
      legenda = 'Ops! Ocorreu um erro! :(';
      modalType = 'error';
    }

    this.loginService.isLoading = false;


    this.commonService.abrirModalAposCadastroDoUsuario(legenda, null, modalType);

    localStorage.setItem('revealContent', 'cadastrar');
    localStorage.setItem('revealTitle', 'Cadastre-se');
  }
}
