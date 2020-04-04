import {Component, OnInit} from '@angular/core';
import {User} from '../../models/User';
import {Task} from 'src/app/models/Task';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {UserService} from '../../services/user.service';
import {Message} from '../../models/ws/Message';
import {TaskService} from '../../services/task.service';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  isTable = true;
  currentUser: User;
  tasks: Task[];

  disabled: boolean;

  private stompClient = null;

  displayedColumns: string[] = ['id', 'description', 'sender', 'edit', 'share', 'delete'];
  dataSource;

  isSharing = false;
  taskForShare: Task;
  email: string;
  message: Message = new Message();

  isEditing = false;
  taskForEdit: Task;

  isError = false;
  isSuccess = false;

  constructor(private userService: UserService,
              private taskService: TaskService,
              private router: Router) {
  }

  ngOnInit() {
    this.userService.currentUserSubject.subscribe(value => {
      this.currentUser = value;
      // this.getAllTask();
      this.dataSource = new MatTableDataSource(this.tasks);
      this.connect();
    });
  }

  getAllTask() {
    this.taskService.getAllByUserId(this.currentUser.id).subscribe(value => {
      this.tasks = value;
      console.log(this.tasks);
    });
  }


  setConnected(connected: boolean) {
    this.disabled = !connected;

    if (connected) {
      this.getAllTask();
    }
  }

  connect() {
    const socket = new SockJS('http://localhost:8080/jsa-stomp-endpoint');
    this.stompClient = Stomp.over(socket);
    const this1 = this;
    this.stompClient.connect({}, (frame) => {
      this1.setConnected(true);
      console.log('Connected: ' + frame);

      this1.stompClient.subscribe('/topic/hi', (task) => {
        this1.updateTask(JSON.parse(task.body));
      });
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
    this.setConnected(false);
    console.log('Disconnected!');
  }

  sendMessage() {
    console.log(this.message);
    this.message.taskId = this.taskForShare.id;
    this.message.description = this.taskForShare.description;
    this.message.senderId = this.currentUser.id;
    this.message.email = this.email;
    this.stompClient.send(
      '/jsa/sendMessage',
      {},
      JSON.stringify(this.message)
    );
  }

  updateTask(newTask) {
    console.log('addTask:');
    console.log(newTask);
    this.disconnect();
    this.getAllTask();
    this.dataSource = new MatTableDataSource(this.tasks);
    this.connect();
  }

  openShare(task: Task) {
    console.log(task);
    this.taskForShare = task;
    this.isSharing = true;
    this.isTable = false;
  }

  share() {
    this.isError = false;
    console.log(this.taskForShare);
    console.log(this.email);
    this.taskService.share(this.taskForShare, this.email).subscribe(value => {
      console.log(value);
      this.sendMessage();
      this.hideSharingWithTimeout();
    }, error1 => {
      this.isError = true;
    });
  }

  delete(task: Task) {
    this.taskService.delete(task.id).subscribe(value => {
      console.log(value);
      this.message.taskId = task.id;
      this.message.description = task.description;
      this.message.senderId = this.currentUser.id;
      this.message.email = this.currentUser.username;
      this.stompClient.send(
        '/jsa/sendMessage',
        {},
        JSON.stringify(this.message)
      );
      this.disconnect();
      this.getAllTask();
      this.dataSource = new MatTableDataSource(this.tasks);
      this.connect();
    });
  }

  edit(task: Task) {
    this.taskForEdit = task;
    this.isEditing = true;
    this.isTable = false;
  }

  save() {
    console.log('save');
    this.taskService.save(this.taskForEdit).subscribe(value => {
      console.log(value);
      this.message.taskId = this.taskForEdit.id;
      this.message.description = this.taskForEdit.description;
      this.message.senderId = this.currentUser.id;
      this.message.email = this.currentUser.username;
      this.stompClient.send(
        '/jsa/sendMessage',
        {},
        JSON.stringify(this.message)
      );
      this.disconnect();
      this.getAllTask();
      this.dataSource = new MatTableDataSource(this.tasks);
      this.connect();
      this.hideEditingWithTimeout();
    }, error1 => {
      this.isError = true;
    });
  }

  hideSharingWithTimeout() {
    this.isSuccess = true;
    setTimeout(() => {
      this.isSharing = false;
      this.isTable = true;
      this.isError = false;
      this.isSuccess = false;
    }, 2000);
  }

  hideEditingWithTimeout() {
    this.isSuccess = true;
    setTimeout(() => {
      this.isEditing = false;
      this.isTable = true;
      this.isError = false;
      this.isSuccess = false;
    }, 2000);
  }

  closeForm() {
    this.isEditing = false;
    this.isSharing = false;
    this.isError = false;
    this.isSuccess = false;
    this.isTable = true;
  }
}
