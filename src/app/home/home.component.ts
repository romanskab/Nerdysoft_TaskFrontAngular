import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {User} from '../models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User;

  constructor(private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(value => {
      console.log(value);
      this.user = value;
      this.userService.currentUserSubject.next(value);
      this.toTasks();
    }, error1 => {
      this.router.navigate(['auth', 'login']);
    });
  }

  toTasks() {
    this.router.navigate(['home', 'tasks']);
  }

  toCreate() {
    this.router.navigate(['home', 'create']);
  }

  exit() {
    localStorage.removeItem('token');
    this.router.navigate(['auth', 'login']);
  }
}
