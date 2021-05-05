import { Component, OnInit } from '@angular/core';
import {CandidateService} from '../data_services/candidate.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

    candidates;
    totalNumberOfCandidates;

    constructor(private candidateService: CandidateService) {
    }

    ngOnInit() {
        this.candidateService.getCandidates().subscribe(response => {
            this.candidates = response;
        });
        console.log(this.candidates);
        this.totalNumberOfCandidates = this.candidates.length;
    }
}
