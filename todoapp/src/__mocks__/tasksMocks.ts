import { TaskEntity, TaskStatusEntity } from 'models/entities';

export const TasksMock: TaskEntity[] = [
  {
    id: 0,
    creationDate: '19/12/2018 13:35',
    name: 'Learn Angular JS',
    description: 'I should learn Angular JS because of curiosity',
    theme: {
      color: '#000000',
      background: '#ffffff'
    },
    statusId: 0
  },
  {
    id: 1,
    creationDate: '19/12/2018 13:35',
    name: 'Learn HTML 5',
    description: 'I should learn Angular JS because of curiosity',
    theme: {
      color: '#000000',
      background: '#ffffff'
    },
    statusId: 0
  },
  {
    id: 2,
    creationDate: '19/12/2018 13:35',
    name: 'Learn CSS',
    description: 'I should learn Angular JS because of curiosity',
    theme: {
      color: '#000000',
      background: '#ffffff'
    },
    statusId: 0
  },
  {
    id: 3,
    creationDate: '19/12/2018 13:35',
    name: 'Learn React JS',
    description: 'I should learn Angular JS because of curiosity',
    theme: {
      color: '#000000',
      background: '#ffffff'
    }
  },
  {
    id: 4,
    creationDate: '19/12/2018 13:35',
    name: 'Learn JS',
    description: 'I should learn Angular JS because of curiosity',
    theme: {
      color: '#000000',
      background: '#ffffff'
    },
    statusId: 1
  }
];

export const TasksStatusesMock: TaskStatusEntity[] = [
  {
    id: 0,
    creationDate: '19/12/2018 13:35',
    name: 'To do',
    theme: {
      color: '#ffffff',
      background: '#f44336'
    }
  },
  {
    id: 1,
    creationDate: '19/12/2018 13:35',
    name: 'In progress',
    theme: {
      color: '#ffffff',
      background: '#3f51b5'
    }
  },
  {
    id: 2,
    creationDate: '19/12/2018 13:35',
    name: 'Done',
    theme: {
      color: '#ffffff',
      background: '#009688'
    }
  }
];
