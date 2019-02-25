import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateService } from '../Service/candidate.service';
@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.css']
})
export class CandidateDetailsComponent implements OnInit {
  candidateForm: FormGroup;
  title = 'Create';
  id: number;
  errorMessage: any;

  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
      private _candidateService: CandidateService, private _router: Router) {
      if (this._avRoute.snapshot.params['id']) {
          this.id = this._avRoute.snapshot.params['id'];
          console.log(this.id);
      }

      this.candidateForm = this._fb.group({
          id: 0,
          name: ['', [Validators.required]],
          phoneNumber: ['', [Validators.required]],
          currentCtc: ['', [Validators.required]],
          noticePeriod: ['', [Validators.required]],
          role: ['', [Validators.required]],
          status: ['', [Validators.required]],
          date: ['', [Validators.required]]
      });
  }

  ngOnInit() {
      if (this.id > 0) {
          this.title = 'Edit';
          this._candidateService.getCandidateDetailsById(this.id)
              .subscribe(resp => {
                this.candidateForm.setValue(resp);
                console.log(resp);
              }, error => this.errorMessage = error);
      }
  }

  save() {

      if (!this.candidateForm.valid) {
          return;
      }

      if (this.title == 'Create') {
          this._candidateService.addCandidateDetails(this.candidateForm.value)
              .subscribe((data) => {
                  this._router.navigate(['/view-candidate']);
              }, error => this.errorMessage = error);
      } else if (this.title == 'Edit') {
          this._candidateService.updateCandidateDetails(this.candidateForm.value)
              .subscribe((data) => {
                  this._router.navigate(['/view-candidate']);
              }, error => this.errorMessage = error);
      }
  }

  cancel() {
      this._router.navigate(['/view-candidate']);
  }

  get name() { return this.candidateForm.get('name'); }
  get phoneNumber() { return this.candidateForm.get('phoneNumber'); }
  get currentCtc() { return this.candidateForm.get('currentCtc'); }
  get noticePeriod() { return this.candidateForm.get('noticePeriod'); }
  get role() { return this.candidateForm.get('role'); }
  get status() {return this.candidateForm.get('status'); }
  get date() {return this.candidateForm.get('date'); }
}
