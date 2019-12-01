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

# Persistence

Providers give us some persistence because we have data in one place. But to have them after page reload we need some improvements.
We can use Redux and Redux persist library but this is a simple app. The best option will be using local storage or cookies to have this data cached. Local storage is easier to maintain data with hard structure and can be accessed without not needed parsing like in cookies implementation.


## Deploy

Deployment script (npm run build). 

## What is missing

I don't have time to add RWD to project because of some home duties. 
I hope that it will be taken into account that the whole task was done 8h. I i will have more time i will prepare dedicated designs for this app in Adobe XD program and implement RWD with Material Design breakpoint rules. 
