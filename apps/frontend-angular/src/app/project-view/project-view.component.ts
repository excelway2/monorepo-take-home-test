import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'monorepo-take-home-test-project-view',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './project-view.component.html',
  styleUrl: './project-view.component.css',
})
export class ProjectViewComponent implements OnInit {

  constructor(private route : ActivatedRoute) {
  }
  ngOnInit(): void {
    let id : number = this.route.snapshot.params['id'];

  }

}
