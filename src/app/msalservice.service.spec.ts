import { TestBed } from '@angular/core/testing';

import { MsalserviceService } from './msalservice.service';

describe('MsalserviceService', () => {
  let service: MsalserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsalserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
