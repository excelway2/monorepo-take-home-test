import { Route } from '@angular/router';
// import { ProjectsComponent } from '@monorepo-take-home-test/ui';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AddProjectComponent } from 'libs/ui/src/lib/projects/components/add-project.component';

export const appRoutes: Route[] = [
    // {path: '', component: ProjectsComponent},
    {path: 'add', component: AddProjectComponent}
];
