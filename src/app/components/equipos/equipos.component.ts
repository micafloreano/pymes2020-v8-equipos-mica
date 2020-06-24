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
    this.submitted = false;
  }
  Grabar() {
    this.submitted = true;
    // verificar que los validadores esten OK
     if (this.FormReg.invalid) {
      return;
  }
  
    //hacemos una copia de los datos del formulario, para modificar la fecha y luego enviarlo al servidor
    const itemCopy = { ...this.FormReg.value };

    //convertir fecha de string dd/MM/yyyy a ISO para que la entienda webapi
    var arrFecha = itemCopy.FechaAlta.substr(0, 10).split("/");
    if (arrFecha.length == 3)
      itemCopy.FechaAlta = 
          new Date(
            arrFecha[2],
            arrFecha[1] - 1,
            arrFecha[0]
          ).toISOString();

    // agregar post
    if (itemCopy.IdArticulo == 0 || itemCopy.IdArticulo == null) {
      this.equiposService.post(itemCopy).subscribe((res: any) => {
        this.Volver();
        this.modalDialogService.Alert('Registro agregado correctamente.');
        this.Buscar();
      });
    } else {
      // modificar put
      this.articulosService
        .put(itemCopy.IdArticulo, itemCopy)
        .subscribe((res: any) => {
          this.Volver();
          this.modalDialogService.Alert('Registro modificado correctamente.');
          this.Buscar();
        });
    }
  }

}