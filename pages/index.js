import { Mint } from '../components/Mint'
import styles from '../styles/Home.module.css'
import { Image, Navbar, Button, Link, Text, } from '@nextui-org/react'
import { useContext } from 'react'
import { WalletConnectContext } from '../context/WalletConnectContext'

export default function Home() {

  const ConnectContext = useContext(WalletConnectContext);
  const { ConnectWallet, DisconnectWallet, account } = ConnectContext

  return (
    <div>

  <Navbar isBordered variant="sticky">
        <Navbar.Brand>
          <Text b color="inherit" hideIn="xs">
            <Image src="helionlogo.png" width={230} />
          </Text>
        </Navbar.Brand>
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
      </Navbar>
          <Mint />
    </div>

  )
}