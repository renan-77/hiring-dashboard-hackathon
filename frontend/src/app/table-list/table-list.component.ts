import { Component, OnInit } from '@angular/core';
import {candidates} from '../backend/candidates';
import {CandidateService} from '../data_services/candidate.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  candidates;
  totalNumberOfCandidates;
  constructor(private candidateService: CandidateService) { }

  ngOnInit() {
    this.candidateService.getCandidates().subscribe(response => {
      this.candidates = response;
    });
    console.log(this.candidates);
    this.totalNumberOfCandidates = this.candidates.length;
  }
}
