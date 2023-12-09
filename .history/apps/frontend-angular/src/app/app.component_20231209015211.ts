import { appRoutes } from './../../../../.history/apps/frontend-angular/src/app/app.routes_20231208010716';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiComponent } from '@monorepo-take-home-test/ui';

@Component({
  standalone: true,
  imports: [RouterModule.forRoot(appRoutes), UiComponent],
  selector: 'monorepo-take-home-test-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend-angular';
}
