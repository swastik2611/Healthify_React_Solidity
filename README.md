# Healthify_React_Solidity
A Dapp using ReactJS, Solidity.
A decentralized ledger to store and access patient records

## Packages Required:-
- Truffle v5.10.1 (core: 5.10.1)
- Ganache v7.8.0
- Solidity v0.5.16 (solc-js)
- Node v16.16.0
- Web3.js v1.10.0
- npm v8.11.0

## Other Requirements:-
Any chromium based browser i.e. Chrome
Metamask browser extension

## Steps to run after forking the project:
### 1) Go to the project folder and install required packages
```
 cd client
 npm install
```
### 2) Compile contract source files and mi. (Compilation and deployment can be done using truffle migrate):-
```
 truffle compile
```
### 3) In chrome, open metamask 
   - add new test network using  
        - NETWORK ID (i.e. 5777 ,from Ganache Server settings) 
        - RPC SERVER (i.e HTTP://127.0.0.1:7545 ,from Ganache Server settings)
        - CHAIN CODE (i.e. 1337)
   - import account using private key of any account from local blockchain available in Ganache.

### 4) In terminal, run following commands:-
- Run migrations to deploy contracts.
```
 truffle migrate 
 OR
 truffle migrate --reset (for migrating after editing the solidity contract)
```
- Please fork the project :) 

- To start a server and it will open a homepage file in the default browser.
```
npm start
``` 
### 5) Login to metamask ,and connect to the site manually(i.e.localhost:3000)
### 6) Interact with website
