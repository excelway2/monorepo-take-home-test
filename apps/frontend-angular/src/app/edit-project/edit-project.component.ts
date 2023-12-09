import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import { Project } from '../models/project.model';
import {ActivatedRoute} from "@angular/router";
import {ProjectsService} from "@monorepo-take-home-test/projects";
;

@Component({
  selector: 'monorepo-take-home-test-edit-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.css',
})
export class EditProjectComponent implements OnInit{
  editFromGroup !: FormGroup;
  project !: Project

  constructor(private fb:FormBuilder, private route:ActivatedRoute, private projectsService:ProjectsService) {
  }

  ngOnInit() {
    let id  = this.route.snapshot.params['id'];

  
  }

  onEditProject() {
    let p = this.editFromGroup.value;
    p.id = this.project.id
    this.projectsService.editProject(p.id, p).then(() => console.log("edited"))
  }
}
