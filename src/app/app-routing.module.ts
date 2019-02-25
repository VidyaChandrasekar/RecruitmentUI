import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccordionModule} from 'primeng/accordion';
import {MenuItem} from 'primeng/api';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
