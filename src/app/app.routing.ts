import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { AuthGuard } from './common/guards/auth.guard';
import { HumiditySensorComponent } from './humidity-sensor/humidity-sensor.component';

const appRoutes: Routes = [
  { path: 'line-chart', component: LineChartComponent, canActivate: [AuthGuard] },
  { path: 'humidity-sensor', component: HumiditySensorComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: 'humidity-sensor' }
];

export const RoutingModule = RouterModule.forRoot(appRoutes);
