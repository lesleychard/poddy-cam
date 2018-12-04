import React from 'react';
import {
    // StyleSheet,
    Text,
    View,
} from 'react-native';
import styled, {ThemeProvider} from 'styled-components';
import theme from './style-utils';

const Container = styled(View)`
    flex: 1;
    background-color: ${props => props.theme.palette.background};
    color: ${props => props.theme.palette.text};
    align-items: center;
    justify-content: center;
`;

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Text>PoddyCam</Text>
            </Container>
        </ThemeProvider>
    );
}
