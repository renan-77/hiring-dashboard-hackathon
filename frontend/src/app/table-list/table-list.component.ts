import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  candidates = [{'_id': '60913b26d63b9fdba794cc6b', 'first_name': 'Steven', 'last_name': 'Bowmer', 'email': 'steven.bowmer@email.com',
    'role': 'Cyber Security', 'branch': 'Dublin',
    'personal_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzb21lIjoicGF5bG9hZCJ9.02SpM-Ipt-bNKYHZsQ6EWGc2JsL3gZtwWo8Ri5bBwK8',
    'college': 'University College Cork', 'street_address': '642 Clayton Spurs', 'city': 'New Bobby', 'country': 'Ghana',
    'postcode': '77586', 'status': 'denied', 'video_interview_path': '', 'cv_path': '', 'password': 'steven123'},
    {'_id': '60913b26fb55633699f493d5', 'first_name': 'Michael', 'last_name': 'Veile', 'email': 'michael.veile@email.com',
      'role': 'Finance', 'branch': 'Dublin',
      'personal_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzb21lIjoicGF5bG9hZCJ9.1k74hiBx0MdXlrPZQhU5B3Pw2FFdxR6tSQfGy6yp4Ik',
      'college': 'Limerick Institute of Technology', 'street_address': '91875 Mercado Stravenue', 'city': 'Rileytown',
      'country': 'South Africa', 'postcode': '79094', 'status': 'pending', 'video_interview_path': '', 'cv_path': '',
      'password': 'michael123'}, {'_id': '60913b26c57b2c4cfa1f543f', 'first_name': 'Elizabeth', 'last_name': 'Ward',
      'email': 'elizabeth.ward@email.com', 'role': 'Cyber Security', 'branch': 'Cork, Ovens',
      'personal_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzb21lIjoicGF5bG9hZCJ9.cNGcbIFPC5HCbhsZKiIRAyiZLcTpK90-EmjMu8z9q7w',
      'college': 'University College Dublin', 'street_address': '2944 Maria Garden', 'city': 'South David', 'country': 'Haiti',
      'postcode': '53558', 'status': 'denied', 'video_interview_path': '', 'cv_path': '', 'password': 'elizabeth123'}]
  totalNumberOfCandidates = this.candidates.length;
  constructor() { }

  ngOnInit() {
  }

}
