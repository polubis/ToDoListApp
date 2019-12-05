import { TaskEntity, TaskStatusEntity } from 'models/entities';

export const TasksMock: TaskEntity[] = [
  {
    id: 10,
    creationDate: '19/12/2018 13:35',
    name: 'Wynieść śmieci',
    description: 'Są w śmietniku',
    theme: {
      color: '#000000',
      background: '#ffffff'
    },
    statusId: 0
  },
  {
    id: 101,
    creationDate: '19/12/2018 13:35',
    name: 'Znaleźć fajne memy na prezentacje',
    description: '',
    theme: {
      color: '#000000',
      background: '#ffffff'
    },
    statusId: 0
  },
  {
    id: 0,
    creationDate: '19/12/2018 13:35',
    name: 'Poszukać ofert na programiste HTML',
    description: '',
    theme: {
      color: '#000000',
      background: '#ffffff'
    },
    statusId: 0
  },
  {
    id: 1,
    creationDate: '19/12/2018 13:35',
    name: 'Zmienić formatowanie tabami na spacje',
    description: '',
    theme: {
      color: '#000000',
      background: '#ffffff'
    },
    statusId: 0
  },
  {
    id: 2,
    creationDate: '19/12/2018 13:35',
    name: 'Nauczyć się Python from Udemy',
    description: '',
    theme: {
      color: '#000000',
      background: '#ffffff'
    },
    statusId: 0
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
