export class Message {
  constructor(
    public taskId?: number,
    public description?: string,
    public senderId?: number,
    public email?: string,
  ) {
  }
}
