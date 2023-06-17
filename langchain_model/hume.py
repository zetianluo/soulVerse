import asyncio

from hume import HumeStreamClient
from hume.models.config import LanguageConfig

samples = [
    "Mary had a little lamb,",
    "Its fleece was white as snow."
    "Everywhere the child went,"
    "The little lamb was sure to go."
]

async def main():
    client = HumeStreamClient("B6aoq9ayCvV3V3zXE6pBftxHgHfOBvvggU8mjXJlwOpdSX9m")
    config = LanguageConfig()
    async with client.connect([config]) as socket:
        for sample in samples:
            result = await socket.send_text(sample)
            emotions = result["language"]["predictions"][0]["emotions"]
            print(emotions)

asyncio.run(main())