import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MnemonicsService {
  public getMnemonics() {
    return this.fetchFromOFR();
  }

  private fetchFromOFR() {
    return this.http
      .get('https://data.financialresearch.gov/v1/metadata/mnemonics')
      .pipe(
        map((value: any) =>
          value.map((value: string) => value.substring(0, value.indexOf('-')))
        ),
        map((value: string) => [...new Set(value)])
      );
  }

  constructor(private http: HttpClient) {}
}
