import {Injectable} from '@angular/core';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private config: ConfigService) {
  }

  private UrlUserCurrent = this.config.api + '/user/current';

  // @ts-ignore
  currentUserSubject = new BehaviorSubject();

  getCurrentUser() {
    return this.http.get(this.UrlUserCurrent);
  }
}
