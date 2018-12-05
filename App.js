import React from 'react';
import {ThemeProvider} from 'styled-components';
import theme from './styles';
import Navigator from './Navigator';

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <Navigator />
        </ThemeProvider>
    );
}
