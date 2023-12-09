import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiComponent } from '@monorepo-take-home-test/ui';

@Component({
  standalone: true,
  imports: [ UiComponent, RouterModule ],
  selector: 'monorepo-take-home-test-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend-angular';
}
