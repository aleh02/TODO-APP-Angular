import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { List } from '../list/list';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-list-page',
  imports: [ FormsModule, List ],
  templateUrl: './list-page.html',
  styleUrl: './list-page.css',
})
export class ListPage {
  newListName = '';

  constructor(public listService: ListService) {}

  addList() {
    this.listService.addList(this.newListName);
    this.newListName = '';
  }
}
