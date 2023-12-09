import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectModel } from '../Project.model';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ProjectsService } from '../projects.service';
import { Observable, map } from 'rxjs';


@Component({
  selector: 'monorepo-take-home-test-add-modal-project',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule ],
  templateUrl: './add-modal-project.component.html',
  styleUrl: './add-modal-project.component.css',
})
export class AddModalProjectComponent implements OnInit  {

  @Input() modalVisible:boolean=false;
  priorityExpended:boolean=false;
  orderExist!:boolean;
  titleExist!:boolean;
  projectForm:FormGroup=new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    priority: new FormControl('', Validators.required),
    order: new FormControl('',Validators.required)
  })
  constructor(private projectService:ProjectsService){

  }
  quitModal(){
this.modalVisible=false;
  }
  ngOnInit() {
    
  }
  stopClosingModal(event:Event){
    event.stopPropagation();
  }

  checkIfOrderExist(order: string) {
    this.projectService.checkOrderIfExist(parseInt(order)).subscribe(
      (exists) => {
        if (exists) {
          this.orderExist=true;
          console.log("wwwwwwwwwwwwwwww")
        } else {
          this.orderExist=false
          console.log("nnnnnnnnnnnnnn")
        }
      },
      (error) => {
        console.error('Error checking order existence:', error);
      }
    );
  }
  checkIfTitleExist(title: string) {
    this.projectService.checkTitleIfExist(title).subscribe(
      (exists) => {
        if (exists) {
          this.titleExist=true;
          console.log("wwwwwwwwwwwwwwww title")
        } else {
          this.titleExist=false
          console.log("nnnnnnnnnnnnnn title")
        }
      },
      (error) => {
        console.error('Error checking Title existence:', error);
      }
    );
  }

  onSubmit(){
    console.log("sssssssssssss")
    if(this.projectForm.valid && this.orderExist==false){
      
      this.projectService.createProject(
        new ProjectModel(
          this.projectForm.get('title')?.value 
          ,this.projectForm.get('description')?.value,
          this.projectForm.get('priority')?.value,this.projectForm.get('order')?.value)
        ).subscribe(
          {
            
  error(err) {
    console.error("Error createFacture :",err);
    
  },
          }
        )
    }
    
  }
}
