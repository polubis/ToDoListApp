import BaseService from './BaseService';
import { FORMATS } from 'shared/utils/dateAndTime';
import { TaskStatusEntity } from 'models/entities';
import { TaskStatusFormData } from 'models/form-data';
import { TasksStatusesMock } from '__mocks__/tasksMocks';
import moment from 'moment';

class TasksStatusesService extends BaseService {
  GET = {
    statuses: () => this.simulate<TaskStatusEntity[]>(TasksStatusesMock)
  };

  POST = {
    status: (formData: TaskStatusFormData) =>
      this.simulate<TaskStatusEntity>({ id: Math.random(), creationDate: moment().format(FORMATS.STANDARD), ...formData })
  };

  PUT = {
    status: (formData: TaskStatusFormData) => this.simulate<TaskStatusEntity>({ ...formData })
  };

  DELETE = {
    status: (id: number) => this.simulate<null>(null)
  };
}

export default new TasksStatusesService();
