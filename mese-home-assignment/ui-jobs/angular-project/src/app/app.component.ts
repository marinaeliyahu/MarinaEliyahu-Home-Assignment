import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationbarComponent } from './navigationbar/navigationbar.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationbarComponent, MatSlideToggleModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-project';
}
