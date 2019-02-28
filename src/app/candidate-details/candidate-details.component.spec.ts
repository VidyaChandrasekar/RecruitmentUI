import { CandidateService } from '../Service/candidate.service';
import { Observable, of } from 'rxjs';
import { CandidateDetails } from '../Models/CandidateDetails';
import { candidateMockData } from 'src/MockData/CandidateMockData';
import { CandidateDetailsComponent } from './candidate-details.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { async } from 'q';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { DataTableModule, CalendarModule } from 'primeng/primeng';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { CandidateListComponent } from '../candidate-list/candidate-list.component';
import { AppRoutingModule } from '../app-routing.module';
import { By, BrowserModule } from '@angular/platform-browser';
import { candidateDetailsMockData } from 'src/MockData/CandidateDetailsMockData';

class CandidateServiceStub extends CandidateService {

  addCandidateDetails(candidateMockData): Observable<CandidateDetails> {
    return of(candidateMockData[0]);
  }

  deleteCandidate(candidateMockData): Observable<CandidateDetails> {
    return of(candidateMockData[0]);
  }

  updateCandidateDetails(candidateMockData: CandidateDetails): Observable<CandidateDetails> {
    return of(candidateMockData[0]);
  }
}
let comp: CandidateDetailsComponent;
let fixture: ComponentFixture<CandidateDetailsComponent>;
let dataStub: CandidateServiceStub;
let CandidateMockService: CandidateService, mockService = {
addCandidateDetails: jasmine.createSpy('addCandidateDetails').and.returnValue(of(1))
};

describe('Candidate-Details Component', () => {

  // beforeEach(async(() => {
  //     TestBed.configureTestingModule({
  //       imports:
  //       [
  //         BrowserAnimationsModule,
  //         HttpClientModule,
  //         FormsModule,
  //         DataTableModule,
  //         AppRoutingModule,
  //         CalendarModule,
  //         ReactiveFormsModule,
  //         BrowserModule
  //       ],
  //       declarations: [CandidateDetailsComponent],
  //       schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
  //     }).overrideComponent(CandidateDetailsComponent, {
  //       set: {
  //         providers: [
  //           { provide: CandidateService, useClass: CandidateServiceStub},
  //           CandidateListComponent
  //         ]
  //       }
  //   }).overrideComponent(CandidateListComponent, {
  //     set: {
  //       providers: [
  //         CandidateService
  //       ]
  //     }
  //   }).compileComponents()
  //   .then(() => {
  //     fixture = TestBed.createComponent(CandidateDetailsComponent);
  //     comp = fixture.componentInstance;
  //     dataStub = fixture.debugElement.injector.get(CandidateService, CandidateListComponent);
  //     });
  // }));
        beforeEach(() => {
          TestBed.configureTestingModule({
            imports: [
              ReactiveFormsModule,
              FormsModule,
              AppRoutingModule,
              HttpClientModule
            ],
            declarations: [CandidateDetailsComponent],
             providers: [
                {provide: CandidateService, useClass: CandidateServiceStub}
              ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
                }).compileComponents();
                fixture = TestBed.createComponent(CandidateDetailsComponent);
                comp = fixture.componentInstance;
                comp.ngOnInit();
        });

      // beforeEach(() => {
      //   const candidate: CandidateDetails[] = candidateMockData[0];
      //   comp.

      // });

      it('form invalid when empty', () => {
        expect(comp.candidateForm.valid).toBeFalsy();
      });

      it('id field validity', () => {
        let id= comp.candidateForm.controls['id'];
      });

      it('name field validity', () => {
        let name = comp.candidateForm.controls['name'];
        expect(name.valid).toBeFalsy();
      });

      it('phoneNumber field validity', () => {
        let phoneNumber = comp.candidateForm.controls['phoneNumber'];
        expect(phoneNumber.valid).toBeFalsy();
      });

      it('currentCtc field validity', () => {
        let currentCtc = comp.candidateForm.controls['currentCtc'];
        expect(currentCtc.valid).toBeFalsy();
      });

      it('noticePeriod field validity', () => {
        let noticePeriod = comp.candidateForm.controls['noticePeriod'];
        expect(noticePeriod.valid).toBeFalsy();
      });

      it('role field validity', () => {
        let role = comp.candidateForm.controls['role'];
        expect(role.valid).toBeFalsy();
      });

      it('status field validity', () => {
        let status = comp.candidateForm.controls['status'];
        expect(status.valid).toBeFalsy();
      });


      it('name field required error', () => {
        let errors = {};
        let name = comp.candidateForm.controls['name'];
        errors = name.errors || {};
        expect(errors['required']).toBeTruthy();
      });

      it('phoneNumber field required error', () => {
        let errors = {};
        let phoneNumber = comp.candidateForm.controls['phoneNumber'];
        errors = phoneNumber.errors || {};
        expect(errors['required']).toBeTruthy();
      });

      it('currentCtc field required error', () => {
        let errors = {};
        let currentCtc = comp.candidateForm.controls['currentCtc'];
        errors = currentCtc.errors || {};
        expect(errors['required']).toBeTruthy();
      });

      it('role field required error', () => {
        let errors = {};
        let role = comp.candidateForm.controls['role'];
        errors = role.errors || {};
        expect(errors['required']).toBeTruthy();
      });

      it('noticePeriod field required error', () => {
        let errors = {};
        let noticePeriod = comp.candidateForm.controls['noticePeriod'];
        errors = noticePeriod.errors || {};
        expect(errors['required']).toBeTruthy();
      });

      it('status field required error', () => {
        let errors = {};
        let status = comp.candidateForm.controls['status'];
        errors = status.errors || {};
        expect(errors['required']).toBeTruthy();
      });

      it('should save the candidate', async(() => {
        fixture.detectChanges();
        spyOn(comp, 'save').and.callThrough();
        const compiled = fixture.debugElement.nativeElement;

        const button = compiled.querySelector('button');
        button.click();
        fixture.whenStable().then(() => {
           expect(comp.save).toHaveBeenCalled();
            });
      }));
    });
