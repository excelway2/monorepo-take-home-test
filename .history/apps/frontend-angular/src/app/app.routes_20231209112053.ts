import { Route } from '@angular/router';
import { ProjectsComponent } from '@monorepo-take-home-test/ui';
import { AddProjectComponent } from 'libs/ui/src/lib/projects/components/add-project/add-project.component';


export const appRoutes: Route[] = [
    // {path: '', component: ProjectsComponent},
    {path: 'add', component: AddProjectComponent},
    {path: '', component: ProjectsComponent}
];
