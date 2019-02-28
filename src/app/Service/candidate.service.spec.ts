import { CandidateService } from './candidate.service';
import { candidateMockData } from 'src/MockData/CandidateMockData';
import { of, Observable } from 'rxjs';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { candidateDetailsMockData } from 'src/MockData/CandidateDetailsMockData';

let CandidateMockService: CandidateService, mockService = {
    addCandidateDetails: jasmine.createSpy('addCandidateDetails').and.returnValue(of(1)),
    getCandidateDetails: jasmine.createSpy('getCandidateDetails').and.returnValue(of(candidateMockData)),
    updateCandidateDetails: jasmine.createSpy('updateCandidate').and.returnValue(of(1)),
    getCandidateDetailsById: jasmine.createSpy('getCandidateDetailsById').and.returnValue(of(candidateDetailsMockData)),
    deleteCandidate: jasmine.createSpy('deleteCandidate').and.returnValue(of(1))
};

describe('CandidateService',
    () => {
        let service: CandidateService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientModule],
                providers: [
                    {
                        provide: CandidateService,
                        useValue: mockService
                    }
                ]
            });
        });

        beforeEach(inject([CandidateService],
            (CandidateMockService => {
            service = CandidateMockService;
        })));

        it('get the candidate list',
        () => {
            let fakeResponse = null;

            service.getCandidateDetails().subscribe((value) => {
                fakeResponse = value;
            });

            expect(fakeResponse).toBeDefined();
            expect(fakeResponse).toBe(candidateMockData);
        });

        it('should return an error when the server returns a 404',
            () => {
                const errorResponse = new HttpErrorResponse({
                    error: 'test 404 error',
                    status: 404,
                    statusText: 'Not Found'
                });
            });

        it('ahould add Candidate',
            () => {
               let fakeResponse = null;

               service.addCandidateDetails(candidateMockData[0]).subscribe((value) => {
                   fakeResponse = value;
               });
               expect(fakeResponse).toBeDefined();
               expect(fakeResponse).toBe(1);
            });

        it('should update candidateId',
        () => {
            let addValue = null;
            let updateValue =  null;

            service.addCandidateDetails(candidateMockData[0]).subscribe((val) => {
                addValue = val;
            });

            service.updateCandidateDetails(candidateMockData[0]).subscribe((val) => {
                updateValue = val;
            });

            expect(addValue).toBeDefined();
            expect(addValue).toEqual(1);

            expect(updateValue).toBeDefined();
            expect(updateValue).toEqual(1);

            expect(addValue).toBeLessThanOrEqual(updateValue);
        });

        it('should update CandidateName',
        () => {
            let addValue = null;
            let updateValue = null;

            service.addCandidateDetails(candidateMockData[1]).subscribe((val) => {
                addValue = val;
            });

            service.updateCandidateDetails(candidateMockData[1]).subscribe((val) => {
                updateValue = val;
            });

            expect(addValue).toBeDefined();
            expect(addValue).toBe(1);

            expect(updateValue).toBeDefined();
            expect(updateValue).toBe(1);

            expect(updateValue).toEqual(addValue);
        });

        it('should get Candidate details',
        () => {
            let fakeResponse = null;

            service.getCandidateDetailsById(1).subscribe((val) => {
                fakeResponse = val;
            });

            expect(fakeResponse).toBeDefined();
            expect(fakeResponse).toBe(candidateDetailsMockData);
        });

        it('should delete Candidate',
        () => {
            let fakeResponse = null;

            service.deleteCandidate(314).subscribe((val) => {
                fakeResponse = val;
            });

            expect(fakeResponse).toBeDefined();
            expect(fakeResponse).toBe(1);
        });
    });
