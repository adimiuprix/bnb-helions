import { useState, useEffect, createContext } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import truncateEthAddress from "truncate-eth-address";
import { NFTCONTRACT, STAKINGCONTRACT, SOULSCONTRACT, REWARDCONTRACT } from "../config/config";
import NftAbi from "../config/NftAbi.json";
import StakingContractAbi from "../config/StakingContractAbi.json";
import TokenContract from "../config/TokenContract.json";
import RewardContractAbi from "../config/RewardContractAbi.json"

export const WalletConnectContext = createContext();

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "a9e587010ed64cb8b08558f7cadda06a",
      rpc: {
        5: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      },
      chainId: 5,
    },
  },
};

export const ConnectWalletProvider = ({ children }) => {
  const [addr, setAddr] = useState(null);
  const [web3Modal, setWeb3Modal] = useState({});
  const [account, setAccount] = useState(null);
  const [minted, setMinted] = useState(null);
  const [amount, setAmount] = useState(0);
  const [contract, setContract] = useState(null);
  const [stakingContract, setStakingContract] = useState(null);
  const [soulsContract, setSoulsContract] = useState(null);
  const [cost, setCost] = useState(null);
  const [isMinting, setMinting] = useState(false);
  const [totalCost, setTotalCost] = useState(null);
  const [stakingRewards, setStakingRewards] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [walletNfts, setWalletNfts] = useState([]);
  const [stakedNfts, setStakedNfts] = useState([]);
  const [swappedBg, setSwappedBg] = useState([]);
  const [originalBg, setOriginalBg] = useState([]);
  const [tokenBalance, setTokenBalance] = useState([]);
  const [isStaking, setStaking] = useState(false);
  const [isApprovingStaking, setIsApprovingStaking] = useState(false);
  const [isApprovingNFT, setIsApprovingNFT] = useState(false);
  const [isUnstaking, setUnstaking] = useState(false);
  const [isClaiming, setClaiming] = useState(false);
  const [ rewardContract, setRewardContract ] = useState(null)
  const [isClaimingReward, setIsClaimingReward] = useState(false)
  const [isTokenApproved, setIsTokenApproved] = useState(true);
  const [isNFTApproved, setIsNFTApproved] = useState(true);
  const [rewards, setPendingRewards] = useState(false)

  useEffect(() => {
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
    },[])

  const isConnected = () => {
    account != null ? true : false;
  };

  const ConnectWallet = async () => {
    if (typeof window !== "undefined") {
      web3Modal = new Web3Modal({
        network: "goerli", // optional
        cacheProvider: true, // optional
        providerOptions, // required
        theme: "dark",
      });
      setWeb3Modal(web3Modal);
    }
    localStorage.setItem("isWalletConnected", true);
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = await provider.getSigner();
    const addr = await signer.getAddress();
    let pr = await provider.getNetwork();
    setChainId(pr.chainId);
    setAddr(addr);
    const address = truncateEthAddress(addr);
    setAccount(address);
    let nftcontract = await new ethers.Contract(NFTCONTRACT, NftAbi, signer);
    let rwdContract = await new ethers.Contract(REWARDCONTRACT, RewardContractAbi, signer);
    let stakingcontract = await new ethers.Contract(
      STAKINGCONTRACT,
      StakingContractAbi,
      signer
    );
    let tokencontract = await new ethers.Contract(
      SOULSCONTRACT,
      TokenContract,
      signer
    );
    let rawRwd = await stakingcontract.availableRewards(addr)
    let procRwd = parseInt(ethers.utils.formatEther(rawRwd.toString()))
    let rawApproval = await tokencontract.allowance(addr, NFTCONTRACT)
    if (parseInt(rawApproval) < 10000) {
      setIsTokenApproved(false)
    }
    let nftApp = await nftcontract.isApprovedForAll(addr, STAKINGCONTRACT)
    if(nftApp == false) {
      setIsNFTApproved(nftApp)
    }
    let tokBal = await tokencontract.balanceOf(addr)
    let rawbal = parseInt(ethers.utils.formatEther(tokBal.toString()))
    setTokenBalance(Number(rawbal).toFixed(3))
    setStakingRewards(Number(procRwd).toFixed(3))
    setContract(nftcontract);
    setStakingContract(stakingcontract);
    setSoulsContract(tokencontract);
    setRewardContract(rwdContract)
    let cost = await nftcontract.cost();
    let frmCost = ethers.utils.formatUnits(cost.toString());
    let supply = await nftcontract.totalSupply();
    setCost(frmCost);
    setMinted(parseInt(supply));
    const unstakednfts = await nftcontract.walletOfOwner(addr);
    const unstkarr = [];
    unstakednfts.map((nft) => {
      let nfta = parseInt(nft);
      unstkarr.push(nfta);
    });
    const stkarr = [];
    const stakednfts = await stakingcontract.getStakedTokens(addr);
    stakednfts.map((nft) => {
      let nfta = parseInt(nft.tokenId);
      stkarr.push(nfta);
    });
    setStakedNfts(stkarr);
    setWalletNfts(unstkarr);
    const swappedBg = []
    const originalBg = []
    await Promise.all(unstakednfts.map(async (nft) => {
      const isChanged = await nftcontract.isImageChanged(nft)
      let nfta = parseInt(nft)
      if (isChanged == true) {
        swappedBg.push(nfta)
      }
        else {
          originalBg.push(nfta)
        }
      }
    ))
    let raweeR = await rwdContract.pendingRewards(addr)
    const pendingR = ethers.utils.formatUnits(raweeR.toString())
    const finalR = Number(pendingR)
    setPendingRewards(finalR.toFixed(7))
    setSwappedBg(swappedBg)
    setOriginalBg(originalBg)
  };

  const correctChain = () => {
    chainId == 5 ? true : false;
  };

  const DisconnectWallet = async () => {
    try {
      await web3Modal.clearCachedProvider();
      setAccount(null);
      localStorage.setItem("isWalletConnected", false);
    } catch (ex) {
      console.log(ex);
    }
  };

  const calcAddMint = async () => {
    setAmount((amount += 1));
    let totalCost = Number(cost) * amount;
    setTotalCost(totalCost.toFixed(3));
  };

  const calcSubMint = async () => {
    setAmount((amount -= 1));
    let totalCost = Number(cost) * amount;
    setTotalCost(totalCost.toFixed(3));
  };

  const Mint = async () => {
    let totalCost = Number(cost) * amount;
    setTotalCost(totalCost);
    let tx = await contract.mint(addr, amount, {
      value: ethers.utils.parseEther(totalCost.toString()),
    });
    setMinting(true);
    await tx.wait();
    setMinting(false);
    setAmount(0);
    setTotalCost(0);
    let supply = await contract.totalSupply();
    setMinted(parseInt(supply));
  };

  const StakeNFT = async (nfts) => {
    let tx = await stakingContract.batchStake(nfts);
    setStaking(true);
    await tx.wait(3);
    setStaking(false);
    ConnectWallet();
  };

  const UnstakeNFT = async (nfts) => {
    let tx = await stakingContract.batchStake(nfts);
    setUnstaking(true);
    await tx.wait(3);
    setUnstaking(false);
    ConnectWallet();
  };

  const ClaimRewards = async (nfts) => {
    let tx = await stakingContract.claimRewards();
    setClaiming(true);
    await tx.wait(1);
    setClaiming(false);
  };

  const ApproveNFT = async () => {
    let cst = 10000000000
    let amount = ethers.utils.parseEther(cst.toString())
    let tx = await soulsContract.approve(NFTCONTRACT, amount)
    setIsApprovingNFT(true);
    await tx.wait(1);
    setIsApprovingNFT(false);
    setIsTokenApproved(true)
    ConnectWallet()
  };

  const ApproveStaking = async () => {
    let tx = await contract.setApprovalForAll(STAKINGCONTRACT, true);
    setIsApprovingStaking(true);
    await tx.wait(1);
    setIsApprovingStaking(false);
    setIsNFTApproved(true);
    ConnectWallet()
  };

  const swapBG = async () => {
    let tx = await contract.changeImageBG([images], [urls]);
    await tx.wait(1);
    ConnectWallet()
  };

  const ClaimRwd = async () => {
    let tx = await rewardContract.claim();
    setIsClaimingReward(true)
    await tx.wait(1);
    setIsClaimingReward(false)
    ConnectWallet()
  };

  return (
    <WalletConnectContext.Provider
      value={{
        account,
        ConnectWallet,
        Mint,
        isConnected,
        isStaking,
        isUnstaking,
        setAmount,
        amount,
        isMinting,
        isClaiming,
        cost,
        minted,
        DisconnectWallet,
        totalCost,
        calcAddMint,
        calcSubMint,
        correctChain,
        walletNfts,
        stakedNfts,
        StakeNFT,
        UnstakeNFT,
        stakingRewards,
        ClaimRewards,
        isTokenApproved,
        isNFTApproved,
        isClaimingReward,
        isApprovingNFT,
        isApprovingStaking,
        ApproveNFT,
        ApproveStaking,
        swapBG,
        swappedBg,
        originalBg,
        tokenBalance,
        ClaimRwd,
        rewards
      }}
    >
      {children}
    </WalletConnectContext.Provider>
  );
};
