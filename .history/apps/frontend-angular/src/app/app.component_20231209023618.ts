import { Component } from '@angular/core';
import { RouterModule, RouterLink, RouterOutlet } from '@angular/router';
import { UiComponent } from '@monorepo-take-home-test/ui';

@Component({
  standalone: true,
  imports: [RouterModule, UiComponent, RouterLink, RouterOutlet ],
  selector: 'monorepo-take-home-test-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend-angular';
}
