import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CandidateService } from '../Service/candidate.service';
import { Observable, of } from 'rxjs';
import { CandidateDetails } from '../Models/CandidateDetails';
import { candidateMockData } from 'src/MockData/CandidateMockData';
import { candidateDetailsMockData } from 'src/MockData/CandidateDetailsMockData';
import { BrowserModule, By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {CommonModule} from '@angular/common';
import { CandidateListComponent } from './candidate-list.component';

@Injectable()
class MockCandidateService extends CandidateService {
  getCandidateDetails(): Observable<CandidateDetails[]> {
    return of(candidateMockData);
  }

  addCandidateDetails(candidateMockData): Observable<CandidateDetails> {
    return of(candidateMockData[0]);
  }
  deleteCandidate(candidateMockData): Observable<CandidateDetails> {
    return of(candidateMockData[0]);
  }
}


describe('CandidateListComponent', () => {
  let component: CandidateListComponent;
  let fixture: ComponentFixture<CandidateListComponent>;
  let dataStub: MockCandidateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateListComponent ],
      imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        NgModule,
        RouterModule,
        CommonModule,
        ReactiveFormsModule
      ],
      providers: [
        {provide: CandidateService, useClass: MockCandidateService},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateListComponent);
    component = fixture.debugElement.componentInstance;
    dataStub = fixture.debugElement.injector.get(CandidateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the app', async(() => {
    fixture = TestBed.createComponent(CandidateListComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

    it('Should have header',
      () => {
        fixture.detectChanges();
        const header = fixture.debugElement.query(By.css('h1')).nativeElement;
        expect(header).toBeTruthy();
      });

    it('should delete candidate',
      async(() => {
        spyOn(component, 'delete');

        let button = fixture.debugElement.nativeElement.querySelector('button');
        button.click();

        fixture.whenStable().then(() => {
          expect(button).toBeTruthy();
        });
      }));
});
