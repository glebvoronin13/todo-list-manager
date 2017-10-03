import { Component, OnInit } from '@angular/core';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  messages: string[];
  constructor() { }

  ngOnInit() {
    this.messages = [
        'Hello',
        'Hello',
        'Hello',
        'Hello',
        'Hello',
        'Hello',
        'Hello',
    ];
  }

}
