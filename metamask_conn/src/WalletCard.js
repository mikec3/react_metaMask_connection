// https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider

import React, {useState} from 'react'
import Web3 from 'web3'
import './WalletCard.css'

const WalletCard = () => {

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);

	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {
			console.log('MetaMask Here!');

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => accountChangedHandler(result[0]));

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

	const accountChangedHandler = (newAccount) => {
		console.log('Account Changed');
		setDefaultAccount(newAccount);
	}

	// listen for account changes
	window.ethereum.on('accountsChanged', accountChangedHandler);
	
	return (
		<div className='walletCard'>
			<button onClick={connectWalletHandler}>Connect Wallet</button>
			<div className='accountDisplay'>
				<h3>Address: {defaultAccount}</h3>
			</div>
			<div className='balanceDisplay'>
				<h3>Balance: {userBalance}</h3>
			</div>
			{errorMessage}
		</div>
	);
}

export default WalletCard;