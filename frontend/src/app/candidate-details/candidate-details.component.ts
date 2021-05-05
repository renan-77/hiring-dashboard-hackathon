import { Component, OnInit } from '@angular/core';
import {CandidateService} from '../data_services/candidate.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.css']
})
export class CandidateDetailsComponent implements OnInit {
  id;
  user;

  constructor(private route: ActivatedRoute, private candidateService: CandidateService) { }

  ngOnInit(): void {
    // Getting ID from URL
    this.id = this.route.snapshot.paramMap.get('id');

    // Fetching user using ID
    this.candidateService.getSingleCandidate({id: this.id}).subscribe(response => {
      this.user = response;
    });

    console.log(this.user);
  }

}
