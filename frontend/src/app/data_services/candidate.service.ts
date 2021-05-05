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
  private readonly singleCandidateUrl: string = 'http://localhost:5000/candidate';
  private readonly candidateVideoUrl: string = 'http://localhost:5000/candidate_video';
  private readonly candidateCvUrl: string = 'http://localhost:5000/candidate_cv';

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

  public getSingleCandidate(id): Observable<any> {
    return this.http.post(this.singleCandidateUrl, id);
  }

  // Adds new candidate to database.
  public addCandidates(candidate): Observable<any> {
    return this.http.post(this.candidatesUrl, candidate);
  }

  public getApplicationStatus(): Observable<any> {
    return this.http.get(this.candidateStatusUrl);
  }

  public getVideoStatus(): Observable<any> {
    return this.http.get(this.candidateVideoUrl);
  }

  public getCvStatus(): Observable<any> {
    return this.http.get(this.candidateCvUrl);
  }
}
