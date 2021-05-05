import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../data_services/candidate.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    credentialsForm: FormGroup;

    constructor(private candidateService: CandidateService, private router: Router, private route: ActivatedRoute,
                private snackBar: MatSnackBar) { }

    ngOnInit(): void {
        localStorage.removeItem('login');

        this.loadForm();
    }

    loadForm(): void {
        // Loading credentials form.
        this.credentialsForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required)
        });
    }

    /**
     * Checking login of the user on submit of the form
     * @param user: object - A JSON from form.
     */
    onLoginSubmit(user): void {
        this.candidateService.checkUser(user).subscribe( response => {
            // Checking if login is successful.
            if (response === true) {
                // Setting received token to local storage.
                localStorage.setItem('login', 'true');
                this.router.navigate(['/dashboard']);
            } else {
                this.snackBar.open('User/password is wrong.', 'Close', {
                    duration: 2000,
                });
            }
        });
    }
}
