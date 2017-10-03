import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodosComponent } from './todos/todos.component';
import { TodoComponent } from './todo/todo.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    TodoRoutingModule,
    MaterialModule,
  ],
  declarations: [TodosComponent, TodoComponent]
})
export class TodoModule { }
