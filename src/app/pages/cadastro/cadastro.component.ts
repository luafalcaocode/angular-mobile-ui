import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { ModalInputComponent } from '../../shared/components/modal-input/modal-input.component';


import { CadastroService } from './cadastro.service';
import { CommonService } from '../../shared/services/common.service';
import { LoginService } from '../../shared/services/login.service';
import { GoogleAnalyticsService } from '../../shared/services/google-analytics.service';

import { Message } from '../../shared/utils/message';

import { DesaparecidoModel } from '../../models/desaparecido.model';
import { mensagens } from '../../constants/mensagens.const';

import { Erro } from '../../shared/utils/erro.util';





@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  passoSelecionado = 1;

  usuarioEstaLogado: boolean;
  breadCrumbEnabled: boolean = true;
  submitBussonDisabled: boolean = true;

  oneSelected: boolean;
  twoSelected: boolean;
  threeSelected: boolean;
  fourSelected: boolean;

  formulario: FormGroup;
  attachments: FormArray;
  formData: FormData = new FormData()
  formDataValidacaoAnexos: FormData = new FormData();

  invalidFields: string[];
  modalTitle: string = 'Antes de prosseguir preencha os campos abaixo:';
  mensagemCarregandoCadastro: string;

  isComplete: boolean;
  isLoading: boolean;

  idCadastroSelecionado: any;

  etniaSelectedField: string;
  generoSelectedField: string;
  alturaSelectedField: string = '0';
  pesoSelectedField: string = '0';

  attachmentsSelectedField: any[] = [];

  desaparecidoId: any;
  registroSelecionado: any;

  constructor(private cadastroService: CadastroService,
    private router: Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    private googleService: GoogleAnalyticsService) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      cidade: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      estado: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],

      dataNascimento: [null],
      dataDesaparecimento: [null],

      genero: [null],
      etnia: [null],
      altura: [null],
      peso: [null],
      caracteristicaParticular: [null],
      observacao: [null],
      attachments: this.formBuilder.array([])
    });

    this.cadastroService.initialize(this);
    this.usuarioEstaLogado = this.cadastroService.usuarioEstaLogado;

    if (this.deveEditarCadastro()) {
      this.registroSelecionado = JSON.parse(localStorage.getItem('registroSelecionado'));
      console.log(this.registroSelecionado);

      this.formulario.patchValue({
        nome: this.registroSelecionado.nome,
        cidade: this.registroSelecionado.cidade,
        estado: this.registroSelecionado.estado,

        genero: this.registroSelecionado.genero,
        etnia: this.registroSelecionado.etnia,

        dataNascimento: new Date(this.commonService.getYear(this.registroSelecionado.dataNascimento), this.commonService.getMonth(this.registroSelecionado.dataNascimento), this.commonService.getDay(this.registroSelecionado.dataNascimento)),
        dataDesaparecimento: new Date(this.commonService.getYear(this.registroSelecionado.dataDesaparecimento), this.commonService.getMonth(this.registroSelecionado.dataDesaparecimento), this.commonService.getDay(this.registroSelecionado.dataDesaparecimento)),

        altura: this.registroSelecionado.altura,
        peso: this.registroSelecionado.peso,
        caracteristicaParticular: this.registroSelecionado.caracteristicaParticular,
        observacao: this.registroSelecionado.observacao
      });

      this.etniaSelectedField = this.registroSelecionado.etnia;
      this.generoSelectedField = this.registroSelecionado.genero;
      this.alturaSelectedField = this.registroSelecionado.altura;
      this.pesoSelectedField = this.registroSelecionado.peso;

      this.desaparecidoId = this.registroSelecionado.id;

      const attachments = this.formulario.get('attachments') as FormArray;

      if (this.registroSelecionado.anexos) {
        this.registroSelecionado.anexos.forEach(anexo => {
          const obj = {
            id: anexo.id,
            name: anexo.nome,
            file: anexo.arquivo,
            type: anexo.tipo
          }

          attachments.push(this.formBuilder.group(obj));
          this.attachmentsSelectedField.push(obj);
        });
      }
    }

    this.googleService.logPageView();
  }

  deveEditarCadastro() {
    let posicaoDaUltimaBarra = document.URL.lastIndexOf('/');
    this.idCadastroSelecionado = document.URL.substring(++posicaoDaUltimaBarra);

    return (this.idCadastroSelecionado && this.idCadastroSelecionado != 'cadastro');
  }

  quandoUsuarioSelecionarIconeDeInformacao() {
    this.commonService.openDialog(null, 'Preencha o formulário com os dados da pessoa desaparecida para que ela seja incluída no catálogo. .', null, null);
  }

  quandoUsuarioSelecionarUmPassoNaBreadcrumb(passoSelecionado) {
    if (passoSelecionado != '1') {
      if (!this.validarPreenchimentoFormulario(this.formulario)) {
        this.breadCrumbEnabled = false;
        this.submitBussonDisabled = true;
        this.commonService.validations = this.invalidFields;
        this.commonService.openDialog(null, null, null, 'warning');
        localStorage.setItem('formIsOkay', 'false');
        return;
      }

      if (!this.validarPreenchimentoDatas(this.formulario)) {
        this.breadCrumbEnabled = false;
        this.submitBussonDisabled = true;
        this.commonService.openDialog(null, 'A data de nascimento não pode ser maior do que a data do desaparecimento', null, 'warning');
        localStorage.setItem('formIsOkay', 'false');
        return;
      }

      if (this.dataDesaparecimentoMaiorQueDataAtual(this.formulario)) {
        this.breadCrumbEnabled = false;
        this.submitBussonDisabled = true;
        this.commonService.openDialog(null, 'A data de desaparecimento não pode ser maior do que a data de hoje', null, 'warning');
        localStorage.setItem('formIsOkay', 'false');
        return;
      }

      localStorage.setItem('formIsOkay', 'true');

      if (passoSelecionado == '3') {
        this.submitBussonDisabled = false;
      }
    }

    this.passoSelecionado = passoSelecionado;
  }

  quandoUsuarioClicarEmAvancar(event) {
    const preenchimentoDatasValido = this.validarPreenchimentoDatas(this.formulario);
    const preenchimentoIdentificacaoValido = this.validarPreenchimentoFormulario(this.formulario);
    const dataDesaparecimentoMaiorQueDataAtual = this.dataDesaparecimentoMaiorQueDataAtual(this.formulario);

    if (!preenchimentoIdentificacaoValido) {
      this.commonService.validations = this.invalidFields;
      this.commonService.openDialog(null, null, null, 'warning');
      return;
    }
    if (!preenchimentoDatasValido) {
      this.commonService.openDialog(null, 'A data de nascimento não pode ser maior do que a data do desaparecimento', null, 'warning');
      return;
    }

    if (dataDesaparecimentoMaiorQueDataAtual) {
      this.commonService.openDialog(null, 'A data de desaparecimento não pode ser maior do que a data de hoje', null, 'warning');
      return;
    }

    localStorage.setItem('formIsOkay', 'true');
    this.passoSelecionado = event.passoSelecionado;
  }

  validarCamposAntesDoCadastro() {
    const preenchimentoDatasValido = this.validarPreenchimentoDatas(this.formulario);
    const preenchimentoIdentificacaoValido = this.validarPreenchimentoFormulario(this.formulario);
    const dataDesaparecimentoMaiorQueDataAtual = this.dataDesaparecimentoMaiorQueDataAtual(this.formulario);

    if (!preenchimentoIdentificacaoValido) {
      this.commonService.validations = this.invalidFields;
      this.commonService.openDialog(null, null, null, 'warning');
      return;
    }
    if (!preenchimentoDatasValido) {
      this.commonService.openDialog(null, 'A data de nascimento não pode ser maior do que a data do desaparecimento', null, 'warning');
      return;
    }
    if (dataDesaparecimentoMaiorQueDataAtual) {
      this.commonService.openDialog(null, 'A data de desaparecimento não pode ser maior do que a data de hoje', null, 'warning');
      return;
    }
  }

  quandoUsuarioClicarEmCadastrar(evento: any) {
    this.validarCamposAntesDoCadastro();
    this.mensagemCarregandoCadastro = 'Por favor, aguarde alguns instantes.';
    this.cadastrarOuAtualizar(evento);
  }

  getQuantidadeAnexosSelecionados() {
    const quantidadeAnexosSelecionados = document.querySelectorAll('.imagem-anexo').length;
    return quantidadeAnexosSelecionados;
  }

  async cadastrarOuAtualizar(evento) {

    if (this.getQuantidadeAnexosSelecionados() == 0) {
      this.commonService.openDialog(null, 'Pelo menos uma imagem da pessoa desaparecida deve ser anexada no cadastro.', null, 'warning', 'Entendi');
    }
    else {
      this.isLoading = true;

      const cadastro = await this.cadastroService.cadastrarDesaparecido(this.montarModeloDeDados());

      const {
        id,
        nome,
        cidade,
        estado,
        dataNascimento,
        dataDesaparecimento,
        genero,
        etnia,
        altura,
        peso,
        caracteristicaParticular,
        observacao } = this.montarModeloDeDados();

      if (cadastro.success) {

        let nome_evento = '';

        if (this.deveEditarCadastro()) {
            this.desaparecidoId = this.registroSelecionado.id;
            nome_evento = 'atualizacao_desaparecido';
        }
        else {
            this.desaparecidoId = cadastro.data.id
            nome_evento = 'cadastro_desaparecido';
        }

        this.googleService.logEvent(nome_evento, {
          desaparecidoId: this.desaparecidoId,
          nome_desaparecido: nome,
          cidade_desaparecido: cidade,
          estado_desaparecido: estado,
          data_nascimento_desaparecido: new Date(dataNascimento).toLocaleDateString('pt-BR'),
          data_desaparecimento_desaparecido: new Date(dataDesaparecimento).toLocaleDateString('pt-BR'),
          genero_desaparecido: genero,
          etnia_desaparecido: etnia,
          peso_desaparecido: peso,
          altura_desaparecido: altura,
          caracteristica_particular_desaparecido: caracteristicaParticular,
          observacao_desaparecido: observacao,
          usuario: localStorage.getItem('user'),
          data_operacao: new Date().toLocaleDateString('pt-BR')
        });

        try {
          await this.orquestrarExclusaoDosAnexos(evento.anexosRemovidos);

          const upload = await this.orquestrarUploadDosAnexos();

          if (upload.success) {
            this.quandoCadastroForBemSucedido(cadastro);
          }
        }
        catch(err) {
          this.quandoCadastroDispararErro(err);
        }
      }
    }
  }

  async orquestrarExclusaoDosAnexos(anexosSelecionadosParaExclusao) {
    if (this.formulario.get('attachments').value == 1) {
      this.commonService.openDialog(null, 'é preciso que o cadastro tenha pelo menos um anexo selecionado', null, 'warning', 'Ok');
      return;
    }

    if (anexosSelecionadosParaExclusao.length > 0) {
      await this.cadastroService.removerAnexos(anexosSelecionadosParaExclusao);
    }
  }

  async orquestrarUploadDosAnexos() {

    this.mensagemCarregandoCadastro = 'Fazendo upload das imagens...';

    const anexos = this.formulario.get('attachments') as FormArray;

    anexos.getRawValue().forEach(anexo => {
      if (!anexo.id && anexo.file) {
        this.formData.append('anexos[]', anexo.file, anexo.file.name);
      }
    });


    this.formData.append('desaparecidoId', this.desaparecidoId);

    return await this.cadastroService.fazerUploadFotos(this.formData);
  }

  montarModeloDeDados() {
    const model = new DesaparecidoModel();

    // model.enderecos = [];
    model.fotos = [];

    model.nome = this.formulario.get('nome').value;
    model.cidade = this.formulario.get('cidade').value;
    model.estado = this.formulario.get('estado').value;
    // model.enderecos.push({ cidade: this.formulario.get('cidade').value, estado: this.formulario.get('estado').value.toString().toUpperCase() });
    model.dataNascimento =  !this.formulario.get('dataNascimento').value ? null : this.formulario.get('dataNascimento').value;
    model.dataDesaparecimento = !this.formulario.get('dataDesaparecimento').value ? null : this.formulario.get('dataDesaparecimento').value;
    model.genero = this.formulario.get('genero').value;
    model.etnia = this.formulario.get('etnia').value;
    model.altura = this.formulario.get('altura').value;
    model.peso = this.formulario.get('peso').value

    model.fotos = this.formulario.get('attachments').value;
    model.caracteristicaParticular = this.formulario.get('caracteristicaParticular').value;
    model.observacao = this.formulario.get('observacao').value;

    if (this.deveEditarCadastro()) {
      model.id = this.desaparecidoId;
      model.deveEditar = true;
    }

    return model;
  }

  quandoCadastroForBemSucedido(message: Message) {
    this.isComplete = true;
    this.isLoading = false;

    this.formulario.reset();

    localStorage.setItem('temAnuncioCadastrado', 'true');

    this.oneSelected = false;
    this.twoSelected = false;
    this.threeSelected = false;
    this.fourSelected = false;

    this.commonService.openDialog(null, mensagens.legenda.anuncio_cadastrado_sucesso, '/', 'success')
  }

  quandoCadastroDispararErro(error: any) {
    this.isComplete = false;
    this.isLoading = false;
    this.commonService.onErrorResponse(error, this.loginService);
  }

  validarPreenchimentoFormulario(formulario: FormGroup) {
    this.invalidFields = [];

    for (const field in formulario.controls) {
      let status = formulario.controls[field].status;

      if (field.search("nome") > -1 && status.toLowerCase().search('invalid') > -1) {
        this.invalidFields.push('Informe o nome da pessoa');
      }

      if (field.search("cidade") > - 1 && status.toLowerCase().search('invalid') > -1) {
        this.invalidFields.push('Informe a cidade onde ela mora');
      }

      if (field.search("estado") > - 1 && status.toLowerCase().search('invalid') > -1) {
        this.invalidFields.push('Informe o estado onde ela mora');
      }
    }

    if (this.invalidFields.length > 0) {

      return false;
    }

    return true;
  }

  validarPreenchimentoDatas(formulario: FormGroup) {
    let dataNascimento = formulario.controls["dataNascimento"].value;
    let dataDesaparecimento = formulario.controls["dataDesaparecimento"].value;

    if (dataNascimento)
    {
      if (dataNascimento.toString().toLowerCase().includes('invalid')) {
        formulario.controls["dataNascimento"].setValue('');
        dataNascimento = formulario.controls["dataNascimento"].value;
      }
    }

    if (dataDesaparecimento)
    {
      if (dataDesaparecimento.toString().toLowerCase().includes('invalid')){
        formulario.controls["dataDesaparecimento"].setValue('');
        dataDesaparecimento = formulario.controls["dataDesaparecimento"].value;
      }
    }

    if (dataDesaparecimento && dataNascimento) {
      return (dataDesaparecimento >= dataNascimento);
    }

    return true;
  }

  dataDesaparecimentoMaiorQueDataAtual(formulario: FormGroup) {
    const dataDesaparecimento = formulario.controls["dataDesaparecimento"].value;

    if (dataDesaparecimento > new Date()) {
      return true;
    }

    return false;

  }
}
