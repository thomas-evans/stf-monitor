import {Injectable} from '@angular/core';
import {map, Observable, ReplaySubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {FullSeries, seriesData} from "./interfaces/full-series";

@Injectable({
  providedIn: 'root'
})
export class FullSeriesService {
  public getFullSeries(series$: Subject<string>) {
    let subject: ReplaySubject<seriesData> = new ReplaySubject();
    series$.subscribe(value => {
      if (!value) return;
      this.getFromOFR(value).subscribe(v => {
        subject.next(v);
      });
    });
    return subject
  }

  private getFromOFR(series: string): Observable<seriesData> {
    return this.http.get<FullSeries>(`https://data.financialresearch.gov/v1/series/full?mnemonic=${series}`).pipe(
      map((value) => Object.values(value)[0])
    )
  }

  constructor(private http: HttpClient) {
  }
}
