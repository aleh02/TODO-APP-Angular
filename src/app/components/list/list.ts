import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TodoList } from '../../models';
import { ListService } from '../../services/list.service';
import { EditIcon } from '../edit-icon/edit-icon';
import { OpenIcon } from '../open-icon/open-icon';
import { CloseIcon } from '../close-icon/close-icon';

@Component({
  selector: 'app-list',
  imports: [ EditIcon, OpenIcon, CloseIcon ],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List {
  @Input({ required: true }) list!: TodoList;

  constructor(private router: Router, private listService: ListService) {}

  open(){
    this.router.navigate(['/lists', this.list.id]);
  }

  edit() {
    const newName = prompt('Nuovo nome lista:', this.list.name);
    if(newName!== null) this.listService.renameList(this.list.id, newName);
  }

  remove() {
    this.listService.deleteList(this.list.id);
  }

  get percentage(): number {
    const total = this.list.todos.length;
    if(total == 0) return 0;

    const done = this.list.todos.filter(t => 
      t.completed === 'done').length;

    return Math.round((done / total) * 100);  
  }
}
