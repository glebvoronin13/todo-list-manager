export class User {
  id: string;
  email: string;
  constructor( user ) {
    this.id = user._id;
    this.email = user.email;
  }
}
