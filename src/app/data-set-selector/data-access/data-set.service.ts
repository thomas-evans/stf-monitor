import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, ReplaySubject, Subject} from "rxjs";
import {MnemonicDataset} from "./interfaces/mnemonic-dataset";

@Injectable({
  providedIn: 'root'
})
export class DataSetService {
  public getDataSets(mnemonic: Subject<string>) {
    let subject: ReplaySubject<[MnemonicDataset]> = new ReplaySubject();
    mnemonic.subscribe(value => {
      this.fetchFromOFR(value).subscribe(v => {
        subject.next(v);
      });
    });
    return subject;
  }

  private fetchFromOFR(mnemonic: string): Observable<[MnemonicDataset]> {
    return this.http.get(`https://data.financialresearch.gov/v1/metadata/mnemonics?dataset=${mnemonic}`).pipe(
      map((value: any, _index: number) => value.map((value: any) => value))
    )
  }

  constructor(private http: HttpClient) {
  }
}
