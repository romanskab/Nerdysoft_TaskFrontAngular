import {User} from './User';

export class Task {
  constructor(
    public id?: number,
    public description?: string,
    public user?: User,
    public sender?: string
  ) {
  }
}
