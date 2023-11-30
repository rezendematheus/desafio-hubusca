import React from 'react'
import styled from 'styled-components/native'

const MainPage = ({ navigation }) => {
  return (
    <Container>
      <Title>MainPage</Title>
      <ToProfiflePage title='Go to Profile' onPress={() => navigation.navigate('Profile')} />
    </Container>
  )
}

const Container = styled.View`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Title = styled.Text`

`

const ToProfiflePage = styled.Button`
    
`

export default MainPage