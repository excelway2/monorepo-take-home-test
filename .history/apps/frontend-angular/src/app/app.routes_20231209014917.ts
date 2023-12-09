import { Route } from '@angular/router';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AddProjectComponent } from 'libs/ui/src/lib/projects/components/add-project.component';

export const appRoutes: Route[] = [
    {path:'add', component: AddProjectComponent}
];
