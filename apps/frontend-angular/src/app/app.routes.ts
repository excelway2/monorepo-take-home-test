import { EditProductComponent } from './../../../../libs/ui/src/lib/edit-product/edit-product.component';
import { PageNotFoundComponent } from './../../../../libs/ui/src/lib/page-not-found/page-not-found.component';
import { NewProjectComponent } from './../../../../libs/ui/src/lib/new-project/new-project.component';
import { ViewProjectComponent } from './../../../../libs/ui/src/lib/view-project/view-project.component';
import { Route } from '@angular/router';
import { ProjectsComponent } from '@monorepo-take-home-test/ui';

export const appRoutes: Route[] = [
    { path: 'projects', component: ProjectsComponent },
    { path: 'projects/new', component: NewProjectComponent},
    { path: 'projects/:id', component: ViewProjectComponent },
    { path: 'projects/edit/:id', component: EditProductComponent },
    { path: '**', component: PageNotFoundComponent }
];
