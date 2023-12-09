/* eslint-disable @nx/enforce-module-boundaries */
import { EditProjectComponent } from './../../../../libs/ui/src/lib/projects/components/edit-project/edit-project.component';
import { Route } from '@angular/router';
import { ProjectsComponent } from '@monorepo-take-home-test/ui';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AddProjectComponent } from 'libs/ui/src/lib/projects/components/add-project/add-project.component';


export const appRoutes: Route[] = [
    // {path: '', component: ProjectsComponent},
    {path: 'add', component: AddProjectComponent},
    {path: 'edit', component: EditProjectComponent},
    {path: '', component: ProjectsComponent}
];
