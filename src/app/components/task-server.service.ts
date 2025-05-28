import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TaskServerService {
 baseURL=environment.baseURL;


  constructor(private http:HttpClient) { }

  getAllTasks(data:any){
    return this.http.get(`${this.baseURL}/api/tasks/loggeduser/${data}`)
  }
  addTask(data:any){
    return this.http.post(`${this.baseURL}/api/tasks/`,data)
  }
  updateTask(data:any){
    return this.http.patch(`${this.baseURL}/api/tasks/loggeduser/${data._id}`,data)

  }
  deleteTask(data:any){
    return this.http.delete(`${this.baseURL}/api/tasks/loggeduser/${data}`);
  }
  getTaskById(data:any){
    return this.http.get(`${this.baseURL}/api/tasks/updateItem/${data}`)
  }

  login(data:any){
    return this.http.post(`${this.baseURL}/api/login/authenticate/`,data)
  }
  registerUser(data:any){
    return this.http.post(`${this.baseURL}/api/login/`,data)
  }
}
