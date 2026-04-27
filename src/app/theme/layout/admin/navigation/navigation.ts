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
        title: 'Identidade e Acesso',
        type: 'collapse',
        icon: 'feather icon-lock',
        children: [
          {
            id: 'Usuários',
            title: 'Usuários',
            type: 'item',
            url: '/usuarios-list',
            classes: 'nav-item',
          },
          {
            id: 'Funcionários',
            title: 'Funcionários',
            type: 'item',
            url: '/funcionario-list',
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
            id: 'Lista de Equipamentos',
            title: 'Lista de Equipamentos',
            type: 'item',
            url: '/equipamentos-list',

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
            url: '/pecas-list',
            classes: 'nav-item',
          },
          {
            id: 'peca-consumo',
            title: 'Consumo de Peças',
            type: 'item',
            url: '/consumo-pecas-list',
            classes: 'nav-item',
          },
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
            url: '/planos-list',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'ordem',
            title: 'Ordens',
            type: 'item',
            url: '/ordem-list',
            classes: 'nav-item',
          },
          {
            id: 'execucao',
            title: 'Executar',
            type: 'item',
            url: '/execucao-list',
            target: false,
            breadcrumbs: false
          }
        ]
      },
      {
        id: 'procedimento',
        title: 'Procedimentos',
        type: 'collapse',
        icon: 'feather icon-lock',
        children: [
          {
            id: 'procedimentos',
            title: 'Lista de Procedimentos',
            type: 'item',
            url: '/procedimentos-list',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'procedimentos',
            title: 'Cadastro de Procedimentos',
            type: 'item',
            url: '/procedimentos-create',
            target: false,
            breadcrumbs: false
          },
        ]
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
