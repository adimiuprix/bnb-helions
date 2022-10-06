import React from 'react'
import { Image, Navbar, Button, Link, Text, Container, Card } from '@nextui-org/react'
import { useContext } from 'react'
import { WalletConnectContext } from '../context/WalletConnectContext'



export const Nav = ({mint, stake, rewards, background}) => {

  const ConnectContext = useContext(WalletConnectContext);
  const { ConnectWallet, DisconnectWallet, account } = ConnectContext

  return (
      <Navbar isBordered variant="sticky">
        <Navbar.Brand>
            <div className='hamburger'>
                   <style jsx>{`
        .hamburger {
          display: none;
        }
        @media only screen and (max-width: 480px) {
            .hamburger{ 
                display: flex;
             }
            }
            
            @media only screen and (max-width: 770px) {
                .hamburger{ 
                    display: flex;
                 }
              }
            
              @media only screen and (max-width: 900px) {
                .hamburger{ 
                    display: flex;
                 }
                 }
      `}</style>
             <Navbar.Toggle aria-label="toggle navigation" />
            </div>

          &nbsp;
          &nbsp;
          &nbsp;
          <Image src='helionlogo.png' width={120} />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </Navbar.Brand>
        <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
          <Navbar.Link href="/" isActive={mint}>Mint</Navbar.Link>
          <Navbar.Link isActive={stake} href="/stake">
            Stake
          </Navbar.Link>
          <Navbar.Link isActive={rewards} href="/rewards">Rewards</Navbar.Link>
          <Navbar.Link href="/backgroundswap" isActive={background}>BackgroundSwap</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
            <Navbar.Item>
            {account ?
            <Button auto color="secondary" flat onClick={DisconnectWallet}>
                  {account}
            </Button>
                :
            <Button auto color="secondary" flat onClick={ConnectWallet}>
                  Connect Wallet
             </Button>
      }
            </Navbar.Item>
        </Navbar.Content>
        <Navbar.Collapse>
          <Navbar.CollapseItem isActive={mint}>
            <Link
              color="inherit"
              css={{
                minWidth: "100%",
              }}
              href="/"
            >
              Mint
            </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem isActive={stake}>
            <Link
              color="inherit"
              css={{
                minWidth: "100%",
              }}
              href="/stake"
            >
              Stake
            </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem isActive={rewards}>
            <Link
              color="inherit"
              css={{
                minWidth: "100%",
              }}
              href="/rewards"
            >
              Rewards
            </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem isActive={background}>
            <Link
              color="inherit"
              css={{
                minWidth: "100%",
              }}
              href="/backgroundswap"
            >
              BackgroundSwap
            </Link>
          </Navbar.CollapseItem>
      </Navbar.Collapse>
      </Navbar>
  )
}
