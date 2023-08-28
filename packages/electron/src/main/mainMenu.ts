import { Menu } from 'electron';

const MainMenu = (mainWindow) => {
  const template = [];
  // mainWindow.excludedFromShownWindowsMenu = true;
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};

export default MainMenu;
