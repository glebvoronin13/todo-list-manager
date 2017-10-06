import {
  Component, ElementRef, EventEmitter, Input, OnInit, Output,
  ViewChild
} from '@angular/core';
import { TodoService } from '../todo.service';

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
  @Output()
  onAction: EventEmitter<string> = new EventEmitter<string>();
  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  onEdit() {
    this.editMode = true;
    this.focusInput();
  }

  onSave(text) {
    this.todoService.editTodo(this.todo.id, text).subscribe(
        () => {
          this.onAction.emit('EDIT');
        },
        (err) => {
          console.log(err);
        },
        () => {
          this.editMode = false;
        }
    );
  }

  onDone() {
    this.todo.completed = !this.todo.completed;
    this.todoService.toggleTodo(this.todo.id, this.todo.completed).subscribe(
        () => {
          this.onAction.emit('DONE');
        },
        (err) => {
          console.log(err);
        },
        () => {
          this.editMode = false;
        }
    );
  }
  onRemove(id) {
    this.todoService.removeTodo(id).subscribe(
        (res) => {
          console.log(res);
          this.onAction.emit('REMOVE');
        },
        (err) => {
          console.log(err);
        }
    );
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
