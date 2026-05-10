# MiniMax API US Quickstart

Short developer tutorial for making a first MiniMax API test call from the US through an OpenAI-compatible endpoint.

This guide is intentionally small: create an API key, run one `curl` request, then move to a Node.js or Python call when the endpoint is working.

## Start Here

Create an account and open the API key page:

[Start with $5 free trial credit](https://www.tken.shop/register?next=%2Fconsole%2Ftoken&utm_source=github&utm_medium=owned_repo&utm_campaign=minimax_us_quickstart_202605&utm_content=readme_cta)

## 1. Create an API Key

1. Register or sign in.
2. Open the API Key page.
3. Create a key.
4. Copy the quickstart `curl` command from the token page.

Keep the key private. Do not commit it to GitHub, paste it into issues, or share it in screenshots.

## 2. Test the Endpoint

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

## 3. Minimal Chat Request

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

This repository is a practical quickstart for developers evaluating an OpenAI-compatible MiniMax route from the US. It is not an official MiniMax repository.
