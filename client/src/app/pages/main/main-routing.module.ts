import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from '../pagenotfound/pagenotfound.component';
import { LandingComponent } from './landing/landing.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
  path: '',
  component: MainComponent,
    children: [
      {
        path: 'landing',
        component: LandingComponent
      },
      { path: '', 
      redirectTo: 'landing',
      pathMatch: 'full',
      },
      {
      path: '**',
      component: PagenotfoundComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
