import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../service/login.service';

export const modGuard: CanActivateFn = (route, state) => {
  const servicio = inject(LoginService);
  const router = inject(Router);
  let respuesta: boolean = false;

  if (servicio.getRole() == 'ROLE_MOD') {
    respuesta = true;
  } else {
    router.navigate(['login']);
  }

  return respuesta;
};
