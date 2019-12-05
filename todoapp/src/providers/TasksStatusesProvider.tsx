import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import React from 'react';
import { TaskStatusEntity } from 'models/entities';
import { TaskStatusFormData } from 'models/form-data';
import TasksStatusesService from 'services/TasksStatusesService';

const Context = React.createContext<State>({
  tasksStatuses: [],
  isLoadingTasksStatuses: false,
  loadingTasksStatusesError: '',
  addTaskStatus: () => of(null),
  deleteTaskStatus: () => of(null),
  editTaskStatus: () => of(null),
  getTasksStatuses: () => of([] as TaskStatusEntity[])
});

interface State {
  tasksStatuses: TaskStatusEntity[];
  isLoadingTasksStatuses: boolean;
  loadingTasksStatusesError: string;
  addTaskStatus(formData: TaskStatusFormData): Observable<TaskStatusEntity | null>;
  deleteTaskStatus(id: number): Observable<TaskStatusEntity | null>;
  editTaskStatus(formData: TaskStatusFormData, id: number): Observable<TaskStatusEntity | null>;
  getTasksStatuses(): Observable<TaskStatusEntity[]>;
}

interface Props {
  children: React.ReactNode;
}

class TasksStatusesProvider extends React.Component<Props, State> {
  addTaskStatus = (formData: TaskStatusFormData) => {
    return TasksStatusesService.POST.status(formData).pipe(
      tap(taskStatus => this.setState({ tasksStatuses: [...this.state.tasksStatuses, taskStatus] })),
      catchError(() => of(null))
    );
  };

  deleteTaskStatus = (id: number) => {
    return TasksStatusesService.DELETE.status(id).pipe(
      tap(() => this.setState({ tasksStatuses: this.state.tasksStatuses.filter(t => t.id !== id) })),
      catchError(() => of(null))
    );
  };

  editTaskStatus = (formData: TaskStatusFormData, id: number) => {
    return TasksStatusesService.PUT.status(formData).pipe(
      tap(task => this.setState({ tasksStatuses: this.state.tasksStatuses.map(t => (t.id === id ? task : t)) })),
      catchError(() => of(null))
    );
  };

  getTasksStatuses = () => {
    if (!this.state.isLoadingTasksStatuses) {
      this.setState({ isLoadingTasksStatuses: true });
    }

    return TasksStatusesService.GET.statuses().pipe(
      tap(tasksStatuses => this.setState({ tasksStatuses, isLoadingTasksStatuses: false, loadingTasksStatusesError: '' })),
      catchError(() => {
        this.setState({ tasksStatuses: [], isLoadingTasksStatuses: false, loadingTasksStatusesError: 'Error occured!' });
        return of([]);
      })
    );
  };

  readonly state: State = {
    tasksStatuses: [],
    isLoadingTasksStatuses: true,
    loadingTasksStatusesError: '',
    addTaskStatus: this.addTaskStatus,
    deleteTaskStatus: this.deleteTaskStatus,
    editTaskStatus: this.editTaskStatus,
    getTasksStatuses: this.getTasksStatuses
  };

  componentDidMount() {
    this.getTasksStatuses().subscribe();
  }

  render() {
    return <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
  }
}

export { Context as TasksStatusesContext };

export default TasksStatusesProvider;
