export type TodoStatus = 'done' | 'ongoing';

export interface TodoItem {
    id: string;
    text: string;
    completed: TodoStatus;
}

export interface TodoList {
    id: string;
    name: string;
    todos: TodoItem[];
}