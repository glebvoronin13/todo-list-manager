export class Todo {
  id: string;
  uid: string;
  text: string;
  completed: boolean;

  constructor(data) {
    this.id = data._id;
    this.uid = data.uid;
    this.text = data.text;
    this.completed = data.completed === true;
  }
}
