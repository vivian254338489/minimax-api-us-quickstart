# MiniMax API Quickstart for Open WebUI, OpenCode, and OpenAI-Compatible SDKs

One practical page for developers who want to test MiniMax from the US through OpenAI-compatible tooling.

Use it when you want to:

- connect MiniMax-style routes to Open WebUI or an OpenAI-compatible SDK
- sanity-check a base URL with `/v1/models`
- run a minimal chat request before wiring a real app
- avoid committing API keys while testing

## Quick Start

Create an account and open the API key page:

[Start with 5 USD free trial credit](https://www.tken.shop/register?next=%2Fconsole%2Ftoken&utm_source=github&utm_medium=owned_repo&utm_campaign=minimax_openwebui_opencode_quickstart_202605&utm_content=readme_cta)

1. Register or sign in.
2. Open the API Key page.
3. Create a key.
4. Copy the quickstart `curl` command from the token page.

Keep the key private. Do not commit it to GitHub, paste it into issues, or share it in screenshots.

## 1. Test the Base URL

Set your key as an environment variable:

```bash
export TKEN_API_KEY="replace-with-your-api-key"
```

Run a simple models request:

```bash
curl https://www.tken.shop/v1/models \
  -H "Authorization: Bearer $TKEN_API_KEY"
```

If this returns model metadata, authentication and network access are working.

## 2. Minimal Chat Request

Use the OpenAI-compatible Chat Completions shape:

```bash
curl https://www.tken.shop/v1/chat/completions \
  -H "Authorization: Bearer $TKEN_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "MiniMax-M1",
    "messages": [
      {"role": "user", "content": "Write a one sentence test response."}
    ]
  }'
```

Model availability can change by account and route. If a model name fails, check the model list returned by `/v1/models` and use an available route.

## 3. Open WebUI Setup

Open WebUI supports OpenAI-compatible provider connections. Use these values as a starting point:

```text
API base URL: https://www.tken.shop/v1
API key: your TKEN API key
Model: choose one returned by /v1/models
```

Smoke test first with `/v1/models`; then add the base URL in Open WebUI and select an available model.

## 4. OpenCode Setup

MiniMax's official docs describe OpenCode configuration for MiniMax coding models. If your workflow uses OpenCode directly, follow the OpenCode auth flow and enter your MiniMax key when prompted.

For gateway-style testing through this quickstart, keep the same validation order:

1. Confirm the API key works with `/v1/models`.
2. Confirm a chat completion works.
3. Only then configure your coding tool.

## 5. Hailuo / Video API Note

MiniMax's video generation APIs are asynchronous: create a task, poll task status, then download the file when ready. Do not debug video generation before your key and base URL pass the simple model-list or chat test.

## Node.js Example

```js
const response = await fetch("https://www.tken.shop/v1/models", {
  headers: {
    Authorization: `Bearer ${process.env.TKEN_API_KEY}`,
  },
});

if (!response.ok) {
  throw new Error(`Request failed: ${response.status}`);
}

console.log(await response.json());
```

## Python Example

```python
import os
import requests

response = requests.get(
    "https://www.tken.shop/v1/models",
    headers={"Authorization": f"Bearer {os.environ['TKEN_API_KEY']}"},
    timeout=30,
)
response.raise_for_status()
print(response.json())
```

## Common Checks

- `401`: API key is missing, invalid, or copied with extra spaces.
- `404`: endpoint path or base URL is wrong.
- `429`: rate limit or balance limit; slow down and check account usage.
- Empty response in local code: print status code and response text before parsing JSON.

## What to Measure

For a real integration test, track these steps:

1. Registration completed.
2. API key created.
3. Key or quickstart command copied.
4. First API request succeeds.
5. The test app moves from `/v1/models` to a real chat, image, audio, or video route.

## Notes

This repository is a practical quickstart for developers evaluating MiniMax-related API routes and OpenAI-compatible tooling from the US. It is not an official MiniMax repository.

## Sources

- MiniMax OpenCode docs: https://platform.minimax.io/docs/coding-plan/opencode
- MiniMax video generation docs: https://platform.minimax.io/docs/api-reference/video-generation-intro
- Open WebUI OpenAI-compatible provider docs: https://docs.openwebui.com/getting-started/quick-start/connect-a-provider/starting-with-openai-compatible
