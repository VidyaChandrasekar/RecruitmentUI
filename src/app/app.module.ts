import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CandidateService } from './Service/candidate.service';
import { HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AccordionModule} from 'primeng/accordion';
import { DataTableModule, SharedModule, ButtonModule, DialogModule, InputTextModule, CalendarModule } from 'primeng/primeng';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { CandidateDetailsComponent } from './candidate-details/candidate-details.component';
import { CandidateListComponent } from './candidate-list/candidate-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CandidateDetailsComponent,
    CandidateListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    AccordionModule,
    FormsModule,
    DataTableModule,
    // SharedModule,
    AngularFontAwesomeModule,
    // SharedModule,
    // ButtonModule,
    DialogModule,
    // InputTextModule,
    CalendarModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
        { path: '', redirectTo: 'candidate-list', pathMatch: 'full' },
        { path: 'candidate-list', component: CandidateListComponent },
        { path: 'candidate-detail', component: CandidateDetailsComponent },
        { path: 'candidate/edit/:id', component: CandidateDetailsComponent },
        // {path: '/update-candidate/:id', component: UpdateCandidateComponent},
        { path: '**', redirectTo: 'candidate-list' }
    ])
  ],
  providers: [CandidateService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
