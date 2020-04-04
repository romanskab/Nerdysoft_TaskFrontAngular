import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';
import {TasksComponent} from './tasks/tasks.component';
import {CreateComponent} from './create/create.component';

const routes: Routes = [
  {path: '', component: HomeComponent, children: [
      {path: 'tasks', component: TasksComponent},
      {path: 'create', component: CreateComponent},
    ]}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
