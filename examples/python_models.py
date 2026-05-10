import os

import requests


api_key = os.environ.get("TKEN_API_KEY")
if not api_key:
    raise SystemExit("Set TKEN_API_KEY before running this example.")

response = requests.get(
    "https://www.tken.shop/v1/models",
    headers={"Authorization": f"Bearer {api_key}"},
    timeout=30,
)
response.raise_for_status()
print(response.json())
