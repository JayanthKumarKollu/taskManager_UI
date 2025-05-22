import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskDailogComponent } from './edit-task-dailog.component';

describe('EditTaskDailogComponent', () => {
  let component: EditTaskDailogComponent;
  let fixture: ComponentFixture<EditTaskDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTaskDailogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTaskDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
