import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../login/services/authentication.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent {

    title = 'Smart Habits';

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }


    isLoggedIn() {
        return this.authenticationService.isLoggedIn();
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
        return false;
    }

}
