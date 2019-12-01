# Recruitment task

WORK TIME: 8h only, Friday (2h), Saturday (4h), Sunday (2h)

## How to run?

First of all just download repo on your IDE with command git clone __link to repo__. 
Open project on your IDE.

Next type command on your IDE console cd .\todoapp\.
Next step is run npm install command. 
Next step is npm start command.

Application contains 2 routes. For see results of task go to http://localhost:[YOUR PORT = probably 3000]/tasks route.

DONE - you will see results of task.

## Implementations details

WORK TIME: 8h only, Friday (2h), Saturday (4h), Sunday (2h)

This simple app doesn't have any advanced patterns. The application was simple but nevertheless a hook was created that will save a considerable amount of code and time in the future when implementing communication with the API.
In real world application we can implement generic list components, drag and sort component for avoiding boiler plate and maybe generic form component with dedicated hook which allows us to build forms with simple config.

I used the material ui library because thanks to it I don't have to worry about overwriting css classes. In addition, it has great components and defines a simple work pattern for every future developer. I save a lot of time writing custom components that can be susceptible to bugs

I used TypeScript because it allows me to avoid many "typo" bugs and make my development proces easier. In addition, the code gains readability and the design scales better.

I used RxJs lib because this library gives me opportunity to maintain data in streams. I can do something with incoming data in different layers - for example (services - i can cache there data, components - i can assign data to state, providers - allows be to map data or manage them with ContextAPI or FLUX implementation)).

## Improvements plan

This appliction should contain additional layer - called providers. This layer should use Context API to propagate data to nested components. Also providers should contain all needed bussiness logic and can be created by dedicated Higher Order Component.

Providers communicates only with services and propagate data, methods, interface to change data.

# Example of provider

```ts
const Context = React.createContext({
  tasks: [] as TasksEntity[],
  handleGetTasks: () => of([] as TasksEntity[])
});

const TasksProvider: React.FC = ({ children }) => {
  const [tasks, setTasks] = useState<TasksEntity[]>([]);

  const handleGetTasks = () =>
    tasksService.GET.tasks().pipe(
      tap(tasks => setTasks(tasks))
    );

  return (
    <Context.Provider
      value={{
        tasks,
        handleGetTasks
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context as TasksContext };

export default TasksProvider;

```

# Example of generic hook for forms

```ts
import { useState, useCallback } from 'react';

import {
  UseFormReturn,
  FieldsConfig,
  FieldsValues,
  FormState,
  FieldsState,
  extractValuesFromState
} from '..';
import { ValidationStrategy } from '../models/form.models';

export const useForm = <T extends string>(
  fieldsConfig: FieldsConfig<T>,
  onSuccessSubmit: (fieldsValues: FieldsValues<T>) => void,
  cachedValues?: Partial<FieldsValues<T>>,
  validationStrategy: ValidationStrategy = ValidationStrategy.AfterInput
): UseFormReturn<T> => {
  const createFormState = useCallback((fieldsConfig: FieldsConfig<T>): FormState<T> => {
    const keys = Object.keys(fieldsConfig);

    return {
      dirty: validationStrategy === ValidationStrategy.AfterInput,
      errorsOccured: false,
      keys,
      fields: keys.reduce(
        (state, key) => ({
          ...state,
          [key]: {
            value: cachedValues ? (cachedValues.hasOwnProperty(key) ? cachedValues[key] : '') : '',
            error: '',
            fieldkey: key
          }
        }),
        {}
      )
    } as FormState<T>;
  }, []);

  const [state, setState] = useState<FormState<T>>(createFormState(fieldsConfig));

  const handleChange = (e: any, directKey?: T, directValue?: any): void => {
    if (!e) {
      throw new Error('Event object is required');
    }

    const value = directValue !== undefined ? directValue : e.target.value;
    const key =
      directKey !== undefined ? directKey : (e.currentTarget.getAttribute('data-key') as T);

    if (!key) {
      throw new Error('data-key attribute is missing in given template');
    }

    const { validate, connectedWith } = fieldsConfig[key];

    setState(prevState => {
      const fields: FieldsState<T> = {
        ...prevState.fields,
        [key]: {
          ...prevState.fields[key],
          value,
          error: prevState.dirty && validate ? validate(value, prevState.fields) : ''
        }
      };

      if (connectedWith) {
        const { validate } = fieldsConfig[connectedWith];
        fields[connectedWith].error =
          prevState.dirty && validate ? validate(fields[connectedWith].value, fields) : '';
      }

      const checkErrorsOccured = () =>
        prevState.dirty && prevState.keys.some(k => fields[k].error !== '');

      return { ...prevState, fields, errorsOccured: checkErrorsOccured() };
    });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    let errorsOccured = false;

    const fields = state.keys.reduce(
      (currentFields, key) => {
        const { validate } = fieldsConfig[key];
        const error: string = validate ? validate(currentFields[key].value, currentFields) : '';
        errorsOccured = errorsOccured || error !== '';

        return {
          ...currentFields,
          [key]: {
            ...currentFields[key],
            error
          }
        };
      },
      state.fields as FieldsState<T>
    );

    const newState = {
      ...state,
      dirty: true,
      errorsOccured,
      fields
    };

    setState(newState);

    if (!errorsOccured) {
      onSuccessSubmit(extractValuesFromState<T>(newState));
    }
  };

  return {
    state,
    setState,
    handleChange,
    handleSubmit
  };
};

// USAGE 

const {
    state: { fields, errorsOccured },
    handleChange,
    handleSubmit
  } = useForm<TaskEntity>(
    onSuccessSubmit,
    initialState,
    ValidationStrategy.AfterSubmit
  );

```

As you can see building form logic is just few lines of code.

# Persistence

Providers give us some persistence because we have data in one place. But to have them after page reload we need some improvements.
We can use Redux and Redux persist library but this is a simple app. The best option will be using local storage or cookies to have this data cached. Local storage is easier to maintain data with hard structure and can be accessed without not needed parsing like in cookies implementation.


## Deploy

Deployment script (npm run build). 

## What is missing

I don't have time to add RWD to project because of some home duties. 
I hope that it will be taken into account that the whole task was done 8h. I i will have more time i will prepare dedicated designs for this app in Adobe XD program and implement RWD with Material Design breakpoint rules. 
