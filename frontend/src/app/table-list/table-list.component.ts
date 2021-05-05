import { Component, OnInit } from '@angular/core';
import {candidates} from '../backend/candidates';
import {CandidateService} from '../data_services/candidate.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  candidates;
  totalNumberOfCandidates;
  dataSource;
;
  constructor(private candidateService: CandidateService) { }

  ngOnInit() {
    this.candidateService.getCandidates().subscribe(response => {
      this.candidates = response;
      this.dataSource = new MatTableDataSource(response);
    });
    console.log(this.dataSource);
    this.totalNumberOfCandidates = this.candidates.length;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
