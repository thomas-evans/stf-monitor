import {TestBed} from '@angular/core/testing';

import {FullSeriesService} from './full-series.service';
import {HttpClient} from "@angular/common/http";
import {ReplaySubject, Subject} from "rxjs";
import {MnemonicDataset} from "../../data-set-selector/data-access/interfaces/mnemonic-dataset";
import {asyncData} from "../../../test-helpers/async-observable-helpers";
import {FullSeries, seriesData} from "./interfaces/full-series";
import {RecursivePartial} from "../../../test-helpers/recursive-partial";

describe('FullSeriesService', () => {
  let service: FullSeriesService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        FullSeriesService,
        {provide: HttpClient, useValue: spy}
      ]
    });
    service = TestBed.inject(FullSeriesService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('getFullSeries', () => {
    let mockSubjectString: Subject<string>;
    beforeEach(() => {
      mockSubjectString = new Subject();
    });
    it('should return a ReplaySubject', () => {
      expect(service.getFullSeries(mockSubjectString)).toEqual(jasmine.any(ReplaySubject<[MnemonicDataset]>));
    });
    it('should emit the results from the http call', (done) => {
      let dataset: RecursivePartial<FullSeries> = {
        series: {
          "timeseries": {
            aggregation: [['something']]
          },
          "metadata": {
            mnemonic: 'test'
          }
        }
      };
      httpClientSpy.get.and.returnValue(asyncData(dataset));
      service.getFullSeries(mockSubjectString).subscribe({
        next: data => {
          expect(data as RecursivePartial<seriesData>).withContext('test').toEqual({
            "timeseries": {aggregation: [['something']]},
            "metadata": {
              mnemonic: 'test'
            }
          });
          done();
        },
        error: () => {
          done.fail('this should not succeed');
        }
      });
      mockSubjectString.next('test');
    });
  });
});
