"use client"
import { useState, useEffect } from "react";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import {
    WALLET_ADAPTERS,
    CHAIN_NAMESPACES,
    SafeEventEmitterProvider,
} from "@web3auth/base";

// Web3Auth app client ID
const _clientId =
  "BPlQN8VQBg7YqVrV8_dHN-pP7ZW1B8rFrN3eR6yOnih4k42elSjx1gNynhsvgJTNKFRk0P0cnnRPGgIdgOeGtiI"; // get from https://dashboard.web3auth.io


export default function Signup(){

    const [web3auth, setWeb3auth] = useState<Web3AuthNoModal | null>(null);
    const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);
    const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        const init = async () => {
          try {
            const chainConfig = {
              chainNamespace: CHAIN_NAMESPACES.EIP155,
              chainId: "0x5", // Please use 0x1 for Mainnet
              rpcTarget: "https://rpc.ankr.com/eth_goerli",
              displayName: "Goerli Testnet",
              blockExplorer: "https://goerli.etherscan.io/",
              ticker: "ETH",
              tickerName: "Ethereum",
            };
    
            const web3auth = new Web3AuthNoModal({
              clientId: _clientId,
              chainConfig,
              web3AuthNetwork: "cyan",
              useCoreKitKey: false,
            });
    
            const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });
    
            const openloginAdapter = new OpenloginAdapter({
              privateKeyProvider,
              adapterSettings: {
                network:"testnet",
                uxMode: "popup",
                loginConfig: {
                  jwt: {
                    verifier: "gameone-testing-verifier", // Verifier name
                    typeOfLogin: "jwt",
                    clientId: "tuKnUwyhHczmwhJzSzcUE0IcUa09RzjC", // Auth0 client id
                  }
                }
              },
            });

            console.log("Open login adapter is here ", openloginAdapter);
            
            web3auth.configureAdapter(openloginAdapter);
            setWeb3auth(web3auth);
            console.log("Web 3 auth is here ", web3auth);
            
    
            await web3auth.init();
            setProvider(web3auth.provider);
    
            if (web3auth.connected) {
              setLoggedIn(true);
            }
          } catch (error) {
            console.error(error);
          }
        };
    
        init();
    }, []);


    const login = async () => {
        if (!web3auth) {
          alert("web3auth not initialized yet");
          return;
        }
        const web3authProvider = await web3auth.connectTo(
          WALLET_ADAPTERS.OPENLOGIN,
          {
            relogin: true,
            loginProvider: "jwt",
            extraLoginOptions: {
              domain: "https://dev-c056h3qtwxbiffvq.us.auth0.com",
              verifierIdField: "sub",
              // connection: "google-oauth2", // Use this to skip Auth0 Modal for Google login.
            },
          }
        );
        setLoggedIn(true);
        setProvider(web3authProvider);
    };

    const getUserInfo = async () => {
        if (!web3auth) {
          alert("web3auth not initialized yet");
          return;
        }
        const user = await web3auth.getUserInfo();
        console.log(user);
      };

    return(
        <div>
            <div>Check status of web3Auth {loggedIn}</div><br/><br/><br/>
            <button onClick={login}> LOGIN button</button><br/><br/><br/>
            <button onClick={getUserInfo}>GET user info</button>
        </div>
    )
}