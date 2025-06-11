import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {LoginService} from '../services/login.service';

export const userGuard: CanActivateFn = (route, state) => {
  const servicio = inject(LoginService);
  const router = inject(Router);
  let respuesta: boolean = false;

  if (servicio.getRole() == 'ROLE_USER') {
    respuesta = true;
  } else {
    router.navigate(['login']);
  }

  return respuesta;
};
