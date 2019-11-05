import {
  AfterViewInit,
  Component,
  Inject,
  forwardRef,
  ElementRef,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  ViewChildren, QueryList
} from '@angular/core';
import {FormAddProjectComponent} from "./form-add-project/form-add-project.component";
import {NgbModal, NgbModalConfig, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup} from "@angular/forms";
import {Project, ProjectInterface} from "../../../models/project";
import {ProjectHttpService} from "../../../services/project-http.service";

@Component({
  selector: 'modal-add-project',
  templateUrl: './modal-add-project.component.html',
  styleUrls: ['./modal-add-project.component.scss'],
  providers: [NgbModal, NgbModalConfig]
})
export class ModalAddProjectComponent implements OnInit {

  projectTitle: string;
  public dialogRef: NgbModalRef;

  receiveTitle($event) {
    this.projectTitle = $event;
  }

  @ViewChild(FormAddProjectComponent, {static: true}) child;


  @ViewChild("modalAddProject", {static: false})
  modalAddProject: ElementRef;


  @Output() public newProject: EventEmitter<ProjectInterface> = new EventEmitter<ProjectInterface>();

  constructor(
    private projectHttpService: ProjectHttpService,
    private config: NgbModalConfig,
    public modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() { }


  submitCreateProjectForm() {
    const project: Project = new Project(null, this.projectTitle, null);
    this.projectHttpService.createProject(project).subscribe(
      result => {
        let project = new Project(result.id, result.title);
        this.newProject.emit(project);
        this.closeModal(project);
      }
    );
  }

  open() {
    this.dialogRef = this.modalService.open(this.modalAddProject);
  }

  closeModal(data = null) {
    this.dialogRef.close(data);
  }
}
