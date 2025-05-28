import { Component, inject } from '@angular/core';
import { TaskServerService } from '../task-server.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { log } from 'console';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private serv=inject(TaskServerService);
     private _snackBar = inject(MatSnackBar);
  constructor(private router:Router){}
  userName: string='';
  userPassword: string='';
  userMail:string='';
  isRegister:boolean=false;
  registerbluePrint={
    name:"",
    email:"",
    password:""
  }

login(){
  let data={
    name:this.userName,
    password:this.userPassword
  }
this.serv.login(data).subscribe({
  next:(data:any)=>{
    if(data!="Invalid credentials" || data!="invalid user."){
localStorage.setItem("id",data.id)
localStorage.setItem("token",data.token)
this.router.navigate(['/tasks'])
  }else{
  this._snackBar.open(data, 'Ok', {
      horizontalPosition: "center",
      verticalPosition:"top",
      duration:1500
    });
  }
},error:(err)=>{
       this._snackBar.open("Invalid Credentials", 'Retry', {
      horizontalPosition: "center",
      verticalPosition:"top",
      duration:1500
    });
         this.userName="";
         this.userPassword="";


    }
})
}
register(){
this.registerbluePrint.name=this.userName;
this.registerbluePrint.email=this.userMail;
this.registerbluePrint.password=this.userPassword;

  this.serv.registerUser(this.registerbluePrint).subscribe((res)=>{
    if(res==="user added successfully."){
      this.isRegister=false;
      this.userName="";
      this.userPassword="";
      this.userMail="";
    }
  })
}
}
