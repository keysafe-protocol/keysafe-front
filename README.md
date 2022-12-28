# Use docker

You can use `start.sh` to build and start docker container, change `REACT_APP_BASE_URL` to set request baseurl

# Run this project on your local device

1. Change .env.example to .env
2. Change correct env variales

- REACT_APP_TRON_PRO_API_KEY= Tron end point api, you can get it from [here](https://developers.tron.network/reference/select-network)
- REACT_APP_ETHER_RPC: Ethereum RPC endpoint, you can get it from RPC service like [Infura](https://www.infura.io/) and [Alchamy](https://www.alchemy.com/)

3. Run `yarn start` to start react app, and use env variable
