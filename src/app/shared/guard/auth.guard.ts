import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { UsuariosService } from '../../diseno/usuarios/usuarios.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private usuarioService: UsuariosService) { }

    canActivate() {
        
        if (this.usuarioService.getCurrentUser()) {            
            return true;            
        }

        this.router.navigate(['/login']);        
        return false;
    }
}
