import { Injectable } from '@angular/core';
import { Usuario } from './usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private usuarioModel: Usuario = new Usuario;
  private userLocal: any;
  private userToken: string;

  constructor() {    
    this.userLocal = JSON.parse(localStorage.getItem('currentUser'));
    this.userToken = localStorage.getItem('token') || null;
    this.ini();
  }

  ini() {    
    this.usuarioModel = this.userLocal;    
  }

  getUsuario() : Usuario {
    return this.usuarioModel
  }

  getToken(): string {
    return this.userToken;
  }

  getCurrentUser(): boolean {
    return this.usuarioModel ? true : false;
  }
}
