import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Registro', url: '/registro', icon: 'mail' },
    { title: 'Inscripciones', url: '/inscripcion', icon: 'paper-plane' },
    { title: 'Llegada', url: '/llegada', icon: 'heart' },
    { title: 'Resultados', url: '/resultados', icon: 'archive' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
