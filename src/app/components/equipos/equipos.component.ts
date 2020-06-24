import { Component, OnInit } from '@angular/core';
import {EquiposService} from '../../services/equipos.service'
import {Equipo} from '../../models/equipo'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {
  Titulo = "Equipos";
  Items: Equipo[] = [];
  EstadoForm: string;
  FormReg: FormGroup;


  constructor(private equiposService: EquiposService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.EstadoForm = 'L';
    this.getEquipo();
        this.FormReg = this.formBuilder.group({
         EquipoNombre: ['',[Validators.required]],
         EquipoRanking: ['',[Validators.required]],
    }
     
    );

  }

  getEquipo(){
     this.equiposService.get()
    .subscribe((res:Equipo[])=>{
      this.Items = res;

  });
  }
  Alta(){
    this.EstadoForm = 'A';
  }
}