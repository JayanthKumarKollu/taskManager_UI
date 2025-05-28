import { Component, inject, signal, Signal } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { TaskServerService } from '../../components/task-server.service';
@Component({
  selector: 'app-edit-task-dailog',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule,MatDialogModule,MatCheckboxModule],
  templateUrl: './edit-task-dailog.component.html',
  styleUrl: './edit-task-dailog.component.scss'
})
export class EditTaskDailogComponent {
  taskName="";
  isCompleted=false;
  dailogRef = inject(MatDialogRef<EditTaskDailogComponent>);
   data = inject(MAT_DIALOG_DATA);
private taskServer = inject(TaskServerService);
ngOnInit(){
  this.taskServer.getTaskById(this.data.id).subscribe((res)=>{
    this.data=res;
this.taskName=this.data.name;
this.isCompleted=this.data.completed
  })

}

  updateTask(){

    this.data.name=this.taskName;
    this.data.completed=this.isCompleted;
    this.taskServer.updateTask(this.data).subscribe((res)=>{
      this.dailogRef.close()
    })

  }
  isChecked(){
this.isCompleted = this.isCompleted ? false : true
  }
 


}
