import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  constructor(private apiService: ApiService) { }

  async gerarRelatorio(filtro){
    let message;

    switch(filtro) {
      case 'cidade':
        message = await this.apiService.get(environment.endpoints.relatorios.desaparecidos.cidade).toPromise();
      break;

      case 'estado':
        message = await this.apiService.get(environment.endpoints.relatorios.desaparecidos.estado).toPromise();
      break;

      case 'nascimento':
        message = await this.apiService.get(environment.endpoints.relatorios.desaparecidos.nascimento).toPromise();
      break;

      case 'desaparecimento':
        message = await this.apiService.get(environment.endpoints.relatorios.desaparecidos.desaparecimento).toPromise();
      break;

      case 'gênero':
        message = await this.apiService.get(environment.endpoints.relatorios.desaparecidos.genero).toPromise();
      break;

      case 'etnia':
        message = await this.apiService.get(environment.endpoints.relatorios.desaparecidos.etnia).toPromise();
      break;
    }

    return message.data;
  }
}
