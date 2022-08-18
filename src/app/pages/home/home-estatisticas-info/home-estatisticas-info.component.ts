import { Component, OnInit, Input, HostListener } from '@angular/core';
import { RelatoriosService } from 'src/app/services/relatorios.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'home-estatisticas-info',
  templateUrl: './home-estatisticas-info.component.html',
  styleUrls: ['./home-estatisticas-info.component.scss']
})
export class HomeEstatisticasInfoComponent implements OnInit {

  estatisticasDesaparecidos = [
    // { name: 'RJ', value: 2350 },
    // { name: 'SP', value: 1000 },
    // { name: 'BA', value: 1500 },
    // { name: 'SC', value: 2500 },
    // { name: 'MT', value: 855 },
  ];

  width: any;
  height: any;

  isLoading: boolean;
  xAxisLabel: string;
  yAxisLabel: string;

  screenHeight: number;
  screenWidth: number;


  constructor(private relatorios: RelatoriosService, private commonService: CommonService) { }

  ngOnInit(): void {
    this.carregarDadosRelatorio();
  }

   @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.isLoading = true;
    window.location.reload();
  }

  ngDoCheck() {
    this.width = window.innerWidth - 100;
    this.height = window.innerHeight - 100;
  }

  async carregarDadosRelatorio() {

    this.isLoading = true;

    const filtro_estatistica = localStorage.getItem('filtro_estatistica');

    try {
      if (filtro_estatistica) {
        const dados = await this.relatorios.gerarRelatorio(filtro_estatistica);
        dados.forEach(item => {
          if (item.name) {
            let data;

            if (filtro_estatistica.includes('nascimento') || filtro_estatistica.includes('desaparecimento')) {
              let temp = item.name;

              temp = temp.split('-');

              let dia = temp[2].substring(0, 2)
              let mes = temp[1];
              let ano = temp[0];

              // data = new Date(ano, mes, dia).toLocaleDateString('pt-BR');

              item.name = ano;
            }

            this.estatisticasDesaparecidos.push(item);
          }
        });
        this.xAxisLabel = filtro_estatistica.toUpperCase();
        this.yAxisLabel = 'TOTAL';
        this.isLoading = false;
      }
    }
    catch(err) {
      this.isLoading = false;
      this.commonService.onErrorResponse(err);
    }
  }


}
