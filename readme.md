# NGOTrust - Blockchain-Based Transparent Donation System

## 📌 Overview
NGOTrust is a blockchain-powered donation platform designed to ensure **transparency and accountability** in NGO funding. Using **XinFin (XRC20) smart contracts**, we enable donors to track their funds and ensure they reach verified NGOs without intermediaries.

## 🚀 Features
### ✅ Core Features
- **NGO Registration & Verification**: NGOs sign up, and an admin verifies them before they receive donations.
- **Donor Portal**: Donors browse verified NGOs and donate XRC20 tokens.
- **Blockchain-Based Donation Tracking**: Every transaction is recorded on the XinFin blockchain for complete transparency.
- **Smart Contract for Secure Donations**: Funds go directly to NGO wallets without middlemen.
- **NGO Dashboard**: NGOs can view total donations received and submit fund usage reports.
- **Donor Dashboard**: Donors can track their donation history with blockchain transaction links.

## 🛠️ Tech Stack
| Component  | Technology |
|------------|-----------|
| **Frontend** | HTML, CSS, JavaScript (or React if time permits) |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (to store NGO details) |
| **Blockchain** | XinFin (XRC20 Smart Contracts) |
| **Web3 Connection** | Web3.js |

## 💰 How Donations Work
Since donors have **Indian Rupees (INR)** but donations are in **XRC20 tokens**, we use **a manual conversion approach**:
1. **Donor Buys XRC20 Tokens** from an exchange (guide provided on the website).
2. **Donor Transfers Tokens to Their Wallet** (MetaMask/XDC Pay).
3. **Website Detects Wallet Balance** and allows donations.
4. **Donor Sends XRC20 Tokens to the NGO** via the smart contract.
5. **Transaction is Recorded on Blockchain** for transparency.

## 📜 Smart Contract Functionality
- **Stores verified NGO wallet addresses.**
- **Receives XRC20 tokens from donors.**
- **Transfers funds directly to the NGO's wallet.**
- **Records transaction data for transparency.**

## 🚀 Quick Start Guide
1. Clone this repo:  
   ```bash
   git clone https://github.com/yourusername/NGOTrust.git
   cd NGOTrust
   ```
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Start the backend server:  
   ```bash
   npm start
   ```
4. Open `index.html` in a browser to access the frontend.

## 🎯 Roadmap (Future Enhancements)
- 🔹 **AI-powered fraud detection** to prevent fund misuse.
- 🔹 **Fiat-to-Crypto integration** for direct INR donations.
- 🔹 **Advanced NGO analytics & automated fund tracking.**

## 🤝 Contributing
Contributions are welcome! Feel free to submit pull requests to enhance the project.

## 📜 License
MIT License. Free to use and modify.

---

🚀 **NGOTrust - Ensuring Trust in Donations via Blockchain!**

