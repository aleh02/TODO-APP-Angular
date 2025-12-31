import { Injectable, computed, effect, signal } from '@angular/core'
import { TodoList, TodoItem } from '../models'
import { preserveWhitespacesDefault } from '@angular/compiler';

const LS_KEY = 'angular-todo';

function uid(): string {
    return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
}

function loadInitial(): TodoList[] {
    try{
        const raw = localStorage.getItem(LS_KEY);
        if(!raw) return [];  
        const parsed = JSON.parse(raw) as TodoList[];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

@Injectable({ providedIn: 'root' })
export class ListService {
    private readonly _lists = signal<TodoList[]>(loadInitial());

    readonly lists = computed(() => this._lists());
    readonly getListById = (id: string) => 
        computed(() => this._lists().find(l => l.id === id));

    constructor() {
        effect(() => {
            localStorage.setItem(LS_KEY, JSON.stringify(this._lists()));
        });
    }

    addList(name: string) {
        const trimmed = name.trim();
        if(!trimmed) return;

        this._lists.update(p => [
            ...p,
            { id:uid(), name: trimmed, todos: [] },
        ]);
    }

    renameList(listId: string, newName: string) {
        const trimmed = newName.trim();
        if(!trimmed) return;

        this._lists.update(p => 
            p.map(l => (l.id === listId ? { ...l, name: trimmed } : l ))
        );
    }

    deleteList (listId: string) {
        this._lists.update(p => p.filter(l => l.id !== listId));
    }

    addTodo(listId: string, text: string) {
        const trimmed = text.trim();
        if(!trimmed) return;

        this._lists.update(p => 
            p.map(l => l.id === listId ? 
                { ...l, todos: [ ...l.todos, { id:uid(), 
                    text: trimmed, completed: 'ongoing' } ] } 
                : l )
        );
    }

    toggleTodo(listId: string, todoId: string) {
        this._lists.update(p => 
            p.map(l => 
                l.id === listId 
                ? {
                    ...l,
                    todos: l.todos.map(t =>
                        t.id === todoId
                        ? {
                            ...t,
                            completed: t.completed === 'done' ? 'ongoing' : 'done'
                        }
                        : t
                    )
                }
                : l
            )
        );
    }

    renameTodo(listId: string, todoId: string, newText: string) {
        const trimmed = newText.trim();
        if(!trimmed) return;

        this._lists.update(p =>
            p.map(l =>
                l.id === listId
                ? {
                    ...l, 
                    todos: l.todos.map(t =>
                        t.id === todoId 
                        ? {
                            ...t, 
                            text: trimmed
                        }
                        : t
                    )
                }
                : l
            )
        );
    }

    deleteTodo(listId: string, todoId: string) {
        this._lists.update(p =>
            p.map(l => 
                l.id === listId
                ? { ...l, 
                    todos: l.todos.filter(t =>
                        t.id !== todoId
                    )
                }
                : l
            )
        );
    }
}

