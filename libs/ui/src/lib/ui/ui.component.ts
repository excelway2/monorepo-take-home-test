import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from '../projects/projects.component';
import { AddModalProjectComponent } from '../add-modal-project/add-modal-project.component';

@Component({
  selector: 'monorepo-take-home-test-ui',
  standalone: true,
  imports: [CommonModule, ProjectsComponent,AddModalProjectComponent],
  templateUrl: './ui.component.html',
  styleUrl: './ui.component.css',
})
export class UiComponent {
  modalVisible:boolean=false;
  visible(){
    this.modalVisible=!this.modalVisible;
  }
}
