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
    searchDb(email, password): string {
        for (const user of staff) {
            if (user.email === email) {
                if (user.password === password) {
                    return 'success';
                } else {
                    return 'wrong_pass';
                }
            }
        }
        return 'wrong_user';
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

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // GET USERS.
        if (request.method === 'GET' && request.url === 'http://localhost:5000/candidates') {
            return of(new HttpResponse({status: 200, body: candidates}));

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

            if (loginCheck === 'success') {
                localStorage.setItem('login', String(true));
            }

            // Returning response based on search.
            return of(new HttpResponse({body: {response: loginCheck}}));

        // Returns the number of approved, denied and pending status on database.
        } else if (request.method === 'GET' && request.url === 'http://localhost:5000/cadidate_status') {
            return of(new HttpResponse({body: {status: this.countStatus()}}));
        }


        next.handle(request);
    }
}
