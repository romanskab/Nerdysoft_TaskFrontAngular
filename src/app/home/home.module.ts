import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {HomeRoutingModule} from './home-routing.module';
import {MaterialModule} from '../material.module';
import { TasksComponent } from './tasks/tasks.component';
import { CreateComponent } from './create/create.component';



@NgModule({
  declarations: [HomeComponent, TasksComponent, CreateComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule
  ]
})
export class HomeModule { }
