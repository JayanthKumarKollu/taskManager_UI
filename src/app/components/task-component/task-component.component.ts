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
import { Console, error } from 'console';
@Component({
  selector: 'app-task-component',
  standalone: true,
  imports: [FormsModule,CommonModule,MatButtonModule,MatInputModule,MatCardModule,MatIconModule],
  templateUrl: './task-component.component.html',
  styleUrl: './task-component.component.scss'
})
export class TaskComponentComponent {
   
  newTask:string="";
  allTasks:any=[];
  taskBluePrint={
    name: '',
    completed: false,
    id: ''
  };
  private taskServer = inject(TaskServerService);
  private dialog = inject(MatDialog);
   private _snackBar = inject(MatSnackBar);
constructor( ){}
  ngOnInit(){
    console.log("blue print",this.taskBluePrint)
    this.gettingAllTasks();
  }
  editTask(param:any){
this.taskBluePrint.id=param;
 let dailogRef = this.dialog.open(EditTaskDailogComponent,{
      data:this.taskBluePrint
    });
    dailogRef.afterClosed().subscribe((res)=>{
      this.gettingAllTasks();
    })
  }
  gettingAllTasks(){
    this.taskServer.getAllTasks().subscribe((res)=>{
      console.log("result",res
      );
      this.allTasks=res;
    console.log(this.allTasks.items)
    })
  }
  submit(){
    this.taskBluePrint.name=this.newTask;
    this.taskBluePrint.completed=false;
   this.taskServer.addTask(this.taskBluePrint).subscribe({
    next:(data)=>{
  if(data){
      this._snackBar.open('Task Added Successfully.', 'Ok', {
      horizontalPosition: "center",
      verticalPosition:"top",
      duration:1500
    });
     this.gettingAllTasks();
     this.newTask="";
    }
    },
    error:(err)=>{
      console.log("error",err)
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
  this.gettingAllTasks();
})
    })

  }

}
