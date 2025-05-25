import { Routes } from '@angular/router';
import { TaskComponentComponent } from './components/task-component/task-component.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path:"",component:LoginComponent},
    {path:"login",component:LoginComponent},
    {path:"tasks",component:TaskComponentComponent,canActivate:[authGuard]}

];
