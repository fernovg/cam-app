import { TestBed } from '@angular/core/testing';

import { AgenDocenService } from './agen-docen.service';

describe('AgenDocenService', () => {
  let service: AgenDocenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgenDocenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
