import { Component, OnInit } from '@angular/core';
import {CandidateService} from '../data_services/candidate.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.css']
})
export class CandidateDetailsComponent implements OnInit {
  currentUser;

  constructor(private route: ActivatedRoute, private candidateService: CandidateService) { }

  ngOnInit(): void {
    // this.candidateService.getSingleCandidate(this.route.snapshot.paramMap.get('id')).subscribe(response => {
    //   console.log(response);
    // })
  }

}
