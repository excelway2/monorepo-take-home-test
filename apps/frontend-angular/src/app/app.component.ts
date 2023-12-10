import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjectsComponent, UiComponent } from '@monorepo-take-home-test/ui';
import { HeaderComponent } from './header/header.component';
import { CreationFormComponent } from './creation-form/creation-form.component';

@Component({
  standalone: true,
  imports: [RouterModule, UiComponent, HeaderComponent, CreationFormComponent],
  selector: 'monorepo-take-home-test-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
