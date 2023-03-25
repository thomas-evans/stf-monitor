import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, shareReplay } from 'rxjs';
import { MnemonicDataset } from './interfaces/mnemonic-dataset';

@Injectable({
  providedIn: 'root',
})
export class MnemonicsService {
  public getMnemonics() {
    return this.fetchFromOFR().pipe(shareReplay());
  }

  private fetchFromOFR(): Observable<MnemonicDataset['mnemonic'][]> {
    return this.http
      .get<MnemonicDataset['mnemonic'][]>(
        'https://data.financialresearch.gov/v1/metadata/mnemonics'
      )
      .pipe(
        map((mneData: MnemonicDataset['mnemonic'][]) =>
          mneData.map((mne: MnemonicDataset['mnemonic']) =>
            mne.substring(0, mne.indexOf('-'))
          )
        ),
        map((v: MnemonicDataset['mnemonic'][]) => [...new Set(v)])
      );
  }

  constructor(private http: HttpClient) {}
}
