import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LineChartService } from './line-chart/line-chart.service';
import { LineChartModule } from './line-chart/line-chart.module';
import { HttpClientModule } from '@angular/common/http';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token.interceptor';
import { LoginModule } from './login/login.module';
import { RoutingModule } from './app.routing';

import { NavbarModule } from './navbar/navbar.module';
import { GlobalErrorHandler } from './common/global-error.handler';
import { GeneralConfigImpl, LineChartComponentConfigImpl } from '../environments/environment';

import { HomeStatusModule } from './home-status/home-status.module';
import { ALineChartConfig } from './line-chart/line-chart-config';
import { AGeneralConfig } from './common/domain/general-config';
import { AuthGuard } from './common/guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LoginModule,
    NavbarModule,
    HomeStatusModule,
    LineChartModule,
    HttpClientModule,
    RoutingModule,
    ToasterModule.forRoot(),
    NgbModule.forRoot(),
  ],
  providers: [
    LineChartService,
    ToasterService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthGuard,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: AGeneralConfig, useExisting: GeneralConfigImpl },
    { provide: ALineChartConfig, useExisting: LineChartComponentConfigImpl },
    LineChartComponentConfigImpl,
    GeneralConfigImpl
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
