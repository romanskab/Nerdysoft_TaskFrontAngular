import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TaskService} from '../../services/task.service';
import {Task} from '../../models/Task';
import {User} from '../../models/User';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  task: Task = new Task();
  isError = false;
  isSuccess = false;

  constructor(private router: Router,
              private taskService: TaskService) {
  }

  ngOnInit() {
  }

  create() {
    this.taskService.create(this.task).subscribe(value => {
      console.log(value);
      this.navigateToTasksWithTimeout();
    }, error1 => {
      this.isError = true;
    });
  }

  navigateToTasksWithTimeout() {
    this.isSuccess = true;
    setTimeout(() => {
      this.router.navigate(['home', 'tasks']);
    }, 2000);
  }
}
