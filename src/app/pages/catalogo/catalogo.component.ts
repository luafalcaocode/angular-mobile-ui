import { Component, OnInit } from '@angular/core';

import { GoogleAnalyticsService } from '../../shared/services/google-analytics.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  constructor(private googleService: GoogleAnalyticsService) { }

  ngOnInit(): void {
  }
}
