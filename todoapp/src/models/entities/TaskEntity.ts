import { BaseEntity, ThemeEntity } from '.';

export interface TaskEntity extends BaseEntity {
  name: string;
  description: string;
  theme: ThemeEntity;
  statusId?: number;
}