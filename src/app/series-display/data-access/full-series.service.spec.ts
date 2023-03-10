import { TestBed } from '@angular/core/testing';

import { FullSeriesService } from './full-series.service';

describe('FullSeriesService', () => {
  let service: FullSeriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FullSeriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
