import { Component, OnInit } from '@angular/core';
import {EquiposService} from '../../services/equipos.service'
import {Equipo} from '../../models/equipo'

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {
  Titulo = "Equipos";
  Items: Equipo[] = [];

  constructor(private equiposService: EquiposService) { }

  ngOnInit() {
    this.getEquipo();
  }

  getEquipo(){
     this.equiposService.get()
    .subscribe((res:Equipo[])=>{
      this.Items = res;

  });
  }

}