import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import React from 'react';
import { TaskEntity } from 'models/entities';
import { TaskFormData } from 'models/form-data';
import TasksService from 'services/TasksService';
import { arrayMove } from 'react-sortable-hoc';

const Context = React.createContext<State>({
  tasks: [],
  isLoadingTasks: false,
  loadingTasksError: '',
  getTasks: () => of([] as TaskEntity[]),
  addTask: () => of(null),
  editTask: () => of(null),
  deleteTask: () => of(null),
  changeTaskOrder: () => of([] as TaskEntity[]),
  changeTaskStatus: () => of(null),
  updateMany: () => {}
});

interface State {
  tasks: TaskEntity[];
  isLoadingTasks: boolean;
  loadingTasksError: string;
  getTasks(): Observable<TaskEntity[]>;
  addTask(formData: TaskFormData): Observable<TaskEntity | null>;
  editTask(formData: TaskFormData, id: number): Observable<TaskEntity | null>;
  deleteTask(id: number): Observable<TaskEntity | null>;
  changeTaskOrder(oldIndex: number, newIndex: number): Observable<TaskEntity[]>;
  changeTaskStatus(taskId: number, taskStatusId: number): Observable<null>;
  updateMany(fn: (task: TaskEntity) => TaskEntity): void;
}

interface Props {
  children: React.ReactNode;
}

class TasksProvider extends React.Component<Props, State> {
  addTask = (formData: TaskFormData) => {
    return TasksService.POST.task(formData).pipe(
      tap(task => this.setState({ tasks: [...this.state.tasks, task] })),
      catchError(() => of(null))
    );
  };

  changeTaskOrder = (oldIndex: number, newIndex: number) => {
    this.setState({ tasks: arrayMove(this.state.tasks, oldIndex, newIndex) });
    return TasksService.PUT.taskOrder(oldIndex, newIndex).pipe(catchError(() => of([])));
  };

  changeTaskStatus = (taskId: number, taskStatusId: number) => {
    this.setState({
      tasks: this.state.tasks.map(task => (task.id === taskId ? { ...task, statusId: taskStatusId } : task))
    });
    return TasksService.PUT.taskStatus(taskId, taskStatusId).pipe(catchError(() => of(null)));
  };

  deleteTask = (id: number) => {
    return TasksService.DELETE.task(id).pipe(
      tap(() => this.setState({ tasks: this.state.tasks.filter(t => t.id !== id) })),
      catchError(() => of(null))
    );
  };

  editTask = (formData: TaskFormData, id: number) => {
    return TasksService.PUT.task(formData).pipe(
      tap(task => this.setState({ tasks: this.state.tasks.map(t => (t.id === id ? task : t)) })),
      catchError(() => of(null))
    );
  };

  getTasks = () => {
    if (!this.state.isLoadingTasks) {
      this.setState({ isLoadingTasks: true });
    }

    return TasksService.GET.tasks().pipe(
      tap(tasks => this.setState({ tasks, isLoadingTasks: false, loadingTasksError: '' })),
      catchError(() => {
        this.setState({ tasks: [], isLoadingTasks: false, loadingTasksError: 'Error occured!' });
        return of([]);
      })
    );
  };

  updateMany = (fn: (task: TaskEntity) => TaskEntity) => {
    this.setState({ tasks: this.state.tasks.map(fn) });
  };

  readonly state: State = {
    tasks: [],
    isLoadingTasks: true,
    loadingTasksError: '',
    getTasks: this.getTasks,
    addTask: this.addTask,
    editTask: this.editTask,
    deleteTask: this.deleteTask,
    changeTaskOrder: this.changeTaskOrder,
    changeTaskStatus: this.changeTaskStatus,
    updateMany: this.updateMany
  };

  componentDidMount() {
    this.getTasks().subscribe();
  }

  render() {
    return <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
  }
}

export { Context as TasksContext };

export default TasksProvider;
