export interface MenuItem {
  name: string;
  title: string;
  icon?: string;
  path?: string;
  order: number;
  subMenu?: MenuItem[];
  disabled?: boolean;
  external?: boolean;
}

export const menuItems: MenuItem[] = [
  {
    name: "dashboard",
    title: "Dashboard",
    icon: "Home",
    path: "/dashboard",
    order: 0,
  },
  {
    name: "ui",
    title: "UI Features",
    icon: "Monitor",
    order: 200,
    subMenu: [
      { name: "ui.typography", title: "Typography", path: "/ui/typography", order: 0 },
      { name: "ui.buttons", title: "Buttons", path: "/ui/buttons", order: 100 },
      { name: "ui.icons", title: "Icons", path: "/ui/icons", order: 200 },
      { name: "ui.modals", title: "Modals", path: "/ui/modals", order: 300 },
      { name: "ui.grid", title: "Grid", path: "/ui/grid", order: 400 },
      { name: "ui.alerts", title: "Alerts", path: "/ui/alerts", order: 500 },
      { name: "ui.progress", title: "Progress Bars", path: "/ui/progress", order: 600 },
      { name: "ui.notifications", title: "Notifications", path: "/ui/notifications", order: 700 },
      { name: "ui.tabs", title: "Tabs & Accordions", path: "/ui/tabs", order: 800 },
      { name: "ui.panels", title: "Panels", path: "/ui/panels", order: 900 },
    ],
  },
  {
    name: "form",
    title: "Form Elements",
    icon: "FileEdit",
    order: 250,
    subMenu: [
      { name: "form.inputs", title: "Form Inputs", path: "/forms/inputs", order: 0 },
      { name: "form.layouts", title: "Form Layouts", path: "/forms/layouts", order: 100 },
      { name: "form.wizard", title: "Form Wizard", path: "/forms/wizard", order: 200 },
    ],
  },
  {
    name: "tables",
    title: "Tables",
    icon: "Grid3X3",
    order: 300,
    subMenu: [
      { name: "tables.basic", title: "Basic Tables", path: "/tables/basic", order: 0 },
      { name: "tables.smart", title: "Smart Tables", path: "/tables/smart", order: 100 },
    ],
  },
  {
    name: "charts",
    title: "Charts",
    icon: "BarChart3",
    path: "/charts",
    order: 350,
  },
  {
    name: "maps",
    title: "Maps",
    icon: "Map",
    path: "/maps",
    order: 400,
  },
  {
    name: "components",
    title: "Components",
    icon: "Layers",
    order: 450,
    subMenu: [
      { name: "components.timeline", title: "Timeline", path: "/components/timeline", order: 0 },
      { name: "components.mail", title: "Mail", path: "/components/mail", order: 100 },
    ],
  },
  {
    name: "pages",
    title: "Pages",
    icon: "FileText",
    order: 500,
    subMenu: [
      { name: "pages.signin", title: "Sign In", path: "/auth/signin", external: true, order: 0 },
      { name: "pages.signup", title: "Sign Up", path: "/auth/signup", external: true, order: 100 },
      { name: "pages.profile", title: "User Profile", path: "/profile", order: 200 },
      { name: "pages.404", title: "404 Page", path: "/404", external: true, order: 300 },
    ],
  },
  {
    name: "menu-level-1",
    title: "Menu Level 1",
    icon: "MoreHorizontal",
    order: 600,
    subMenu: [
      { name: "menu-level-1.1", title: "Menu Level 1.1", disabled: true, order: 0 },
      {
        name: "menu-level-1.2",
        title: "Menu Level 1.2",
        order: 100,
        subMenu: [
          { name: "menu-level-1.2.1", title: "Menu Level 1.2.1", disabled: true, order: 0 },
        ],
      },
    ],
  },
];
