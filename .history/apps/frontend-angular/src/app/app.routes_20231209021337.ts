import { Route } from '@angular/router';
import { ProjectsComponent } from '@monorepo-take-home-test/ui';
// eslint-disable-next-line @nx/enforce-module-boundaries

export const appRoutes: Route[] = [
    // {path: '', component: ProjectsComponent},
    {path: 'add', component: ProjectsComponent}
];
