import { BaseEntity, ThemeEntity } from '.';

export interface TaskStatusEntity extends BaseEntity {
  name: string;
  theme: ThemeEntity;
}
