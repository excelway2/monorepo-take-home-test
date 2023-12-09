import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '@prisma/client';

@Component({
  selector: 'monorepo-take-home-test-view-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-project.component.html',
  styleUrl: './view-project.component.css',
})
export class ViewProjectComponent {
  @Input() projectSelected: Project = {} as Project;

  @Input() modalVisibleView:boolean=false;
 
  quitModal(){
    this.modalVisibleView=false;
      }
      stopClosingModal(event:Event){
        event.stopPropagation();
      }
}
