import {TestBed} from '@angular/core/testing';

import {DataSetService} from './data-set.service';
import {HttpClient} from "@angular/common/http";
import {ReplaySubject, Subject} from "rxjs";
import {MnemonicDataset} from "./interfaces/mnemonic-dataset";
import {asyncData} from "../../test-helpers/async-observable-helpers";

describe('DataSetService', () => {
  let service: DataSetService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        DataSetService,
        {provide: HttpClient, useValue: spy}
      ]
    });
    service = TestBed.inject(DataSetService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getDataSets', () => {
    let mockSubjectString: Subject<string>;
    beforeEach(() => {
      mockSubjectString = new Subject();
    });
    it('should return a ReplaySubject', () => {
      expect(service.getDataSets(mockSubjectString)).toEqual(jasmine.any(ReplaySubject<[MnemonicDataset]>));
    });
    it('should emit the results from the http call', (done) => {
      let dataset: [MnemonicDataset] = [{mnemonic: 'sets', series_name: 'super!'}];
      httpClientSpy.get.and.returnValue(asyncData(dataset));
      service.getDataSets(mockSubjectString).subscribe({
        next: data => {
          expect(data).withContext('test').toEqual([{mnemonic: 'sets', series_name: 'super!'}]);
          done();
        },
        error: err => {
          console.log(err);
          done.fail('this should not succeed');
        }
      });
      mockSubjectString.next('test');
    });
  });
});
