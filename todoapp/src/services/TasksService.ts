import BaseService from './BaseService';
import { TaskEntity } from 'models/entities';
import { TasksMock } from '__mocks__/tasksMocks';

class TasksService extends BaseService {
  GET = {
    tasks: () => this.simulate<TaskEntity[]>(TasksMock)
  };
}

export default new TasksService();
