import TronWeb from "tronweb";
const TRON_PRO_API_KEY = process.env.REACT_APP_TRON_PRO_API_KEY;
const tronWeb = new TronWeb({
  fullHost: "https://api.trongrid.io",
  headers: { "TRON-PRO-API-KEY":  },
  privateKey: "your private key",
});
