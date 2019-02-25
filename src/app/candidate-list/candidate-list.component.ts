import { Component, OnInit } from '@angular/core';
import { CandidateDetails } from '../Models/CandidateDetails';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CandidateService } from '../Service/candidate.service';
import { DataTableModule, SharedModule, DataTable } from 'primeng/primeng';
import {AccordionModule} from 'primeng/accordion';
import {MenuItem} from 'primeng/api';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {

  candidateList: CandidateDetails[];
  statusCodes: string[] = ['New', 'Accept', 'Reject'];

  constructor(private _router: Router, private _candidateService: CandidateService) {
    this.getCandidateList();
  }
  ngOnInit() {
    this.getCandidateList();
  }

  getCandidateList() {
    this._candidateService.getCandidateDetails().subscribe(
      data => {
        this.candidateList = data;
        // console.log(this.candidateList);
      }
    );
  }
  addNewCandidate() {
    this._router.navigate(['/add-candidate']);
  }

  delete(Id) {
    let ans = confirm('Do you want to delete candidate with Id: ' + Id);
    if (ans) {
        this._candidateService.deleteCandidate(Id).subscribe((data) => {
            this.getCandidateList();
        }, error => console.error(error));
    }
}

}
