import BaseService from './BaseService';
import { FORMATS } from 'shared/utils/dateAndTime';
import { TaskEntity } from 'models/entities';
import { TaskFormData } from 'models/form-data';
import { TasksMock } from '__mocks__/tasksMocks';
import moment from 'moment';

class TasksService extends BaseService {
  GET = {
    tasks: () => this.simulate<TaskEntity[]>(TasksMock)
  };

  POST = {
    task: (formData: TaskFormData) =>
      this.simulate<TaskEntity>({ id: Math.random(), creationDate: moment().format(FORMATS.STANDARD), ...formData })
  };

  PUT = {
    task: (formData: TaskFormData) => this.simulate<TaskEntity>({ ...formData }),
    taskOrder: (oldIndex: number, newIndex: number) => this.simulate<TaskEntity[]>([]),
    taskStatus: (taskId: number, taskStatusId: number) => this.simulate<null>(null)
  };

  DELETE = {
    task: (id: number) => this.simulate<null>(null)
  };
}

export default new TasksService();
