import {Component} from '@angular/core';
import {RetroService} from "./services/retro.service";
import {AuthService, GoogleLoginProvider} from "angularx-social-login";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Retro-Board';
  isNavBarHidden = true;
  public user;

  constructor(
    public retroService: RetroService,
    private socialAuthService: AuthService
  ) { }

  toggleNavBar() {
    this.isNavBarHidden = !this.isNavBarHidden;
  }
  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    console.log(socialPlatform);

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(userData);

        this.user = userData;
        localStorage.setItem('userId', userData.id);
        localStorage.setItem('token', userData.idToken);
      }
    )
  }

  public socialSignOut() {
    this.socialAuthService.signOut().then(
      () => {
        this.user = null;
        localStorage.setItem('userId', null);
        localStorage.setItem('token', null);
      }
    )
  }

}
