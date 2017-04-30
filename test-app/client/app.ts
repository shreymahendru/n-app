import { ClientApp } from "./../../src/index";
import { ScoreBoardViewModel } from "./components/score-board/score-board-view-model";
import { ComponentInstaller, Registry } from "n-ject";
import { InmemoryTodoRepository } from "./services/todo-repository/inmemory-todo-repository";
import { DashboardViewModel } from "./pages/dashboard/dashboard-view-model";
import { TodoViewModel } from "./pages/todo/todo-view-model";
import { ListTodosViewModel } from "./pages/todo/list-todos/list-todos-view-model";
import { CreateTodoViewModel } from "./pages/todo/create-todo/create-todo-view-model";
import { UpdateTodoViewModel } from "./pages/todo/update-todo/update-todo-view-model";
import * as Routes from "./pages/routes";


class Installer implements ComponentInstaller
{
    public install(registry: Registry): void
    {
        registry.registerSingleton("TodoRepository", InmemoryTodoRepository);
    }
}    

const pages = [DashboardViewModel, TodoViewModel, ListTodosViewModel, CreateTodoViewModel, UpdateTodoViewModel];

const app = new ClientApp("#app")
    .enableDevMode()    
    .useInstaller(new Installer())
    .registerComponents(ScoreBoardViewModel)
    .registerPages(...pages)
    .useAsInitialRoute(Routes.dashboard)
    .useAsUnknownRoute(Routes.todo)
    ;
    
app.bootstrap();