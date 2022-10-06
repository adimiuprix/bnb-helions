import { Container, Card, Text, Button } from '@nextui-org/react'
import React  from 'react'
import { BackgroundComp } from '../components/BackgroundComp'
import { Nav } from '../components/Nav'

function rewards() {

  return (
    <div>
        <Nav background={true} />
        <Text
            h1
            size={30}
            css={{
              textGradient: "45deg, $blue600 -20%, $pink600 50%",
              dflex:"center"
            }}
            weight="bold"
            style={{marginTop:"80px"}}
          >
            Swap NFT Background
          </Text>
        <Container style={{marginTop:"10px"}}>
           <BackgroundComp />
        </Container>
        </div>
  )
}

export default rewards