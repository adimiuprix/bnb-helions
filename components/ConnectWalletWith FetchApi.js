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
      let pr = await provider.getNetwork()
      setChainId(pr.chainId)
      setAddr(addr)
      const address = truncateEthAddress(addr) 
      setAccount(address)   
      let nftcontract = await new ethers.Contract(NFTCONTRACT, NftAbi, signer)
      let stakingcontract = await new ethers.Contract(STAKINGCONTRACT, StakingContractAbi, signer)
      let tokencontract = await new ethers.Contract(SOULSCONTRACT, TokenContract, signer)
      setContract(nftcontract)
      setStakingContract(stakingcontract)
      setSoulsContract(tokencontract)
      let cost = await nftcontract.cost()
      let frmCost = ethers.utils.formatUnits(cost.toString())
      let supply = await nftcontract.totalSupply()
      setCost(frmCost)
      setMinted(parseInt(supply))
      const unstakednfts = await nftcontract.walletOfOwner(addr)
      const unstkarr = []
      const stkarr = []
      await Promise.all(unstakednfts.map(async i => {
        let nfta = parseInt(i)
        let stkid = {
          tokenId: nfta,
        }
        const nftstkURI = await nftcontract.tokenURI(stkid.tokenId)
         let URI = nftstkURI.replace("ipfs://","https://ipfs.io/ipfs/")
        const fetchRes = await fetch(URI + ".json").then(res => res.json()).then((d) =>  {let cleanUri = d.image.replace("ipfs://","https://ipfs.io/ipfs/"); let nftstkobj = {tokenid: d.edition, image:cleanUri };
        unstkarr.push(nftstkobj)
       })
        return fetchRes
        }))
        setWalletNfts(unstkarr)
        console.log(unstkarr)
      const stakednfts = await stakingcontract.getStakedTokens(addr)
      await Promise.all(stakednfts.map(async i => {
        let nfta = parseInt(i.tokenId)
        let stkid = {
          tokenId: nfta,
        }
        const nftstkURI = await nftcontract.tokenURI(stkid.tokenId)
         let URI = nftstkURI.replace("ipfs://","https://ipfs.io/ipfs/")
        const fetchRes = await fetch(URI + ".json").then(res => res.json()).then((d) =>  {let cleanUri = d.image.replace("ipfs://","https://ipfs.io/ipfs/"); let nftstkobj = {tokenid: d.edition, image:cleanUri };
        stkarr.push(nftstkobj)
       })
        return fetchRes
        }))
        setStakedNfts(stkarr)
        console.log(stkarr)
  }
