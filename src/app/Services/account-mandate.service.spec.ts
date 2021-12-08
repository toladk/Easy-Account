import { TestBed } from '@angular/core/testing';

import { AccountMandateService } from './account-mandate.service';

describe('AccountMandateService', () => {
  let service: AccountMandateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountMandateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
