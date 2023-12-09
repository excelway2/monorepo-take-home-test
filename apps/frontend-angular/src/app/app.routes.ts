import { Route } from '@angular/router';
import {Component} from "@angular/core";
import {ProjectsComponent} from "@monorepo-take-home-test/ui";

export const appRoutes: Route[] = [
  {path: 'projects', component: ProjectsComponent}
];
