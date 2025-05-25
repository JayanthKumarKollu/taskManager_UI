import { Component, inject } from '@angular/core';
import { TaskServerService } from '../task-server.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { log } from 'console';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private serv=inject(TaskServerService);
  constructor(private router:Router){}
  userName: any;
  userPassword: any;
login(){
  let data={
    name:this.userName,
    password:this.userPassword
  }
this.serv.login(data).subscribe((res:any)=>{
localStorage.setItem("id",res)
this.router.navigate(['/tasks'])
})
}
}
