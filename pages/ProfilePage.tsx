import React from 'react'
import styled from 'styled-components/native'

type Props = {
    navigation
}

const ProfilePage = (props: Props) => {
  return (
    <Container>
      <Title>ProfilePage</Title>
      <ToMainPage title='Go to main page' onPress={() =>props.navigation.navigate('Main')}/>
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

const ToMainPage = styled.Button`

`

export default ProfilePage