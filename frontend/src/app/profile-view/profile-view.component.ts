import { Component, OnInit } from '@angular/core';
import {CandidateService} from '../data_services/candidate.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  id: string;
  candidateData;
  constructor(private dataService: CandidateService) { }

  ngOnInit(): void {
    this.dataService.getSingleCandidate('60914c6c092a5e4c138340cd').subscribe( candidateData => {
          this.candidateData = candidateData;
        // this.candidateData = this.candidateData[0];
        // this.candidateData = this.candidateData;
          console.log(this.candidateData.first_name);
        })
  }

}
