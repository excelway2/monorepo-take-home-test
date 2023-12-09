import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiComponent } from '@monorepo-take-home-test/ui';
import { NavbarComponent } from 'libs/ui/src/lib/projects/components/shared/navbar/navbar.component';

@Component({
  standalone: true,
  imports: [ UiComponent, RouterModule, NavbarComponent ],
  selector: 'monorepo-take-home-test-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend-angular';
}
