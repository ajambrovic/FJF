import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { AuthGuard } from './common/guards/auth.guard';

const appRoutes: Routes = [
    { path: '', component: LineChartComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const RoutingModule = RouterModule.forRoot(appRoutes);
