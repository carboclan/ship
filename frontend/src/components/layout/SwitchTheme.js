import React from 'react';
import { Button, IconStarFilled, IconStar } from '@aragon/ui';

const switchThemeProps = {
  theme: {},
  updateTheme: {}
}

function SwitchMode({ theme, updateTheme } = switchThemeProps) {
  const handleChangeTheme = () => {
    if (theme === 'light') updateTheme('dark');
    else updateTheme('light');
  };

  return (
    <Button
      label={'Theme'}
      display="icon"
      icon={theme === 'dark' ? <IconStar /> : <IconStarFilled />}
      onClick={handleChangeTheme}
    />
  );
}


export default SwitchMode;