import React from 'react';
import { Home } from './containers/home';

import { Themes, ThemeProvider, ThemeConsumer } from './components/theme';

function App() {
  return (
    <ThemeProvider>
      <ThemeConsumer>
        {({ theme }) => (
          <div className={ theme === Themes.dark ? 'aqi-dark': 'aqi-light' }>
            <Home />
          </div>
        )}
      </ThemeConsumer>
    </ThemeProvider>
  );
}

export default App;
