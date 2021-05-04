import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {candidates} from '../backend/candidates';

@Injectable()
export class CandidateService {
  // Declaring API urls.
  private readonly loginUrl: string = 'http://localhost:5000/login';
  private readonly candidatesUrl: string = 'http://localhost:5000/candidates';
  private readonly candidateStatusUrl: string = 'http://localhost:5000/cadidate_status';

  // Declaring instance of HttpClient.
  constructor(private http: HttpClient) {}

  // Checking login variable in local storage.
  public getLogin(): string {
    return localStorage.getItem('login');
  }

  // Checks if user is logged in.
  public isAuthenticated(): boolean {
    return this.getLogin() === 'true';
  }

  // Getting all candidates on database.
  public getCandidates(): Observable<any> {
    return this.http.get(this.candidatesUrl);
  }

  // Adds new candidate to database.
  public addCandidates(candidate): Observable<any> {
    return this.http.post(this.candidatesUrl, candidate);
  }

  public getApplicationStatus(): Observable<any> {
    console.log('service here.')
    return this.http.get(this.candidateStatusUrl);
  }
}
