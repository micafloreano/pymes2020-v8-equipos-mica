import { Component, OnInit } from '@angular/core';
import {EquiposService} from '../../services/equipos.service'
import {Equipo} from '../../models/equipo'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDialogService } from "../../services/modal-dialog.service";

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
  submitted = false;


  constructor(private equiposService: EquiposService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.EstadoForm = 'L';
    this.submitted = false;
    this.getEquipo();
        this.FormReg = this.formBuilder.group({
         IdEquipo:[0],
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
    window.scroll(0, 0);
    this.EstadoForm = 'A';
    this.submitted = false;
  }
  Grabar() {
    this.submitted = true;
    // verificar que los validadores esten OK
     if (this.FormReg.invalid)
     {
      return;
      }
  
  
  
    //hacemos una copia de los datos del formulario, para modificar la fecha y luego enviarlo al servidor
    const itemCopy = { ...this.FormReg.value };

    // agregar post
    itemCopy.IdEquipo = 0;
    this.equiposService.post(itemCopy).subscribe((res: any) => {
        this.getEquipo();
        this.Volver();
        
      //t.Alert('Registro agregado correctamente.');
     });
    }
  

  Volver() {
    this.EstadoForm = "L";
  };
}