import { Id } from '../interfaces/id';

export class Todo {
  id: Id;
  uid: Id;
  text: string;
  completed: boolean;

  constructor(data) {
    this.id = data._id;
    this.uid = data.uid;
    this.text = data.text;
    this.completed = data.completed === true;
  }
}
