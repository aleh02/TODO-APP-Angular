import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'lists' },
    {
        path: 'lists',
        loadComponent: () =>
            import('./components/list-page/list-page').then(m =>
                m.ListPage
            ),
    },
    {
        path: 'lists/:listId',
        loadComponent: () =>
            import('./components/todo-page/todo-page').then(m =>
                m.TodoPage
            ),
    },
    { path: '**', redirectTo: 'lists' },
];
