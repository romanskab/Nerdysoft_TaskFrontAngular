import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {Observable} from 'rxjs';
import {Task} from '../models/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient,
              private config: ConfigService) {
  }

  private UrlCreateTask = this.config.api + '/task/create';
  private UrlGetAllByUserId = this.config.api + '/task/user';
  private UrlDelete = this.config.api + '/task/delete';
  private UrlSave = this.config.api + '/task/save';
  private UrlShare = this.config.api + '/task/share';

  create(task) {
    return this.http.post(this.UrlCreateTask, task);
  }

  getAllByUserId(id): Observable<Task[]> {
    return this.http.get<Task[]>(this.UrlGetAllByUserId + `/${id}`);
  }

  delete(taskId) {
    return this.http.delete(this.UrlDelete + `/${taskId}`);
  }

  save(task: Task) {
    task.user = null;
    task.sender = null;
    return this.http.post(this.UrlSave, task);
  }

  share(task: Task, email: string) {
    return this.http.post(this.UrlShare + `/${task.id}` + `/${email}`, null);
  }
}
