import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, EMPTY, map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataSetService {
  public getDataSets(mnemonic: string){
    return this.fetchFromOFR(mnemonic);
  }
  private fetchFromOFR(mnemonic: string){
    return this.http.get(`https://data.financialresearch.gov/v1/metadata/mnemonics?dataset=${mnemonic}`).pipe(
      catchError(() => EMPTY),
      map((value: any, _index:number) => console.log(value))
    )
  }
  constructor(private http: HttpClient) { }
}
