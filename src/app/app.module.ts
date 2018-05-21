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
import { AuthGuard } from './guards/auth.guard';
import { NavbarModule } from './navbar/navbar.module';
import { GlobalErrorHandler } from './common/global-error.handler';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LoginModule,
    NavbarModule,
    LineChartModule,
    HttpClientModule,
    RoutingModule,
    ToasterModule.forRoot(),
    NgbModule.forRoot(),
  ],
  providers: [
    LineChartService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthGuard,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    ToasterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
