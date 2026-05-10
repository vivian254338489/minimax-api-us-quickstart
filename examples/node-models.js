const apiKey = process.env.TKEN_API_KEY;

if (!apiKey) {
  throw new Error("Set TKEN_API_KEY before running this example.");
}

const response = await fetch("https://www.tken.shop/v1/models", {
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
});

if (!response.ok) {
  const body = await response.text();
  throw new Error(`Request failed: ${response.status} ${body}`);
}

console.log(JSON.stringify(await response.json(), null, 2));
