import { Routes } from '@angular/router';

const SUFIJO = ' | Memoria del Chaco';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Guerra del Chaco, 1932-1935' + SUFIJO,
    loadComponent: () => import('./pages/inicio').then((m) => m.Inicio),
  },
  {
    path: 'contexto',
    title: 'Contexto' + SUFIJO,
    loadComponent: () => import('./pages/contexto').then((m) => m.Contexto),
  },
  {
    path: 'cronologia',
    title: 'Cronología' + SUFIJO,
    loadComponent: () => import('./pages/cronologia').then((m) => m.Cronologia),
  },
  {
    path: 'batallas',
    title: 'Batallas' + SUFIJO,
    loadComponent: () => import('./pages/batallas').then((m) => m.Batallas),
  },
  {
    path: 'batallas/:id',
    title: 'Batalla' + SUFIJO,
    loadComponent: () => import('./pages/batalla-detalle').then((m) => m.BatallaDetalle),
  },
  {
    path: 'personajes',
    title: 'Personajes' + SUFIJO,
    loadComponent: () => import('./pages/personajes').then((m) => m.Personajes),
  },
  {
    path: 'mediateca',
    title: 'Mediateca' + SUFIJO,
    loadComponent: () => import('./pages/mediateca').then((m) => m.Mediateca),
  },
  {
    path: 'glosario',
    title: 'Glosario' + SUFIJO,
    loadComponent: () => import('./pages/glosario').then((m) => m.Glosario),
  },
  {
    path: 'quiz',
    title: 'Quiz' + SUFIJO,
    loadComponent: () => import('./pages/quiz').then((m) => m.Quiz),
  },
  {
    path: 'buscar',
    title: 'Buscar' + SUFIJO,
    loadComponent: () => import('./pages/buscar').then((m) => m.Buscar),
  },
  {
    path: '**',
    title: 'Página no encontrada' + SUFIJO,
    loadComponent: () => import('./pages/no-encontrada').then((m) => m.NoEncontrada),
  },
];
