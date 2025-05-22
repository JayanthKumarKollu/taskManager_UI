import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TaskServerService {
 baseURL=environment.baseURL
  constructor(private http:HttpClient) { }

  getAllTasks(){
    return this.http.get(`${this.baseURL}/api/tasks/`)
  }
  addTask(data:any){
    return this.http.post(`${this.baseURL}/api/tasks/`,data)
  }
  updateTask(data:any){
    return this.http.patch(`${this.baseURL}/api/tasks/${data._id}`,data)

  }
  deleteTask(data:any){
    return this.http.delete(`${this.baseURL}/api/tasks/${data}`);
  }
  getTaskById(data:any){
    return this.http.get(`${this.baseURL}/api/tasks/${data}`)
  }
}
