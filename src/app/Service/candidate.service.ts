import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CandidateDetails } from 'src/app/Models/CandidateDetails';
import { map } from 'rxjs/operators';
import { Candidates } from '../Models/Candidates';
import {AccordionModule} from 'primeng/accordion';
import {MenuItem} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  private url = 'http://localhost:5000/api/Recruitment';
  private addUrl = 'http://localhost:5000/api/Recruitment/AddCandidate';
  private deleteUrl = 'http://localhost:5000/api/Recruitment/DeleteCandidate?id=';
  private updateUrl = 'http://localhost:5000/api/Recruitment/UpdateCandidate';
  private viewUrl = 'http://localhost:5000/api/Recruitment/List/';
  private getoneUrl = 'http://localhost:5000/api/Recruitment/CandidateDetail?id=';

  constructor(private _http: HttpClient) { }

  getCandidateDetails(): Observable<CandidateDetails[]> {
    return this._http.get(this.viewUrl).pipe(map((response) => <CandidateDetails[]>response));
  }

  getCandidateDetailsById(id: number): Observable<any> {
    return this._http.get(this.getoneUrl + id)
        .pipe(map(response => <any>response));
  }


  addCandidateDetails(saveCandidate): Observable<CandidateDetails> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
    const body = JSON.stringify(saveCandidate);
    return this._http.post(this.addUrl, body, options)
      .pipe(map((response) => <any>response));
  }

  updateCandidateDetails(updateCandidate): Observable<CandidateDetails> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    let options = { headers: headers };
    const body = JSON.stringify(updateCandidate);
    return this._http.put(this.updateUrl, body, options)
      .pipe(map((response) => <any>response));
  }

  deleteCandidate(id: number): Observable<any> {
    return this._http.delete(this.deleteUrl + id)
      .pipe(map((response) => <any>response));
  }

}
