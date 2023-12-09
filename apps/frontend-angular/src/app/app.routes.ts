import { Route, RouterModule } from '@angular/router';
import { ProjectFormComponent } from 'libs/ui/src/lib/lib-components/project-form/project-form.component';
import { NgModule } from '@angular/core';

export const appRoutes: Route[] = [
  { path: 'project-form', component: ProjectFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' })],
})
export class AppRoutingModule {}