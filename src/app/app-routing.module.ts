import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'usuario',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'agen-alum',
    loadChildren: () => import('./pages/agen-alum/agen-alum.module').then( m => m.AgenAlumPageModule),canActivate:[AuthGuard]
  },
  {
    path: 'logeado',
    loadChildren: () => import('./pages/logeado/logeado.module').then( m => m.LogeadoPageModule),canActivate:[AuthGuard]
  },
  {
    path: 'agen-docen',
    loadChildren: () => import('./pages/agen-docen/agen-docen.module').then( m => m.AgenDocenPageModule),canActivate:[AuthGuard]
  },
  {
    path: 'solicitudes',
    loadChildren: () => import('./pages/solicitudes/solicitudes.module').then( m => m.SolicitudesPageModule),canActivate:[AuthGuard]
  },
  {
    path: 'usuario',
    loadChildren: () => import('./pages/usuario/usuario.module').then( m => m.UsuarioPageModule),canActivate:[AuthGuard]
  },
  {
    path: 'modul-hora',
    loadChildren: () => import('./pages/modul-hora/modul-hora.module').then( m => m.ModulHoraPageModule),canActivate:[AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
