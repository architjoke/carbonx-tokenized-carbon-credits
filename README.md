# CarbonX – Tokenized Carbon Credits with Automatic Verification

## Overview

CarbonX is an advanced **Web3 + AI powered MVP** built for the *Unstoppable Hackathon*.  
The project focuses on **tokenizing carbon credits as real-world assets (RWA)** with **automatic AI-based verification**, ensuring transparency, trust, and fraud prevention.

CarbonX bridges the gap between **climate impact measurement** and **blockchain enforcement**.

---

## Why CarbonX?

Traditional carbon credit systems suffer from:
- Manual and expensive verification
- Centralized trust in auditors
- Data manipulation risks
- Double counting of credits
- Low transparency for buyers

CarbonX solves these problems using:
- AI-based confidence scoring
- Decentralized oracle verification
- On-chain lifecycle enforcement
- Immutable proof storage

---

## Key Features

- AI-powered carbon project verification
- Automatic on-chain project submission
- IPFS-backed immutable verification proofs
- ERC-1155 based carbon credit tokens
- Oracle-based multi-step verification
- Credit minting and retirement support
- Real-time frontend dashboard
- Risk & trust scoring visualization

---

## High-Level Architecture

Frontend (React)
↓
FastAPI Backend (Oracle)
↓
AI Confidence Engine
↓
IPFS Proof (CID)
↓
Polygon Smart Contract (ERC-1155)

---

## Tech Stack

### Blockchain
- Solidity (ERC-1155)
- Hardhat
- Polygon Amoy Testnet
- OpenZeppelin

### Backend (Oracle)
- Python
- FastAPI
- Web3.py
- Pydantic
- dotenv

### Frontend
- React
- TailwindCSS
- Custom Hooks
- REST APIs

### AI Layer
- Rule-based AI confidence model (hackathon-safe)
- Easily replaceable with real ML models

### Storage
- IPFS (simulated via cryptographic hashing)

---

## Project Structure

carbonx/
├── blockchain/
│   ├── contracts/
│   ├── scripts/
│   ├── test/
│   ├── hardhat.config.js
│   └── .env
│
├── backend/
│   ├── oracle/
│   │   ├── signer.py
│   │   ├── verifier.py
│   │   ├── ipfs.py
│   │   ├── schemas.py
│   │   └── config.py
│   └── main.py
│
├── frontend/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   └── App.jsx
│
└── README.md

---

## Installation & Setup

### 1. Blockchain Setup

cd blockchain
npm install
npx hardhat compile
npx hardhat test

Deploy contract:
npx hardhat run scripts/deploy.js --network polygon_amoy

---

### 2. Environment Variables

Create blockchain/.env:

RPC_URL=https://rpc-amoy.polygon.technology
PRIVATE_KEY=your_private_key
CARBON_CREDIT_ADDRESS=deployed_contract_address

---

### 3. Backend (Oracle)

cd backend
pip install -r requirements.txt
uvicorn main:app --reload

Swagger UI:
http://127.0.0.1:8000/docs

---

### 4. Frontend

cd frontend
npm install
npm run dev

---

## Carbon Credit Lifecycle

1. Project details submitted from frontend
2. AI model generates confidence score
3. Proof data hashed and stored on IPFS
4. Oracle submits project on-chain
5. Smart contract verifies project
6. Carbon credits minted
7. Credits can be retired (burned)

---

## API Endpoints

POST /verify  
- Verifies a project using AI and oracle

GET /project/{id}/status  
- Returns project verification status

GET /credits/{address}  
- Returns total carbon credits of a wallet

---

## Smart Contract Testing

npx hardhat test

Includes tests for:
- Deployment
- Oracle permissions
- Project submission
- Verification logic
- Minting restrictions
- Edge cases

---

## Security & Trust Model

- Role-based oracle permissions
- Immutable IPFS proofs
- On-chain verification state
- AI confidence threshold enforcement
- No centralized authority

---

## Future Improvements

- Satellite imagery & NDVI data integration
- Multi-oracle consensus mechanism
- DAO-based governance
- Carbon credit marketplace
- ESG compliance reporting
- Cross-chain carbon credits

---

## Hackathon Relevance

Category: Real-World Asset Tokenization (RWA)

Why CarbonX stands out:
- Strong real-world climate use case
- AI + blockchain integration
- Clear scalability path
- End-to-end working MVP

---

## Author

Archit Gupta  
CarbonX – Unstoppable Hackathon MVP
