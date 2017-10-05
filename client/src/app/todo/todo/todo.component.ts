import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @ViewChild('todoInput') inputEl: ElementRef;
  @Input() todo: any;
  editMode: boolean;
  isDone: boolean;
  constructor() { }

  ngOnInit() {
  }

  onEdit() {
    this.editMode = true;
    this.focusInput();
  }

  onSave() {
    this.editMode = false;
  }

  onDone() {
    this.todo.completed = !this.todo.completed;
  }

  focusInput() {
    setTimeout(() => {
      try {
        this.inputEl.nativeElement.focus();
      } catch (e) {
        // do nothing
      }
    });
  }

}
