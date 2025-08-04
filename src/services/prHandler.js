import { getInstallationOctokit } from '../services/githubService.js';
import { getReviewFromAI } from '../services/aiService.js';
// Ensure the necessary environment variables are set
if (!process.env.GITHUB_APP_ID || !process.env.GITHUB_PRIVATE_KEY_PATH) {
  throw new Error("The GITHUB_APP_ID or GITHUB_PRIVATE_KEY_PATH environment variable is missing or empty; please provide them in your environment or .env file.");
}

export async function handlePullRequestEvent(payload) {
  const installationId = payload.installation.id;
  const pr = payload.pull_request;
  const repo = payload.repository;

  const octokit = await getInstallationOctokit(installationId);

  const { data: filesChanged } = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}/files', {
    owner: repo.owner.login,
    repo: repo.name,
    pull_number: pr.number
  });


  const file = filesChanged[0];
  const patch = file.patch;
  const reviewText = await getReviewFromAI(patch); 

  await octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/comments', {
    owner: repo.owner.login,
    repo: repo.name,
    issue_number: pr.number,
    body: reviewText
  });

  console.log("✅ Comment posted.");
}
