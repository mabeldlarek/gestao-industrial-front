import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// project import
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./demo/dashboard/dashboard.component').then((c) => c.DashboardComponent)
      },
      {
        path: 'basic',
        loadChildren: () => import('./demo/ui-elements/ui-basic/ui-basic.module').then((m) => m.UiBasicModule)
      },
      {
        path: 'forms',
        loadComponent: () => import('./demo/pages/form-element/form-element').then((c) => c.FormElement)
      },
      {
        path: 'tables',
        loadComponent: () => import('./demo/pages/tables/tbl-bootstrap/tbl-bootstrap.component').then((c) => c.TblBootstrapComponent)
      },
      {
        path: 'apexchart',
        loadComponent: () => import('./demo/pages/core-chart/apex-chart/apex-chart.component').then((c) => c.ApexChartComponent)
      },
      {
        path: 'form-element',
        loadComponent: () => import('./demo/pages/form-element/form-element').then((c) => c.FormElement)
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/extra/sample-page/sample-page.component').then((c) => c.SamplePageComponent)
      },
      {
        path: 'funcionario',
        loadComponent: () => import('./demo/pages/authentication/funcionario-register/funcionario-register').then((c) => c.FuncionarioRegister)
      },
      {
        path: 'pecas',
        loadComponent: () => import('./demo/pages/peca-register/peca-register').then((c) => c.PecaRegister)
      },
      {
        path: 'consumo-pecas',
        loadComponent: () => import('./demo/pages/peca-register/peca-register').then((c) => c.PecaRegister)
      },
      {
        path: 'equipamento-register',
        loadComponent: () => import('./demo/pages/equipamento-register/equipamento-register').then((c) => c.EquipamentoRegister)
      },
      {
        path: 'plano-register',
        loadComponent: () => import('./demo/pages/plano-register/plano-register').then((c) => c.PlanoRegister)
      },
      {
        path: 'executar',
        loadComponent: () => import('./demo/pages/execucao/execucao').then((c) => c.Execucao)
      },
      {
        path: 'ordem',
        loadComponent: () => import('./demo/pages/ordem/ordem').then((c) => c.Ordem)
      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./demo/pages/authentication/auth-signin/auth-signin.component').then((c) => c.AuthSigninComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./demo/pages/authentication/auth-signup/auth-signup.component').then((c) => c.AuthSignupComponent)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
