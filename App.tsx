import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';

export default function App() {
  return (
    <Container>
      <GreetingBox>Funcionando!</GreetingBox>
      <StatusBar style="auto" />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Container = styled.View`
    flex: 1;
    display: flex;
    background-color: #0d1117;
    align-items: center;
    justify-content: center;
`

const GreetingBox = styled.Text`
    color: white;
`