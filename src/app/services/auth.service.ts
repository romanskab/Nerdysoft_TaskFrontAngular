import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient,
              private config: ConfigService) {
  }

  private UrlLogin = this.config.api + '/login';
  private UrlRegister = this.config.api + '/register';

  login(user) {
    console.log(user);
    return this.http.post(this.UrlLogin, user, {observe: 'response'});
  }

  register(user) {
    return this.http.post(this.UrlRegister, user);
  }

}
