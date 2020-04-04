import {Role} from './enums/Role';

export class User {
  constructor(
    public id?: number,
    public name?: string,
    public surname?: string,
    public username?: string,
    public password?: string,
    public role?: Role,
  ) {
  }
}
