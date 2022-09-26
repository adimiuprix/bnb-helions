import React from "react";
import { Button, Card, Container, Spacer, Text, Row } from "@nextui-org/react";
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
          </Text>
          <Text
            h1
            size={40}
            css={{
              textGradient: "45deg, $purple600 -20%, $pink600 100%",
            }}
            weight="bold"
          >
            &nbsp;&nbsp;
          </Text>
          <Text
            h1
            size={40}
            css={{
              textGradient: "45deg, $yellow600 -20%, $red600 100%",
            }}
            weight="bold"
          >
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
          {isConnected ? (
            <div></div>
          ) : (
            <Text
              h1
              size={18}
              css={{
                textGradient: "45deg, $yellow600 -20%, $red600 100%",
              }}
            >
              Connect Wallet to Mint Helion NFT
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
                textGradient: "45deg, $yellow600 -20%, $red600 100%",
                dflex: "center",
                textGradient: "45deg, $yellow600 -20%, $red600 100%",
              }}
              weight="bold"
            >
              Each helion will cost{" "}
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
                textGradient: "45deg, $yellow600 -20%, $red600 100%",
                dflex: "center",
                textGradient: "45deg, $yellow600 -20%, $red600 100%",
              }}
              weight="bold"
            >
              BNB
            </Text>
          </Row>
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
                textGradient: "45deg, $yellow600 -20%, $red600 100%",
                dflex: "center",
                textGradient: "45deg, $yellow600 -20%, $red600 100%",
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
                textGradient: "45deg, $yellow600 -20%, $red600 100%",
                dflex: "center",
                textGradient: "45deg, $yellow600 -20%, $red600 100%",
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

          <Row justify="center">
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
          </Row>
        </Card.Footer>
      </Card>
    </Container>
  );
};
