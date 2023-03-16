import { TestBed } from '@angular/core/testing';

import { ChartBuilderService } from './chart-builder.service';

describe('ChartBuilderService', () => {
  let service: ChartBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
