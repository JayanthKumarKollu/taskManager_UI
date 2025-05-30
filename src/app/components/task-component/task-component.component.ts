import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { TaskServerService } from '../task-server.service';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskDailogComponent } from '../../dailogs/edit-task-dailog/edit-task-dailog.component';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
@Component({
  selector: 'app-task-component',
  standalone: true,
  imports: [MatFormFieldModule,MatDatepickerModule,FormsModule,CommonModule,MatButtonModule,MatInputModule,MatCardModule,MatIconModule],
  templateUrl: './task-component.component.html',
  styleUrl: './task-component.component.scss'
})
export class TaskComponentComponent {
   
  newTask:string="";
  allTasks:any=[];
  taskBluePrint:any={
    name: '',
    completed: false,
    id: '',
    deadline:''
  };
  taskDate:string='';
  taskTime:string='';
  private taskServer = inject(TaskServerService);
  private dialog = inject(MatDialog);
   private _snackBar = inject(MatSnackBar);
constructor( ){}
  ngOnInit(){

    this.gettingAllTasks( localStorage.getItem("id"));

  }
  editTask(param:any){
this.taskBluePrint.id=param;
 let dailogRef = this.dialog.open(EditTaskDailogComponent,{
      data:this.taskBluePrint
    });
    dailogRef.afterClosed().subscribe((res)=>{
      this.gettingAllTasks( localStorage.getItem("id"));
    })
  }
  gettingAllTasks(data:any){
    let val = data
    this.taskServer.getAllTasks(val).subscribe((res)=>{
 if(res!="no data added yet."){
      this.allTasks=res;
 }

    })
  }
  submit(){
     const deadlineISO = new Date(`${this.taskDate}T${this.taskTime}`);
   // this.taskBluePrint.deadline = `${this.taskDate}T${this.taskTime}`;

    this.taskBluePrint.userID = localStorage.getItem("id");
    this.taskBluePrint.name=this.newTask;
    this.taskBluePrint.completed=false;
    this.taskBluePrint.deadline = deadlineISO;


   this.taskServer.addTask(this.taskBluePrint).subscribe({
    next:(data)=>{
  if(data){
      this._snackBar.open('Task Added Successfully.', 'Ok', {
      horizontalPosition: "center",
      verticalPosition:"top",
      duration:1500
    });
     this.gettingAllTasks( localStorage.getItem("id"));
     this.newTask="";
     this.taskDate='';
     this.taskTime="";
    }
    },
    error:(err)=>{
       this._snackBar.open(err.error.msg, 'Retry', {
      horizontalPosition: "center",
      verticalPosition:"top",
      duration:1500
    });
         this.newTask="";


    }

   })
  }
  deleteTask(param:any){
    let snackbarRef = this._snackBar.open("Do you want to delete?","Yes",{
      horizontalPosition:"center",
      verticalPosition:"top",
      duration:3000
    });
    snackbarRef.onAction().subscribe(()=>{
this.taskServer.deleteTask(param).subscribe((res)=>{
this._snackBar.open("Task Deleted Successfully.","Ok",{
   horizontalPosition:"center",
      verticalPosition:"top",
      duration:1500
})
  this.gettingAllTasks( localStorage.getItem("id"));
})
    })

  }

}
