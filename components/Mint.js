import React from "react";
import { Button, Card, Container, Spacer, Text, Row, Loading } from "@nextui-org/react";
import { useState, useContext } from "react";
import { WalletConnectContext } from "../context/WalletConnectContext";

export const Mint = () => {
  const ConnectContext = useContext(WalletConnectContext);
  const {
    ConnectWallet,
    isConnected,
    Mint,
    setAmount,
    amount,
    isMinting,
    cost,
    minted,
    totalCost,
    calcAddMint,
    calcSubMint,
    correctChain,
  } = ConnectContext;

  return (
    <Container>
      <Container>
        <Row
          css={{
            dflex: "center",
          }}
        >
          <Text
            h1
            size={40}
            css={{
              textGradient: "45deg, $blue600 -20%, $pink600 50%",
            }}
            weight="bold"
          >
            BNB
            HELLIONS
          </Text>
        </Row>
      </Container>
      <Spacer />
      <Card variant="bordered" isPressable>
        <Card.Header
          css={{
            dflex: "center",
          }}
        >
          {isConnected ? 
            <div></div>
           : (
            <Text
              h1
              size={18}
              css={{
                textGradient: "45deg, $blue600 -20%, $pink600 50%",
              }}
            >
              Connect Wallet to Mint Hellion NFT
            </Text>
          )}
            {correctChain ? 
            <div></div>
           : (
            <Text
              h1
              size={18}
              css={{
                textGradient: "45deg, $blue600 -20%, $pink600 50%",
              }}
            >
              Connect Wallet SmartChain
            </Text>
          )}
        </Card.Header>
        <Card.Body>
          <Row
            css={{
              dflex: "center",
            }}
          >
            <Text
              h4
              size={20}
              css={{
                textGradient: "45deg, $blue600 -20%, $pink600 50%",
                dflex: "center",
              }}
              weight="bold"
            >
              Each Hellion cost{" "}
            </Text>
            <Text
              h4
              size={20}
              color="secondary"
              weight="bold"
              css={{ mr: "8px", ml: "8px" }}
            >
              {cost}
            </Text>
            <Text
              h4
              size={20}
              css={{
                textGradient: "45deg, $blue600 -20%, $pink600 50%",
                dflex: "center",
              }}
              weight="bold"
            >
              BNB
            </Text>
          </Row>
          <Spacer />
          <Text
              h4
              size={30}
              css={{
                textGradient: "45deg, $blue600 -20%, $pink600 50%",
                dflex: "center",
              }}
              weight="bold"
            >
              {minted} / 4444
            </Text>
        </Card.Body>
        <Card.Image
          style={{ borderRadius: "20px" }}
          alt="nextui logo"
          src="helion.jpeg"
          width="300px"
        />
        <Spacer />
        <Container
          css={{
            dflex: "center",
          }}
        >
          <Row
            css={{
              dflex: "center",
            }}
          >
            {" "}
            <Text
              h4
              size={20}
              css={{
                textGradient: "45deg, $blue600 -20%, $pink600 50%",
                dflex: "center",
              }}
              weight="bold"
            >
              Mint
            </Text>{" "}
            <Text
              h4
              size={20}
              color="secondary"
              weight="bold"
              css={{ mr: "8px", ml: "8px" }}
            >
              {" "}
              {amount}{" "}
            </Text>{" "}
            <Text
              h4
              size={20}
              css={{
                textGradient: "45deg, $blue600 -20%, $pink600 50%",
                dflex: "center",
              }}
              weight="bold"
            >
              {" "}
              HELLIONS
            </Text>
          </Row>
        </Container>
        <Card.Footer
          css={{
            dflex: "center",
          }}
        >
          <Spacer />

{minted != 4444 ?
 <Row justify="center">
{isMinting ? 
  <Button auto flat color="secondary" css={{ px: "$13" }}>
  <Loading type="points" color="secondary" size="sm" />
</Button>
  :
<> 
    <Button
              bordered
              rounded
              auto
              color="secondary"
              style={{ width: "fit-content" }}
              onClick={() => calcSubMint()}
            >
              -
            </Button>
            <Spacer />
            <Button
              auto
              color="secondary"
              style={{ width: "fit-content" }}
              onClick={Mint}
            >
              {totalCost} BNB
            </Button>
            <Spacer />
            <Button
              auto
              rounded
              bordered
              color="secondary"
              style={{ width: "fit-content" }}
              onClick={() => calcAddMint()}
            >
              +
            </Button>
  </>
  }

          </Row>
          :
          <Button
          bordered
              auto
              color="secondary"
              disabled
              >
            This Collection Has been Minted Out
          </Button>
          }
        </Card.Footer>
      </Card>
      <br />
      <Text
            h1
            size={30}
            weight="bold"
            css={{
              dflex:"center",
              textGradient: "45deg, $blue600 20%, $pink600 50%",
            }}
          >
            Raising Hell on BNB Chain
          </Text>
    </Container>
  );
};
