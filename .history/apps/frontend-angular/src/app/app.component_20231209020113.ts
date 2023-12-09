import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjectsComponent, UiComponent } from '@monorepo-take-home-test/ui';

@Component({
  standalone: true,
  imports: [RouterModule, UiComponent, ProjectsComponent],
  selector: 'monorepo-take-home-test-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend-angular';
}
