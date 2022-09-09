import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactenosComponent } from './contactenos/contactenos.component';
import { DesarrolladorComponent } from './desarrollador/desarrollador.component';
import PreguntasFrecuentesComponent from './preguntas-frecuentes/preguntas-frecuentes.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'contactUs', component: ContactenosComponent },
      { path: 'developer', component: DesarrolladorComponent },
      { path: 'frecuent-questions', component: PreguntasFrecuentesComponent },
      { path: '**', redirectTo: 'contactUs' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FooterRoutingModule { }
