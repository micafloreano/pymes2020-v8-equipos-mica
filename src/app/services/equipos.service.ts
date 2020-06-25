import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
import { of } from "rxjs";
import { Equipo } from "../models/equipo";
@Injectable({
  providedIn: 'root'
})

export class EquiposService {
  resourceUrl: string;

  constructor(private httpCliente: HttpClient) {
    this.resourceUrl = "https://pavii.ddns.net/api/equipos"
   }

   get(){
     return this.httpCliente.get(this.resourceUrl)
   }

  post(obj:Equipo) {
    return this.httpCliente.post(this.resourceUrl, obj);
  }

  put(Id: number, obj:Equipo) {
    return this.httpCliente.put(this.resourceUrl + Id, obj);
  }

  delete(Id) {
    return this.httpCliente.delete(this.resourceUrl + Id);
  }
}