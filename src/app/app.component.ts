import { Component } from '@angular/core';
import { AuthenticationService } from './login/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Smart Habits';

  constructor(
    public authenticationService: AuthenticationService) { }
}
