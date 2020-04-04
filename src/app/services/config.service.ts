import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  // for localhost:
  private host = 'http://localhost:8080';

  // for AWS:
  // private host = '...';

  api = this.host;
}
