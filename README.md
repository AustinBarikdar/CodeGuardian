# 🛡️ CodeGuardian — Your AI-Powered Pull Request Reviewer

![GitHub](https://img.shields.io/github/license/AustinBarikdar/CodeGuardian)
![GitHub Stars](https://img.shields.io/github/stars/AustinBarikdar/CodeGuardian?style=social)

**CodeGuardian** is an AI-powered code review assistant designed for small development teams. It hooks directly into your GitHub workflow and automatically provides intelligent, actionable feedback on pull requests using large language models (LLMs) like OpenAI’s GPT-4.

---

## 🚀 Features

* ✅ **Automated AI Code Reviews** on pull requests
* 🧐 **LLM-Powered Feedback** using OpenAI
* 📡 **GitHub App Integration** via Webhooks
* 🔍 Reviews **code diffs**, not full files
* 🛠️ Built with real-world tech used in modern startups
* 💬 Configurable to post summary or inline comments
* 🔒 Secure: Webhook signatures, scoped app permissions

---

## 🎯 Use Case

CodeGuardian helps lean dev teams:

* Catch bugs and bad practices earlier
* Improve code quality without heavy manual review load
* Learn from high-quality, context-aware AI feedback

---

## 🧱️ Tech Stack

| Layer              | Technology                |
| ------------------ | ------------------------- |
| Server             | Node.js, Express          |
| GitHub Integration | GitHub App, Octokit       |
| AI Integration     | OpenAI GPT-4 API          |
| Auth & Security    | HMAC webhook verification |
| Dev Tools          | ts-node, dotenv, ngrok    |

---

## 🗂️ Project Structure

```
CodeGuardian/
├── src/
│   ├── app.js                 # Main Express server
│   ├── services/
│   │   ├── prHandler.js       # Pull request webhook logic
│   │   ├── githubService.js   # GitHub API interaction
│   │   └── aiService.js       # OpenAI integration
│   └── middleware/
│       └── verifySignature.js # HMAC validation
├── private-key.pem            # GitHub App private key
├── .env                       # Environment variables
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/AustinBarikdar/CodeGuardian.git
cd CodeGuardian
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
GITHUB_WEBHOOK_SECRET=your_github_webhook_secret
GITHUB_APP_ID=your_app_id
GITHUB_PRIVATE_KEY_PATH=./private-key.pem
OPENAI_API_KEY=your_openai_key
PORT=3000
```

### 4. Setup your GitHub App’s 

1. Create a GitHub App's and give it Premssion to view pull request "read and write".
2. Make sure your webhook-secret is the same as in the .env.
3. Make sure to download the app to the repo you want to use.
4. Save your downloaded `.pem` file as `private-key.pem` in the root.


### 5. Expose your local server (dev only)
(ngrok download: https://ngrok.com/downloads)

```bash
npx ngrok http 3000
```

Copy the `https://...ngrok.io` URL and update your GitHub App's Webhook URL:

```
https://your-ngrok-id.ngrok.io/webhook
```

### 6. Start the server

```bash
node src/app.js
```

---

## 🥪 How It Works

1. You push a branch and open a pull request.
2. GitHub sends a webhook event to your `/webhook` endpoint.
3. CodeGuardian fetches the PR diff and sends it to OpenAI.
4. The AI analyzes the changes and returns review comments.
5. CodeGuardian posts the feedback directly on the PR.

---

## 📸 Demo (Pull Request)
<img width="3546" height="1238" alt="image" src="https://github.com/user-attachments/assets/2fef3c79-0061-41ee-8b8e-3f37ce3a80f2" />
<img width="1920" height="1916" alt="image" src="https://github.com/user-attachments/assets/ab283b66-f791-404c-b833-2fe4bc962c22" />


---

## 🤝 Contributing

PRs welcome! Open an issue first to discuss your idea.

---

## 📜 License

MIT © [Austin Barikdar](https://github.com/AustinBarikdar)
