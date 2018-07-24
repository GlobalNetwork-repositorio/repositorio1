import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    estadoCredenciales: boolean = true;
    verificando: boolean = false;
    constructor(public router: Router, private loginService: LoginService, private formBuilder: FormBuilder) { }
    

    ngOnInit() {
        window.localStorage.clear(); 
        this.prepararFormulario();
    }

    prepararFormulario() {
        this.form = this.formBuilder.group({      
            username:['', Validators.required],
            password:['', Validators.required]
          });
    }

    enviar() {
        console.log('data', this.form.value);
        this.loginService.setLogin(this.form.value).subscribe(res => console.log(res));
    }

    onLoggedin() {
        if ( this.verificando ) { return; }
        this.estadoCredenciales = true;
        this.verificando = true;
        this.loginService.setLogin(this.form.value).subscribe((res: any) => {            
            let datos: any = JSON.stringify(res)
            let estado = true;
            datos = JSON.parse(datos);
            console.log(datos);
            
            if ( datos.sucess ) {
                localStorage.setItem("currentUser", JSON.stringify(datos.usuario));
                localStorage.setItem("token", datos.token);
                this.router.navigate(['./inicio']);
            } else {
                estado = false;
                localStorage.clear();
            }
            
            setTimeout(() => {
                this.estadoCredenciales = estado;
                this.verificando = false;
            }, 800);
        });
        // localStorage.setItem('isLoggedin', 'true');
    }
}
