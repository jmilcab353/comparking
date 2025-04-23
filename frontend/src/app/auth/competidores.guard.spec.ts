import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { competidoresGuard } from './competidores.guard';

describe('competidoresGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => competidoresGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
