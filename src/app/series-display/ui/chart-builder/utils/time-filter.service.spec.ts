import { TestBed } from '@angular/core/testing';

import { TimeFilterService } from './time-filter.service';

describe('TimeFilterService', () => {
  let service: TimeFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
