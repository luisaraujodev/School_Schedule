import { ipcRenderer, MenuItemConstructorOptions } from 'electron';

const MenuTemplate: MenuItemConstructorOptions[] = [
  {
    label: 'Arquivo',
    submenu: [
      {
        label: 'Nova Janela',
        accelerator: 'CommandOrControl+N',
        click: (): void => {
          ipcRenderer.send("action-menu", "new Windows");
        },
      },
      { label: 'Nova Guia', accelerator: 'CommandOrControl+T' },
      { label: 'Fechar Guia', accelerator: 'CommandOrControl+W' },
      {
        label: 'Deslogar',
      },
      { role: 'quit' },
    ],
  }, {
    label: 'Ver',
    submenu: [
      {
        label: 'Aparência',
        submenu: [
          {
            label: 'Claro',
            click: (): void => {
              ipcRenderer.send("action-menu", "appearance-light");
            },
          }, {
            label: 'Escuro',
            click: (): void => {
              ipcRenderer.send("action-menu", "appearance-dark");
            },
          },
        ],
      },
    ],
  }, {
    label: 'Ajuda',
  },
];

export default MenuTemplate;
