import { Route } from '@angular/router';
import {Component} from "@angular/core";
import {ProjectsComponent} from "@monorepo-take-home-test/ui";
import {ProjectViewComponent} from "./project-view/project-view.component";
import {EditProjectComponent} from "./edit-project/edit-project.component";

export const appRoutes: Route[] = [
  {path: 'projects', component: ProjectsComponent},
  {path: 'projects/view/:id', component: ProjectViewComponent},
  {path: 'projects/edit/:id', component: EditProjectComponent}
];
