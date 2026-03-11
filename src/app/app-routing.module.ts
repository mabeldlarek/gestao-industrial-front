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
      /*{
        path: 'pecas',
        loadComponent: () => import('./demo/pages/peca-register/peca-register').then((c) => c.PecaRegister)
      },*/
      {
        path: 'consumo-pecas-list',
        loadComponent: () => import('./demo/features/estoque/lista/consumo-list').then((c) => c.ConsumoComponent)
      },
      {
        path: 'consumo-create',
        loadComponent: () => import('./demo/features/estoque/formulario/consumo-create').then((c) => c.ConsumoCreate)
      },
      {
        path: 'equipamento-create',
        loadComponent: () => import('./demo/features/ativos/equipamentos/formulario/equipamentos-create').then((c) => c.EquipamentosCreate)
      },
      {
        path: 'equipamentos-list',
        loadComponent: () => import('./demo/features/ativos/equipamentos/lista/equipamentos-list').then((c) => c.EquipamentosComponent)
      },
      {
        path: 'pecas-create',
        loadComponent: () => import('./demo/features/estoque/formulario/pecas-create').then((c) => c.PecasCreate)
      },
      {
        path: 'pecas-list',
        loadComponent: () => import('./demo/features/estoque/lista/pecas-list').then((c) => c.PecasComponent)
      },
      {
        path: 'procedimentos-list',
        loadComponent: () => import('./demo/features/conteudo/lista/procedimentos-list').then((c) => c.ProcedimentosComponent)
      },
      {
        path: 'planos-list',
        loadComponent: () => import('./demo/features/manutencao/planos/planos-list').then((c) => c.PlanosComponent)
      },
      {
        path: 'planos-create',
        loadComponent: () => import('./demo/features/manutencao/planos/planos-create').then((c) => c.PlanosCreate)
      },
      {
        path: 'ordem-list',
        loadComponent: () => import('./demo/features/manutencao/ordens/ordem-list').then((c) => c.OrdemManutencaoComponent)
      },
      {
        path: 'ordem-create',
        loadComponent: () => import('./demo/features/manutencao/ordens/ordem-create').then((c) => c.OrdemManutencaoCreate)
      },
      {
        path: 'execucao-list',
        loadComponent: () => import('./demo/features/manutencao/execucao/execucao-list').then((c) => c.ExecucaoComponent)
      },
      {
        path: 'execucao-create',
        loadComponent: () => import('./demo/features/manutencao/execucao/execucao-create').then((c) => c.ExecucaoCreate)
      },
      {
        path: 'criticidade-create',
        loadComponent: () => import('./demo/features/ativos/equipamentos/formulario/criticidade-create').then((c) => c.CriticidadeCreate)
      },
      {
        path: 'executar',
        loadComponent: () => import('./demo/pages/execucao/execucao').then((c) => c.Execucao)
      },
      {
        path: 'ordem',
        loadComponent: () => import('./demo/pages/ordem/ordem').then((c) => c.Ordem)
      },
      {
        path: 'funcionarios',
        loadComponent: () => import('./demo/listas/funcionarios/funcionarios').then((c) => c.FuncionariosComponent)
      },
      {
        path: 'usuarios',
        loadComponent: () => import('./demo/listas/usuarios/usuarios').then((c) => c.UsuariosComponent)
      },
      {
        path: 'pecas',
        loadComponent: () => import('./demo/listas/pecas/pecas').then((c) => c.PecasComponent)
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
