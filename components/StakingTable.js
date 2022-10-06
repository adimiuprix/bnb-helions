import {
  Table,
  Image,
  Container,
  Button,
  Text,
  Loading
} from "@nextui-org/react";
import React, { useState, useMemo, useContext } from "react";
import { WalletConnectContext } from "../context/WalletConnectContext";
import { IPFSURL } from "../config/config";
import { StyledBadge } from "./StyledBadge";

export default function StakingTable() {
  const [stakeSelected, setStakeSelected] = useState([]);
  const [unstakeSelected, setUnstakeSelected] = useState([]);
  const stakeSelectedValue = useMemo(
    () => Array.from(stakeSelected).join(","),
    [stakeSelected]
  );
  const unStakeSelectedValue = useMemo(
    () => Array.from(unstakeSelected).join(","),
    [unstakeSelected]
  );
  const ConnectContext = useContext(WalletConnectContext);
  const { walletNfts, stakedNfts, StakeNFT, UnstakeNFT, isStaking, isUnstaking, isClaiming, ClaimRewards, stakingRewards, ApproveStaking, isNFTApproved } = ConnectContext;

  const handleStake = async () => {
    const converted = (stakeSelectedValue.split(',').map((val) => {return parseInt(val)}))
    if (stakeSelectedValue == "a,l,l") {
      StakeNFT(walletNfts)
    }
    else {
      StakeNFT(converted)
    }
  }

  const handleUnstake = async () => {
    const converted = (unStakeSelectedValue.split(',').map((val) => {return parseInt(val)}))
    if (stakeSelectedValue == "a,l,l") {
      UnstakeNFT(stakedNfts)
    }
    else {
      StakeNFT(converted)
    }
  }

  return (
    <>
     <Text
          h1
          size={30}
          css={{
            textGradient: "45deg, $blue600 -20%, $pink600 50%",
            dflex: "center",
          }}
          weight="bold"
          style={{ marginTop: "20px" }}
        >
          Earned {stakingRewards} $SOULS
        </Text>

      <Container css={{ dflex: "center", mb: "$10" }}>
        {isClaiming ?
            <Button auto flat color="secondary" css={{ px: "$13" }}>
            <Loading type="points" color="secondary" size="sm" />
          </Button>
          :
          <Button onClick={ClaimRewards} auto color="secondary" style={{ width: "fit-content" }}>
          Claim Rewards
        </Button>
        }
          </Container>
      <div>
        <Text
          h1
          size={25}
          css={{
            textGradient: "45deg, $blue600 -20%, $pink600 50%",
            dflex: "center",
          }}
          weight="bold"
          style={{ marginTop: "20px" }}
        >
          Wallet NFTs
        </Text>
        {walletNfts.length !== 0 ? (
          <Table
            bordered
            hoverable
            shadow={false}
            selectionMode="multiple"
            aria-label="All Unstaked NFTs"
            css={{ minWidth: "100%", height: "calc($space$14 * 10)" }}
            color="secondary"
            selectedKeys={stakeSelected}
            onSelectionChange={setStakeSelected}
          >
            <Table.Header>
              <Table.Column>NFT</Table.Column>
              <Table.Column>TOKENID</Table.Column>
              <Table.Column>STATUS</Table.Column>
            </Table.Header>
            <Table.Body>
              {walletNfts?.map((nfts) => {
                return (
                  <Table.Row key={nfts}>
                    <Table.Cell>
                      <Image
                        src={IPFSURL + nfts + ".png"}
                        width="100px"
                        style={{ borderRadius: "20px" }}
                      />
                    </Table.Cell>
                    <Table.Cell>{nfts}</Table.Cell>
                    <Table.Cell>
                      <StyledBadge type="paused">Unstaked</StyledBadge>
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
        ) : (
          <div></div>
        )}
      </div>
      <Container css={{ dflex: "center", mt: "$5",mb: "$5" }}>
        {isNFTApproved ? 
                      <>
                       {isStaking ?
            <Button auto flat color="secondary" css={{ px: "$13" }}>
            <Loading type="points" color="secondary" size="sm" />
          </Button>
          :
          <>
          {stakeSelectedValue === "a,l,l" ?
            <Button onClick={handleStake} auto color="secondary" style={{ width: "fit-content" }}>
            Stake All NFTs
          </Button>
          :
          <Button onClick={handleStake} auto color="secondary" style={{ width: "fit-content" }}>
          Stake Selected NFTs
        </Button>
          }
          </>
        }
                      </>
                      :
                      <Button onClick={ApproveStaking} auto color="secondary" style={{ width: "fit-content" }}>
                      Approve To Stake
                    </Button>
                      }
        </Container>
      <Text
        h1
        size={25}
        css={{
          textGradient: "45deg, $blue600 -20%, $pink600 50%",
          dflex: "center",
        }}
        weight="bold"
      >
        Staked NFTs
      </Text>
      {stakedNfts.length !== 0 ? (
        <div style={{ marginBottom: "20px" }}>
          <Table
            bordered
            hoverable
            shadow={false}
            selectionMode="multiple"
            aria-label="Eall Staked Nfts"
            css={{ minWidth: "100%", height: "calc($space$14 * 10)" }}
            color="secondary"
            selectedKeys={unstakeSelected}
            onSelectionChange={setUnstakeSelected}
          >
            <Table.Header>
              <Table.Column>NFT</Table.Column>
              <Table.Column>TOKENID</Table.Column>
              <Table.Column>STATUS</Table.Column>
            </Table.Header>
            <Table.Body>
              {stakedNfts?.map((nfts) => {
                return (
                  <Table.Row key={nfts}>
                    <Table.Cell>
                      <Image
                        src={IPFSURL + nfts + ".png"}
                        width="100px"
                        style={{ borderRadius: "20px" }}
                      />
                    </Table.Cell>
                    <Table.Cell>{nfts}</Table.Cell>
                    <Table.Cell>
                      <StyledBadge type="active">Staked</StyledBadge>
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
        </div>
      ) : (
        <div></div>
      )}
            <Container css={{ dflex: "center", mb: "$10" }}>
        {isUnstaking ?
            <Button auto flat color="secondary" css={{ px: "$13" }}>
            <Loading type="points" color="secondary" size="sm" />
          </Button>
          :
          <>
          {unStakeSelectedValue === "a,l,l" ?
            <Button onClick={handleUnstake} auto color="secondary" style={{ width: "fit-content" }}>
            Unstake All NFTs
          </Button>
          :
          <Button onClick={handleUnstake} auto color="secondary" style={{ width: "fit-content" }}>
          Unstake Selected NFTs
        </Button>
          }
          </>
        }
      </Container>
    </>
  );
}
