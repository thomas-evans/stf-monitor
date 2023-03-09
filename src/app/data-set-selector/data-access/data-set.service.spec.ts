import { TestBed } from '@angular/core/testing';

import { DataSetService } from './data-set.service';

describe('DataSetService', () => {
  let service: DataSetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataSetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
