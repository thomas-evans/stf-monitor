import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, EMPTY, map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MnemonicsService {
  public getMnemonics(){
    return this.fetchFromOFR();
  }
  private fetchFromOFR(){
    return this.http.get('https://data.financialresearch.gov/v1/metadata/mnemonics').pipe(
      catchError(() => EMPTY),
      map((value: any, _index: number) => value.map((value: string, _index:number) => value.substring(0, value.indexOf('-')))),
      map((value: string, _index: number) => [...new Set(value)])
    );
  }
  constructor(private http: HttpClient) { }
}
