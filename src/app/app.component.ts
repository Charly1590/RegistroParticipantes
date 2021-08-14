import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Registro', url: '/registro', icon: 'list' },
    { title: 'Inscripciones', url: '/inscripcion', icon: 'person-add' },
    { title: 'Llegada', url: '/llegada', icon: 'speedometer' },
    { title: 'Resultados', url: '/resultados', icon: 'ribbon' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
