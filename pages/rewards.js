import { Container, Card, Text, Button, Loading } from '@nextui-org/react'
import React, {  useContext } from 'react'
import { Nav } from '../components/Nav'
import { WalletConnectContext } from '../context/WalletConnectContext'

function rewards() {

  const ConnectContext = useContext(WalletConnectContext);
  const { isClaimingReward, rewards, ClaimRwd } = ConnectContext;
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
            Earned  {rewards} BNB
          </Text>
                </Card.Header>
                <Card.Body css={{dflex:"center"}}>
                  {isClaimingReward ? 
                              <Button auto flat color="secondary" css={{ px: "$13" }}>
                              <Loading type="points" color="secondary" size="sm" />
                            </Button>
                  :
                  <Button auto color="secondary" style={{ width: "fit-content" }} onClick={ClaimRwd}>Claim</Button>

                  }
                </Card.Body>
            </Card>
        </Container>
        </div>
  )
}

export default rewards