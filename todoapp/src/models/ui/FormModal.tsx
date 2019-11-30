export interface FormModal<T> {
  isOpen?: boolean;
  payload?: T | null;
}

export interface FormModalSuccessResponsePayload<T> {
  data: T;
  operation: FormModalOperations;
}

export enum FormModalOperations {
  ADD = 'ADD',
  EDIT = 'EDIT'
}
