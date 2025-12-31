import { Component, Input, inject } from '@angular/core';
import { TodoItem } from '../../models';
import { ListService } from '../../services/list.service';
import { EditIcon } from '../edit-icon/edit-icon';
import { CloseIcon } from '../close-icon/close-icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  imports: [FormsModule, EditIcon, CloseIcon],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
})
export class Todo {
  @Input({ required: true }) listId!: string;
  @Input({ required: true }) todo!: TodoItem;

  private readonly listService = inject(ListService);

  toggle() {
    this.listService.toggleTodo(this.listId, this.todo.id);
  }

  edit() {
    const newText = prompt('Modifica todo:', this.todo.text);
    if(newText !== null) 
      this.listService.renameTodo(this.listId, this.todo.id, newText);
  }

  remove() {
    this.listService.deleteTodo(this.listId, this.todo.id);
  }
}
