import { Component, OnInit } from '@angular/core';
import { HomeEnvironment } from './domain/home-environment.model';
import { HomeStatusService } from './home-status.service';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-home-status',
    templateUrl: './home-status.component.html'
})
export class HomeStatusComponent implements OnInit {

    homeEnvironment: HomeEnvironment;

    constructor(
        private homeStatusService: HomeStatusService
    ) { }

    ngOnInit() {
        this.homeStatusService.getHomeStatus().subscribe(
            data => { this.homeEnvironment = data; }
        );
        setInterval(() => {
            this.homeStatusService.getHomeStatus().subscribe(
                data => { this.homeEnvironment = data; }
            );
        }, environment.historyRefreshInterval);
    }

}
