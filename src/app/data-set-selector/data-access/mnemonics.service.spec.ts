import { TestBed } from '@angular/core/testing';

import { MnemonicsService } from './mnemonics.service';

describe('MnemonicsService', () => {
  let service: MnemonicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MnemonicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
