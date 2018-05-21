import { Component, OnInit, Input } from '@angular/core';
import { HomeEnvironment } from './domain/home-environment.model';
import { Location } from './domain/location.model';
import { HomeStatusService } from './home-status.service';
import { Sensor } from './domain/sensor.model';

@Component({
    selector: 'app-home-status',
    templateUrl: './home-status.component.html'
})
export class HomeStatusComponent implements OnInit {

    homeEnvironment: HomeEnvironment;

    constructor(private homeStatusService: HomeStatusService) { }

    ngOnInit() {
        this.homeStatusService.getHomeStatus().subscribe(
            data => { this.homeEnvironment = data; }
        );
    }

}
