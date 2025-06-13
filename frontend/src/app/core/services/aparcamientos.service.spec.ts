import { TestBed } from '@angular/core/testing';

import { AparcamientosService } from './aparcamientos.service';

describe('AparcamientosService', () => {
  let service: AparcamientosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AparcamientosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
