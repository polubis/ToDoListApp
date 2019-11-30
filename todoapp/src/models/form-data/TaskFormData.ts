import { TaskEntity } from 'models/entities';

export interface TaskFormData extends Omit<TaskEntity, 'id' | 'creationDate' | 'modificationDate'> {}
