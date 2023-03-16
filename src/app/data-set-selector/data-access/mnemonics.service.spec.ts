import {TestBed} from '@angular/core/testing';
import {MnemonicsService} from './mnemonics.service';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {asyncData} from "../../../test-helpers/async-observable-helpers";

describe('MnemonicsService', () => {
  let service: MnemonicsService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        MnemonicsService,
        {provide: HttpClient, useValue: spy}
      ]
    });
    service = TestBed.inject(MnemonicsService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('getMnemonics', () => {
    beforeEach(() => {
      let dataset: string[] = [
        "FNYR-EFFR_1Pctl-A",
        "FNYR-EFFR_25Pctl-A",
        "FNYR-EFFR_75Pctl-A",
        "MMF-MMF_RP_OA_OO-M",
        "MMF-MMF_RP_OA_TOT-M",
        "MMF-MMF_RP_OO-M",
        "MMF-MMF_RP_TOT-M",
        "NYPD-PD_AFtR_AG-A",
        "NYPD-PD_AFtR_AG_MBS-A",
        "NYPD-PD_AFtR_AG_eMBS-A",
        "NYPD-PD_AFtR_CORS-A",
        "REPO-DVP_AR_G30-P",
        "REPO-DVP_AR_G30-F",
        "REPO-DVP_AR_LE30-P",
        "TYLD-TCMR-10Yr-A",
        "TYLD-TCMR-6Mo-A",
        "TYLD-TCMR-7Yr-A"
      ];
      httpClientSpy.get.and.returnValue(asyncData(dataset));
    })
    it('should return an Observable with the return type of an array of strings', (done) => {
      expect(service.getMnemonics()).toEqual(jasmine.any(Observable<[string]>));
      done();
    });
    it('should emit the results of the http call and pair the returned array down to unique values', (done) => {
      service.getMnemonics().subscribe(value => {
        expect(value).toEqual(['FNYR', 'MMF', 'NYPD', 'REPO', 'TYLD']);
        done();
      })
    });
  });
});
