import dotenv from "dotenv";
dotenv.config();
import { Octokit } from "@octokit/core";
import { createAppAuth } from "@octokit/auth-app";
import fs from "fs";

const APP_ID = process.env.GITHUB_APP_ID;
const PRIVATE_KEY = fs.readFileSync(process.env.GITHUB_PRIVATE_KEY_PATH, "utf8");

async function getInstallationOctokit(installationId) {
  return new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: APP_ID,
      privateKey: PRIVATE_KEY,
      installationId: installationId,
    },
  });
}

export { getInstallationOctokit };
