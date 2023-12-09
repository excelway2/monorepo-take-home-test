import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'monorepo-take-home-test-edit-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.css',
})
export class EditProjectComponent implements OnInit{
  ngOnInit(): void {
    console.log("hhello from edit");
    
  }
}
