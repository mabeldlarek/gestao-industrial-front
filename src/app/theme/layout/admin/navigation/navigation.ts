export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
}
export const NavigationItems: NavigationItem[] = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard',
        icon: 'feather icon-home',
        classes: 'nav-item'
      }
    ]
  },
  {
    id: 'ui-element',
    title: 'UI ELEMENT',
    type: 'group',
    icon: 'icon-ui',
    children: [
      {
        id: 'basic',
        title: 'Component',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'button',
            title: 'Button',
            type: 'item',
            url: '/basic/button'
          },
          {
            id: 'badges',
            title: 'Badges',
            type: 'item',
            url: '/basic/badges'
          },
          {
            id: 'breadcrumb-pagination',
            title: 'Breadcrumb & Pagination',
            type: 'item',
            url: '/basic/breadcrumb-paging'
          },
          {
            id: 'collapse',
            title: 'Collapse',
            type: 'item',
            url: '/basic/collapse'
          },
          {
            id: 'tabs-pills',
            title: 'Tabs & Pills',
            type: 'item',
            url: '/basic/tabs-pills'
          },
          {
            id: 'typography',
            title: 'Typography',
            type: 'item',
            url: '/basic/typography'
          }
        ]
      }
    ]
  },
  {
    id: 'forms',
    title: 'Forms & Tables',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'forms-element',
        title: 'Form Elements',
        type: 'item',
        url: '/forms',
        classes: 'nav-item',
        icon: 'feather icon-file-text'
      },
      {
        id: 'tables',
        title: 'Tables',
        type: 'item',
        url: '/tables',
        classes: 'nav-item',
        icon: 'feather icon-server'
      }
    ]
  },
  {
    id: 'chart-maps',
    title: 'Chart',
    type: 'group',
    icon: 'icon-charts',
    children: [
      {
        id: 'apexChart',
        title: 'ApexChart',
        type: 'item',
        url: 'apexchart',
        classes: 'nav-item',
        icon: 'feather icon-pie-chart'
      }
    ]
  },
  {
    id: 'pages',
    title: 'Pages',
    type: 'group',
    icon: 'icon-pages',
    children: [
      {
        id: 'auth',
        title: 'Cadastros',
        type: 'collapse',
        icon: 'feather icon-lock',
        children: [
          {
            id: 'Usuário',
            title: 'Usuário',
            type: 'item',
            url: '/register',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'Login',
            title: 'Login',
            type: 'item',
            url: '/login',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'Funcionário',
            title: 'Funcionário',
            type: 'item',
            url: '/funcionario',
            classes: 'nav-item',
          }
        ]
      },
       {
        id: 'ativos',
        title: 'Ativos',
        type: 'collapse',
        icon: 'feather icon-lock',
        children: [
          {
            id: 'Equipamento',
            title: 'Equipamentos',
            type: 'item',
            url: '/equipamentos',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'Criticidade',
            title: 'Criticidade',
            type: 'item',
            url: '/criticidade',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'Medidor',
            title: 'Medidores',
            type: 'item',
            url: '/medidores',
            classes: 'nav-item',
          }
        ]
      },
       {
        id: 'estoque',
        title: 'Estoque',
        type: 'collapse',
        icon: 'feather icon-lock',
        children: [
          {
            id: 'peca',
            title: 'Peças',
            type: 'item',
            url: '/pecas',
            target: true,
            breadcrumbs: false
          }
        ]
      },
             {
        id: 'manutencao',
        title: 'Manutenção',
        type: 'collapse',
        icon: 'feather icon-lock',
        children: [
          {
            id: 'plano',
            title: 'Planos',
            type: 'item',
            url: '/planos',
            target: true,
            breadcrumbs: false
          },          
          {
            id: 'ordem',
            title: 'Ordens',
            type: 'item',
            url: '/ordens',
            classes: 'nav-item',
          },
          {
            id: 'execucao',
            title: 'Executar',
            type: 'item',
            url: '/executar',
            target: true,
            breadcrumbs: false
          }
        ]
      },
      {
        id: 'procedimento',
        title: 'Procedimentos',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'feather icon-sidebar'
      },
      {
        id: 'sample-page',
        title: 'Sample Page',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'feather icon-sidebar'
      },
      {
        id: 'disabled-menu',
        title: 'Disabled Menu',
        type: 'item',
        url: 'javascript:void(0)',
        classes: 'nav-item disabled',
        icon: 'feather icon-power',
        external: true
      },
      {
        id: 'buy_now',
        title: 'Buy Now',
        type: 'item',
        icon: 'feather icon-book',
        classes: 'nav-item',
        url: 'https://codedthemes.com/item/datta-able-angular/',
        target: true,
        external: true
      }
    ]
  }
];
