import React, { useEffect } from 'react';
import { Tabs, Tab } from '@nextui-org/react';
import { BsFillSunFill, BsMoon } from 'react-icons/bs';
import { RiComputerLine } from 'react-icons/ri';
import { useTheme } from '../../utils/theme';

const ThemeSwitcher: React.FC = () => {
  const { activeTheme, setTheme } = useTheme();

  const handleThemeChange = (selectedTheme: string) => {
    setTheme(selectedTheme);
  };

  useEffect(() => {
    setTheme(activeTheme);
  }, [activeTheme, setTheme]);

  const tabs = [
    {
      theme: 'light',
      icon: <BsFillSunFill onClick={() => handleThemeChange('light')} />,
    },
    {
      theme: 'dark',
      icon: <BsMoon onClick={() => handleThemeChange('dark')} />,
    },
    {
      theme: 'system',
      icon: <RiComputerLine onClick={() => handleThemeChange('system')} />,
    },
  ];

  return (
      <Tabs
        aria-label="DarkMode Bar"
        size="lg"
        radius='full'
        items={tabs}
        selectedKey={activeTheme}
        onSelectionChange={setTheme}
        classNames={{
          tabList: 'bg-transparent',
          cursor: 'bg-gradient-to-t dark:from-[#0D1117] dark:to-gray-850 shadow-none border dark:border-gray-700',
          tabContent: 'dark:group-data-[selected=true]:text-white text-black dark:text-white',
        }}
      >
        {(item) => (
          <Tab key={item.theme} title={item.icon} />
        )}
      </Tabs>
  );
};

export default ThemeSwitcher;
