import { Table, Image, Container, Button, Text, Loading } from "@nextui-org/react";
import { WalletConnectContext } from "../context/WalletConnectContext";
import { useContext, useState, useMemo } from "react";
import { IPFSURL } from "../config/config";
import { StyledBadge } from "./StyledBadge";

export const BackgroundComp = () => {

    const [stakeSelected, setStakeSelected] = useState([]);
    const stakeSelectedValue = useMemo(
      () => Array.from(stakeSelected).join(","),
      [stakeSelected]
    );
  const ConnectContext = useContext(WalletConnectContext);
  const { isApprovingNFT, ApproveNFT, isTokenApproved, tokenBalance, swapBG, swappedBg, originalBg } = ConnectContext;

  const handelSwap = async () => {
    const converted = (stakeSelectedValue.split(',').map((val) => {return parseInt(val)}))
    if (stakeSelectedValue == "a,l,l") {
        console.log(originalBg)
      //swapBG()
    }
    else {
        console.log(stakeSelectedValue)
      //swapBG()
    }
  }
 
    return (
        <>
             <Text
          h1
          size={28}
          css={{
            textGradient: "45deg, $blue600 -20%, $pink600 50%",
            dflex: "center",
          }}
          weight="bold"
          style={{ marginTop: "5px" }}
        >
          You own {tokenBalance} $SOULS
        </Text>
          <Text
          h1
          size={25}
          css={{
            textGradient: "45deg, $blue600 -20%, $pink600 50%",
            dflex: "center",
          }}
          weight="bold"
          style={{ marginTop: "3px" }}
        >
          Original NFTs
        </Text>
        {originalBg.length != 0 ?
                  <Table
                  bordered
                  hoverable
                  shadow={false}
                  selectionMode="multiple"
                  aria-label="All Unswapped NFTs"
                  css={{ minWidth: "100%", height: "calc($space$14 * 10)" }}
                  color="secondary"
                  selectedKeys={stakeSelected}
                  onSelectionChange={setStakeSelected}
                >
                  <Table.Header>
                    <Table.Column>NFT</Table.Column>
                    <Table.Column>TOKENID</Table.Column>
                    <Table.Column>BG STATUS</Table.Column>
                  </Table.Header>
                  <Table.Body>
                    {originalBg?.map((nfts) => {
                      return (
                        <Table.Row key={nfts}>
                          <Table.Cell>
                            <Image
                              src={IPFSURL + nfts + ".png"}
                              width="100px"
                              style={{ borderRadius: "20px" }}
                              alt=""
                            />
                          </Table.Cell>
                          <Table.Cell>{nfts}</Table.Cell>
                          <Table.Cell>
                            <StyledBadge type="paused">Original</StyledBadge>
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                  <Table.Pagination
                    shadow
                    noMargin
                    align="center"
                    rowsPerPage={3}
                    onPageChange={(page) => console.log({ page })}
                  />
                </Table>
                :
                <div></div>
        }
                <Container css={{dflex:"center", mt:"$10", mb:"$10"}}>
                    {isTokenApproved ? 
                    <>
                                    {stakeSelectedValue == "a,l,l" ?
                          <Button auto color="secondary" style={{ width: "fit-content" }} onClick={handelSwap}>Swap All BG</Button>
                          :
                          <Button auto color="secondary" style={{ width: "fit-content" }} onClick={handelSwap}>Swap Selected BG</Button>
                }
                    </>
                    :
                    <>
                    {isApprovingNFT ? 
                                <Button auto flat color="secondary" css={{ px: "$13" }}>
                                <Loading type="points" color="secondary" size="sm" />
                              </Button>
                    :
                    <Button auto color="secondary" style={{ width: "fit-content" }} onClick={ApproveNFT}>Approve to Swap Bg</Button>

                    }
                    </>
                    }
          </Container>
                {swappedBg.length !== 0 ?
                    <Table
                    bordered
                    hoverable
                    shadow={false}
                    aria-label="All Swapped NFTs"
                    css={{ minWidth: "100%", height: "calc($space$14 * 10)" }}
                    color="secondary"
                  >
                    <Table.Header>
                      <Table.Column>NFT</Table.Column>
                      <Table.Column>TOKENID</Table.Column>
                      <Table.Column>BG STATUS</Table.Column>
                    </Table.Header>
                    <Table.Body>
                      {swappedBg?.map((nfts) => {
                        return (
                          <Table.Row key={nfts}>
                            <Table.Cell>
                              <Image
                                src={IPFSURL + nfts + ".png"}
                                width="100px"
                                style={{ borderRadius: "20px" }}
                                alt=""
                              />
                            </Table.Cell>
                            <Table.Cell>{nfts}</Table.Cell>
                            <Table.Cell>
                              <StyledBadge>Swapped</StyledBadge>
                            </Table.Cell>
                          </Table.Row>
                        );
                      })}
                    </Table.Body>
                    <Table.Pagination
                      shadow
                      noMargin
                      align="center"
                      rowsPerPage={3}
                      onPageChange={(page) => console.log({ page })}
                    />
                  </Table>
                  :
                  <div></div>

                }
                </>
    );
}