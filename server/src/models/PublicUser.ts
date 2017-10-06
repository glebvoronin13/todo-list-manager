export class PublicUser {
  id: any;
  email: string;
  constructor (user) {
    this.id = user._id;
    this.email = user.email;
  }
}
