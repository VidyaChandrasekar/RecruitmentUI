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
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Injectable()
class MockCandidateService extends CandidateService {
  getCandidateDetails(): Observable<CandidateDetails[]> {
    return of(candidateMockData);
  }

  addCandidateDetails(candidateMockData): Observable<CandidateDetails> {
    return of(candidateMockData[0]);
  }
  delete(candidateMockData): Observable<CandidateDetails> {
    return of(candidateMockData[0]);
  }
}

describe('CandidateListComponent',
() => {
  let fixture;
  let component;
  let dataStub: MockCandidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CandidateListComponent
      ],
      imports: [
          BrowserModule,
          BrowserAnimationsModule,
          HttpClientModule,
          FormsModule,
          AppRoutingModule
      ],
      providers: [
        {provide: CandidateService, useClass: MockCandidateService}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(CandidateListComponent);
    component = fixture.debugElement.componentInstance;
    dataStub = fixture.debugElement.injector.get(CandidateService);
  });

  it('should create',
  () => {
    expect(component).toBeTruthy();
  });

  it('should create the app',
    async(() => {
      fixture = TestBed.createComponent(CandidateListComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    }));

  it('should get candidate list',
    async(() => {
      const spyDetail = spyOn(dataStub, 'getCandidateDetails').and.returnValue(of(candidateMockData));
      component.ngOnInit();
      fixture.detectChanges();
      expect(component.candidateList).toEqual(candidateMockData);
      expect(spyDetail.calls.any()).toEqual(true);
    }));

  it('should get candidate from CandidateListConmponent',
    async(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.candidateList.length).toBe(1);
      });
    }));

  it('Should have a p-table',
  () => {
    fixture.detectChanges();
    const table = fixture.debugElement.query(By.css('p-dataTable')).nativeElement;
    expect(table).toBeTruthy();
  });

  it('Should have a header',
  () => {
    fixture.detectChanges();
    const header = fixture.debugElement.query(By.css('p-header')).nativeElement;
    expect(header).toBeTruthy();
  });
});

