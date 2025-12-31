import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ListService } from '../../services/list.service';
import { Todo } from '../todo/todo';
import { BackIcon } from '../back-icon/back-icon';

@Component({
  selector: 'app-todo-page',
  imports: [ FormsModule, RouterLink, Todo, BackIcon ],
  templateUrl: './todo-page.html',
  styleUrl: './todo-page.css',
})
export class TodoPage {
  newTodoText = '';

  private readonly route = inject(ActivatedRoute);
  private readonly listService = inject(ListService);

  readonly listId = computed(() => 
    this.route.snapshot.paramMap.get('listId') ?? '');

  readonly list = computed(() => 
    this.listService.lists().find(l => l.id === this.listId()));

  addTodo() {
    const id = this.listId();
    if(!id) return;
    this.listService.addTodo(id, this.newTodoText);
    this.newTodoText = '';
  }
}
