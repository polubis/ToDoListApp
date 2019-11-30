import BaseService from './BaseService';
import { TaskEntity } from 'models/entities';
import { TaskFormData } from 'models/form-data';
import { TasksMock } from '__mocks__/tasksMocks';

class TasksService extends BaseService {
  GET = {
    tasks: () => this.simulate<TaskEntity[]>(TasksMock)
  };

  POST = {
    task: (formData: TaskFormData) => this.simulate<TaskEntity>({ id: Math.random(), ...formData })
  };
}

export default new TasksService();
