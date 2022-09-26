import { useState, useEffect, createContext } from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import truncateEthAddress from 'truncate-eth-address'
import { NFTCONTRACT } from '../config/config'
import NftAbi from '../config/NftAbi.json'

export const WalletConnectContext = createContext()

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "a9e587010ed64cb8b08558f7cadda06a",
      rpc: {
        5: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
      },
      chainId: 5
    }
  }
}


export const ConnectWalletProvider = ({ children }) => {
    const [addr, setAddr] = useState(null)
    const [web3Modal, setWeb3Modal] = useState({})
    const [ account, setAccount ] = useState(null)
    const [ minted, setMinted ] = useState(null)
    const [amount, setAmount] = useState(0)
    const [ contract, setContract ] = useState(null)
    const [ cost, setCost ] = useState(null)
    const [isMinting, setMinting] = useState(false)
    const [totalCost, setTotalCost] = useState(null)

   /* useEffect(() => {
      const connectWalletOnPageLoad = async () => {
        if (localStorage?.getItem('isWalletConnected') === ('true')) {
          try{ 
              if (typeof window !== "undefined") {
                web3Modal = new Web3Modal({
                network: "goerli", // optional
                cacheProvider: true, // optional
                providerOptions, // required
                theme: "dark",
              })
              setWeb3Modal(web3Modal)
                await ConnectWallet()
              localStorage.setItem('isWalletConnected', true)
            }

          } catch(ex) {
            console.log(ex)
          }
        }
      }
      connectWalletOnPageLoad()
    },[]) */

    const isConnected = () => {
      if(account != null) {
        return true
      }
      else {
        return false
      }
    }

    const ConnectWallet = async () => {
      if (typeof window !== "undefined") {
        web3Modal = new Web3Modal({
        network: "goerli", // optional
        cacheProvider: true, // optional
        providerOptions, // required
        theme: "dark",
      })
      setWeb3Modal(web3Modal)
    }
      localStorage.setItem('isWalletConnected', true)
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
        const signer = await provider.getSigner()
        const addr = await signer.getAddress()
        setAddr(addr)
        const address = truncateEthAddress(addr) 
        setAccount(address)   
        let nftcontract = await new ethers.Contract(NFTCONTRACT, NftAbi, signer)
        setContract(nftcontract)
        let cost = await nftcontract.cost()
        let frmCost = ethers.utils.formatUnits(cost.toString())
        let supply = await nftcontract.totalSupply()
        setCost(frmCost)
        setMinted(parseInt(supply))
    }

    const DisconnectWallet = async () => {
      try {
        await web3Modal.clearCachedProvider();
        setAccount(null)
        localStorage.setItem('isWalletConnected', false)
      } catch(ex) {
        console.log(ex)
      }
    }

    const calcAddMint = async () => {
      setAmount(amount += 1)
      let totalCost = Number(cost) * amount
      setTotalCost(totalCost.toFixed(3))
    }

    const calcSubMint = async () => {
      setAmount(amount -= 1)
      let totalCost = Number(cost) * amount
      setTotalCost(totalCost.toFixed(3))
    }

    const Mint = async () => {
      let totalCost = Number(cost) * amount
      setTotalCost(totalCost)
      let tx = await contract.mint(addr, amount, { value: ethers.utils.parseEther(totalCost.toString())})
      setMinting(true)
      await tx.wait()
      setMinting(false)
    } 

    return(
        <WalletConnectContext.Provider 
        value={{
            account,
            ConnectWallet,
            Mint,
            isConnected,
            setAmount,
            amount,
            isMinting,
            cost,
            minted,
            DisconnectWallet,
            totalCost,
            calcAddMint,
            calcSubMint
         }}
        >
            {children}
        </WalletConnectContext.Provider>
    )
}