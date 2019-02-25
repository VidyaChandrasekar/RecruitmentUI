import { TestBed } from '@angular/core/testing';
import { NgModule } from '@angular/core';
import { CandidateService } from './candidate.service';
import { candidateMockData } from 'src/MockData/CandidateMockData';
import { of } from 'rxjs';
import { candidateDetailsMockData } from 'src/MockData/CandidateDetailsMockData';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';

let CandidateMockService: CandidateService, mockService = {
  getCandidateDetails: jasmine.createSpy('getCandidateDetails').and.returnValue(of(candidateMockData[0])),
  getCandidateDetailsById: jasmine.createSpy('getCandidateDetailsById').and.returnValue(of(candidateDetailsMockData)),
  addCandidateDetails: jasmine.createSpy('addCandidateDetails').and.returnValue(of(1)),
  updateCandidateDetails: jasmine.createSpy('updateCandidateDetails').and.returnValue(of(1)),
  deleteCandidate: jasmine.createSpy('deleteCandidate').and.returnValue(of(1))
};

describe('CandidateService',
() => {
 let service: CandidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientModule,
              RouterTestingModule,
              SharedModule,
              FormsModule,
              CommonModule],
    providers: [
      {
      provide: CandidateService,
      useValue: mockService
      },
      // { provide: CandidateService, useFactory: () => new CandidateService(null) },
      AppRoutingModule
    ]
  });
});

// beforeEach(inject([CandidateService],
//      (CandidateMockService => {
//     service = CandidateMockService;
//   })));

  it('should be created', () => {
    const sservice: CandidateService = TestBed.get(CandidateService);
    expect(sservice).toBeTruthy();
  });

  it('should get candidate list', () => {
    let fakeresponse = null;
    service.getCandidateDetails().subscribe((value) => {
      fakeresponse = value;
    });
    expect(fakeresponse).toBeDefined();
    expect(fakeresponse).toBe(candidateMockData);
  });

  it('should return an error when the server returns a 404',
  () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found'
    });
  });

  it('add-candidate', () => {
    let fakeresponse = null;

    service.addCandidateDetails(candidateMockData[0]).subscribe((value) => {
      fakeresponse = value;
    });
    expect(fakeresponse).toBeDefined();
    expect(fakeresponse).toBe(1);
  });

  it('should update the candidate Id', () => {
      let addedValue = null;
      let updatedValue = null;

      service.addCandidateDetails(candidateMockData[0]).subscribe((val) => {
        addedValue = val;
      });

      service.updateCandidateDetails(candidateMockData[0]).subscribe((val) => {
        updatedValue = val;
      });
      expect(addedValue).toBeDefined();
      expect(addedValue).toEqual(1);

      expect(updatedValue).toBeDefined();
      expect(updatedValue).toBeLessThan(2);

      expect(addedValue).toBeLessThanOrEqual(updatedValue);
  });

  it('should update CandidateName',
  () => {
    let addedValue = null;
    let updatedValue = null;

    service.addCandidateDetails(candidateMockData[1]).subscribe((val) => {
      addedValue = val;
    });

    service.updateCandidateDetails(candidateMockData[1]).subscribe((val) => {
      updatedValue = val;
    });
    expect(addedValue).toBeDefined();
    expect(addedValue).toBe(1);

    expect(updatedValue).toBeDefined();
    expect(updatedValue).toBe(1);

    expect(updatedValue).toEqual(addedValue);
  });

it('should get candidate details',
() => {
  let fakeResponse = null;

  service.getCandidateDetailsById(1).subscribe((value) => {
    fakeResponse = value;
  });

  expect(fakeResponse).toBeDefined();
  expect(fakeResponse).toBe(candidateDetailsMockData);
});

it('delete candidate',
() => {
  let fakeResponse = null;

  service.deleteCandidate(2).subscribe((value) => {
    fakeResponse = value;
  });

  expect(fakeResponse).toBeDefined();
  expect(fakeResponse).toBe(1);
});

});
