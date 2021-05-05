import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import {Observable, of} from 'rxjs';

// Importing database elements
import {staff} from './staff';
import {candidates} from './candidates';

@Injectable()
export class BackendInterceptor implements HttpInterceptor {

    constructor(private injector: Injector) {}

    /**
     * Function to go through the array of JSON docs looking for a specific register.
     * @param email: string
     * @param password: string
     */
    searchDb(email, password): boolean {
        for (const user of staff) {
            if (user.email === email) {
                if (user.password === password) {
                    return true;
                } else {
                    return false;
                }
            }
        }
        return false;
    }

    /**
     * Function that returns a candidate object based on ID.
     * @param - id
     * @returns - candidate object.
     */
    findSingleCandidate(id): object {
        for (const candidate of candidates) {
            if (candidate._id === id) {
                return candidate;
            }
        }
    }

    countStatus(): any {
        const status = {'approved': 0, 'denied': 0, 'pending': 0};
        for (const candidate of candidates) {
            switch (candidate['status']) {
                case 'approved':
                    status.approved++
                    break;
                case 'denied':
                    status.denied++
                    break;
                case 'pending':
                    status.pending++
                    break;
            }
        }
        return status;
    }

    countVideoStatus(): any {
        const videoStatus = {'uploaded': 0, 'not_uploaded': 0};
        for (const candidate of candidates) {
            if (candidate.hasInterviewVideo) {
                videoStatus.uploaded++;
            } else {
                videoStatus.not_uploaded++;
            }

        }
        return videoStatus;
    }

    countCvStatus(): any {
        const cvStatus = {'uploaded': 0, 'not_uploaded': 0};
        for (const candidate of candidates) {
            if (candidate.hasUpdatedCv) {
                cvStatus.uploaded++;
            } else {
                cvStatus.not_uploaded++;
            }
        }
        return cvStatus;
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // GET USERS.
        if (request.method === 'GET' && request.url === 'http://localhost:5000/candidates') {
            return of(new HttpResponse({status: 200, body: candidates}));

        // Fetching a single candidate.
        } else if (request.method === 'POST' && request.url === 'http://localhost:5000/candidate') {
            const candidate = this.findSingleCandidate(request.body.id);
            return of(new HttpResponse({body: candidate}));

        // REGISTER USER.
        } else if (request.method === 'POST' && request.url === 'http://localhost:5000/candidates') {
            // Cloning users array to a new array.
            const newUsers = Object.assign([], candidates);
            // Adding new user on array based on object.
            newUsers.push(request.body);
            // Returning the new array.
            return of(new HttpResponse({status: 200, body: newUsers[newUsers.length - 1]}));

        // AUTHENTICATING LOGIN.
        } else if (request.method === 'POST' && request.url === 'http://localhost:5000/login') {
            // Using searchDb function to find if user exists.
            const loginCheck = this.searchDb(request.body.email, request.body.password);

            if (loginCheck === true) {
                localStorage.setItem('login', String(true));
            }

            // Returning response based on search.
            return of(new HttpResponse({body: loginCheck}));

        // Returns the number of approved, denied and pending status on database.
        } else if (request.method === 'GET' && request.url === 'http://localhost:5000/cadidate_status') {
            const status = this.countStatus();
            return of(new HttpResponse({body: status}));

        // Returns the number of uploaded and not uploaded videos
        } else if (request.method === 'GET' && request.url === 'http://localhost:5000/candidate_video') {
            const videoStatus = this.countVideoStatus();
            return of(new HttpResponse({body: videoStatus}));

        // Returns the number of uploaded and not uploaded CV's
        } else if (request.method === 'GET' && request.url === 'http://localhost:5000/candidate_cv') {
            const cvStatus = this.countCvStatus();
            return of(new HttpResponse({body: cvStatus}));
        }


        next.handle(request);
    }
}
