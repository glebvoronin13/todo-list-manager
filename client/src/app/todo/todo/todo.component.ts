import {
  Component, ElementRef, EventEmitter, Input, OnInit, Output,
  ViewChild
} from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../../shared/models/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @ViewChild('todoInput') inputEl: ElementRef;
  @Input() todo: Todo;
  editMode: boolean;
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
    if ( !text || !text.length ) {
      return this.onAction.emit('EDIT_CANCEL');
    }
    this.todoService.editTodo(this.todo.id, text).subscribe(
        () => {
          this.onAction.emit('EDIT');
        },
        (err) => {
          this.onAction.emit('EDIT_ERROR');
        },
        () => {
          this.editMode = false;
        }
    );
  }

  onDone() {
    this.todo.completed = !this.todo.completed;
    const state = ( this.todo.completed ) ? 'DONE' : 'NOT_DONE';
    this.todoService.toggleTodo(this.todo.id, this.todo.completed).subscribe(
        () => {
          this.onAction.emit(state);
        },
        (err) => {
          this.onAction.emit(`${state}_ERROR`);
        },
        () => {
          this.editMode = false;
        }
    );
  }
  onRemove(id) {
    this.todoService.removeTodo(id).subscribe(
        (res) => {
          this.onAction.emit('REMOVE');
        },
        (err) => {
          this.onAction.emit('REMOVE_ERROR');
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
