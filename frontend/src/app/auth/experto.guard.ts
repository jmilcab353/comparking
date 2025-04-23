import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../service/login.service';

export const expertoGuard: CanActivateFn = (route, state) => {

  const servicio = inject(LoginService);
  const router = inject(Router);

  // Por defecto la respuesta es falsa, no puedes entrar
  let respuesta: boolean = false;

  if (servicio.getRole() == 'ROLE_EXPERTO') {
    respuesta = true;
  } else {
    router.navigate(['login']);
  }

  return respuesta;

};
