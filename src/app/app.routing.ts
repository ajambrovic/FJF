import { DoorSensorComponent } from './door-sensor/door-sensor.component';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { AuthGuard } from './common/guards/auth.guard';

const appRoutes: Routes = [
    { path: 'door-sensor', component: DoorSensorComponent, canActivate: [AuthGuard] },
    { path: 'line-chart', component: LineChartComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: 'door-sensor' }
];

export const RoutingModule = RouterModule.forRoot(appRoutes);
