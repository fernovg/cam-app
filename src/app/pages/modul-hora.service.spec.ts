import { TestBed } from '@angular/core/testing';

import { ModulHoraService } from './modul-hora.service';

describe('ModulHoraService', () => {
  let service: ModulHoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModulHoraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
