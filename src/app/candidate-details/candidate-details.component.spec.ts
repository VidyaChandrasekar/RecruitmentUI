import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, NgModule } from '@angular/core';
import { CandidateService } from '../Service/candidate.service';
import { BrowserModule, By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { CandidateDetails } from '../Models/CandidateDetails';
import { candidateMockData } from 'src/MockData/CandidateMockData';
import { candidateDetailsMockData } from 'src/MockData/CandidateDetailsMockData';
import { CandidateDetailsComponent } from './candidate-details.component';
import { CandidateListComponent } from '../candidate-list/candidate-list.component';

class ServiceStub extends CandidateService {
  getCandidateDetails(): Observable<CandidateDetails[]> {
    return of(candidateMockData);
  }

  addCandidateDetails(): Observable<CandidateDetails> {
    return of(candidateMockData[0]);
  }

  updateCandidateDetails(): Observable<any> {
    return of(candidateMockData[0]);
  }

  getCandidateDetailsById(number: 1) {
    return of(candidateDetailsMockData);
  }
}

let component: CandidateDetailsComponent;
let fixture: ComponentFixture<CandidateDetailsComponent>;
let dataStub: ServiceStub;

describe('CandidateDetailsComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateDetailsComponent ],
      imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        NgModule,
        RouterModule,
        CommonModule
      ]
    }).overrideComponent(CandidateDetailsComponent, {
      set: {
        providers: [
          { provide: CandidateService, useClass: ServiceStub}, CandidateListComponent
        ]
      }
    }).overrideComponent(CandidateListComponent, {
      set: {
        providers: [
          CandidateService
        ]
      }
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(CandidateDetailsComponent);
      component = fixture.componentInstance;
      dataStub = fixture.debugElement.injector.get(CandidateService, CandidateListComponent);
    });
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(CandidateDetailsComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });
  beforeEach(() => {
    const candidate: CandidateDetails[] = candidateMockData;
    // component.candidateForm = candidateMockData;
  // comp.saveCandidateEvent.subscribe(selectedClient=>expect(selectedClient).toBe(client));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form should be valid ',
    () => {
      fixture.detectChanges();
      const dropdown = fixture.debugElement.query(By.css('form')).nativeElement;
      expect(dropdown).toBeTruthy();
      expect(dropdown.valid).toBeFalsy();
    });

    it('should save candidate', () => {
      const spy = spyOn(dataStub, 'addCandidateDetails').and.returnValue(
      of(candidateMockData)
    );
      fixture.detectChanges();
      expect(component.candidateForm).toEqual(candidateMockData[0]);
    });
});
