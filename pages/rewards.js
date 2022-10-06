import { Container, Card, Text, Button } from '@nextui-org/react'
import React from 'react'
import { Nav } from '../components/Nav'

function rewards() {
  return (
    <div>
        <Nav rewards={true} />
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
            CLAIM BNB REWARDS
          </Text>
        <Container style={{marginTop:"80px"}}>
            <Card variant='bordered' isHoverable >
                <Card.Header css={{dflex:"center"}}>
                <Text
            h1
            size={25}
            css={{
              textGradient: "45deg, $blue600 -20%, $pink600 50%",
            }}
            weight="bold"
          >
            Earned  0.8 BNB
          </Text>
                </Card.Header>
                <Card.Body css={{dflex:"center"}}>
                    <Button auto color="secondary" style={{ width: "fit-content" }}>Claim</Button>
                </Card.Body>
            </Card>
        </Container>
        </div>
  )
}

export default rewards