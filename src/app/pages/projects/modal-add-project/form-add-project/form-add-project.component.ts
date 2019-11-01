import {Component, OnInit, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'form-add-project',
  templateUrl: './form-add-project.component.html',
  styleUrls: ['./form-add-project.component.scss']
})
export class FormAddProjectComponent implements OnInit {
  title : string = "hello";

  createProjectForm : FormGroup;

  @Output() titleEvent  = new EventEmitter<string>();

  SendTitle() {
    this.titleEvent.emit(this.createProjectForm.value.title);
    this.title = this.createProjectForm.value.title;
    console.log(this.title);
    console.log(this.createProjectForm.value.title);
    console.log("Title sent from child");
  }

  constructor(private formBuilder: FormBuilder) {


    console.log("===================================");
    console.log("===================================");
    console.log("===================================");
  }

  ngOnInit() {
    this.createProjectForm = this.formBuilder.group({
      title: ['Project title'],
    })
  }

  get projectTitle() {
    return this.createProjectForm;
  }
}
