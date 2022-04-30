import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoalComponent } from './goal/goal.component';
import { ForecastComponent } from './forecast/forecast.component';
import { HomeComponent } from './home/home.component';
import { SetupComponent } from './setup/setup.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'setup', component: SetupComponent },
  { path: 'goal', component: GoalComponent },
  { path: 'forecast', component: ForecastComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
