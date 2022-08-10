import { TestBed } from '@angular/core/testing';

import { AgenAlumService } from './agen-alum.service';

describe('AgenAlumService', () => {
  let service: AgenAlumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgenAlumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
