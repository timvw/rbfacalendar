import { TestBed } from '@angular/core/testing';

import { RbfaService } from './rbfa.service';

describe('RbfaService', () => {
  let service: RbfaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RbfaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
