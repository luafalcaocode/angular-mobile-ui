import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home-estatisticas',
  templateUrl: './home-estatisticas.component.html',
  styleUrls: ['./home-estatisticas.component.scss']
})
export class HomeEstatisticasComponent implements OnInit {
  @Input() estatisticas: any[];
  @Input() estatistica: any;
  @Input() isLoading: boolean;

  constructor(private router: Router) {

   }

  ngOnInit(): void {

  }

  quandoUsuarioClicarEmVerEstatistica(event) {
    this.router.navigate([event]);
  }

}
