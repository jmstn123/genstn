import * as fs from "fs";
import path from "path";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

// Configure this to the network you deployed your contract to;
const sdk = new ThirdwebSDK("goerli");

const getScript = async (tokenId) => {
  // Your contract address from the dashboard
  const contract = await sdk.getContract("0x65bdBABDc650D390706C5D57BB52e62D03c3906e");
  // Get the script from the contract
  const scriptStr = await contract.call("script");
  const hash = await contract.call("tokenToHash", parseInt(tokenId));

  // this string is appended to the script-string fetched from the contract.
  // it provides hash and tokenId as inputs to the script
  const detailsForThisToken = `const tokenData = {
        hash: "${hash}",
        tokenId: ${tokenId}
    }\n
`;

  // Write the details for this token + the script to a file ../public/token/js/pieces/mySketch.js and await the result
  const filePath = path.resolve(
    path.dirname("."),
    "./public/token/js/pieces/mySketch.js"
  );

  console.log("wrote file");

  await new Promise((resolve, reject) => {
    fs.writeFile(
      filePath,
      detailsForThisToken + scriptStr.toString(),
      "utf8",
      (err) => {
        if (err) {
          reject(err);
        } else {
          console.log("wrote file for real");

          resolve();
        }
      }
    );
  });

  return hash;
};

export { getScript };
