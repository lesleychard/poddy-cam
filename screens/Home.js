import React, {Component} from 'react';
import {
    Text,
    View,
} from 'react-native';
import styled from 'styled-components';

const Container = styled(View)`
    flex: 1;
    background-color: ${props => props.theme.palette.background};
    color: ${props => props.theme.palette.text};
    align-items: center;
    justify-content: center;
`;

// eslint-disable-next-line react/prefer-stateless-function
export default class Home extends Component {
    render() {
        return (
            <Container>
                <Text>PoddyCam</Text>
            </Container>
        );
    }
}
