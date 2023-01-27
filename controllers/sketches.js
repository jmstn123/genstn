import * as fs from "fs";
import path from "path";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
// Configure this to the network you deployed your contract to ;
const sdk = new ThirdwebSDK("mainnet");

const tokenHashes = ['0xf50f4f73776a29ae1bacff5bdb9c792c8d2bdb8876de185962aef966c5a18543',
  '0x72edf9c75e1ed7f247f50a36aa01cb74d58934101af4cdfc75b2baacf03a385e',
  '0xf3766b22f4700e27bd35f71325e5afde7e774c308a085851e124ac7ab0797e81',
  '0xf2da71512effe55d6ff557947922879821c91b75c8e912c1f350c64842cbade3',
  '0xb8e9f7bc62b214e146d4dccc5fd5c9149d89618226604b29f85bc2f8fe205507',
  '0x61adf98dd95fc1ea978ac269c4875c71bbf0388304f75de0ee5e87cc29828c43',
  '0xf007495e54bb0e3777dc7c41acf6d8432cf66779f594c80911af029f137a0a36',
  '0xd8de8596b5e667497cf0d0678e7278dd146f7826162858f1e4125f2dd6c00f56',
  '0x9c7687006feefdcae06c767ff6f2d8d29f6723afe36f2c90cda1abf2a82f7350',
  '0x025d50c1cb7f817177940752fb0ad8374d85218e51c051ea8a1118f254c4ae3c',
  '0xc263ec882bad80d6f671dafe8358e9e45baf18ea800dc5a2a664ccfca2e2754f',
  '0x7c09a8c5139dffc75b6e517537bfa3592ddb149dec7b86eaae898d3f6cac7f19',
  '0x17d27b15e40f2b54773f72443fcfaf477e49fc71e60a0818fc52733b6fe5859c',
  '0xff76d1820264b167f9957ccf67588a37c600164494cdaf473c29c8db64a1a8b7',
  '0xea54760c3259b3a68363a61a54df87f302844a5f8ac90fbc28522cd4ab41da89',
  '0x3284efb315063c3df24ae81b2881d6194380edce3bac09ac604c103b18602918',
  '0x186703107df6660d084b0dcda498d7086572b8c974afbb35a2004104734e96f8',
  '0x05f85451c563d28b1aea2f64af455380442a21cff2a565e7fff055e9bd464536',
  '0x5c518eb1d57ae6b230013a5eabb16463ae04b9eebfca0230d77fee00a228ca1f',
  '0x1b1822598438b51fa7b42987955efc19853b11e8d546dacb6aa396481e405a62',
  '0xf9743d4a1207a7d4b39e65ddcd01815fa9141c506e8bdea110b1259a0d9b60f4',
  '0xad60fa0f2d5520596b2745d835005d9f6c18157c40ef57c78f646f075b875fde',
  '0x290d618ea546465b91f53e647502cffe57bf5ee1dfd7a384ff56f7c65b277f3b',
  '0x29f7781ecba53df2f705a8f628b17ed00a80366e0451a3f0303372b8ad06341d',
  '0x1d401135ad7c4294e6efd48418d84dd5db1e87dbf4859190111990896e3e3c63',
  '0x07715135887538c64dfe4ad02c85f8ed3b48e551cb939217bad6897f2d896606',
  '0x93f3dea65c6186d3cdc050a24ca1d34a33b4ef3ec4ea5dac94e969a47047bdb3',
  '0xedf79ff461a6199addd515bf414dfa9143865b07db9561ec71a3c4fdeeba44b6',
  '0x78cf79c881318434b549bf90922aa421e5cfed1afdb30a7d64429643651a3c6f',
  '0x9325a3977a752bdf4532451190ce8765cacf16b02b890c01f7330f30742b445f',
  '0x116228b12eb1c8202044944d85cf6b282fed44ce813f5d77e4a115ffb44ef2ac',
  '0xa7e0f6f2e6da493344f71d3be9474d053ae0d66d48876a822da875e2c7c789bd',
  '0xd544645d38f8b68de0f4873aff1f0ccac57e9ae74ff6a9761fb76cecd049c961',
  '0x86830e237200d1b234c2a0b3df9a37482dd715194bd900c61faf760f49627bb1',
  '0xb254105caffb0c893ad026f582e8cff9e232bff9328704e0205f88fba33fb229',
  '0x87a42b5daee27026a8e08f78f9a5dbad72cbb132f5c24796ac36c23c957e87e4',
  '0xa9eead6714c43271b8981f7336c18a7ec7df7e7dc336a10a297a4da39ce052d3',
  '0x48528c52baff09963ab43a083a0f73634ebfc0ef1fa3a86b495fab437e594be2',
  '0xfdc1ebe5ecfe13b2abc572da3c3d1cd5e2de9ecc35a45c580ce699897f79bf7c',
  '0x2d1b5f14cec369a34480aece8040fc01174aa149f6ce9aa5ad227ceb8fd830f3',
  '0x6e4d319922321fe527caa9b12615eb7c7eb2f3721e40b57c4e9395d397a9cc77',
  '0x4fb8aee71e82bd11052e14ab952eaa88b42e4f33067f782a412a50504e7419c3',
  '0x250ea849006948981f0c5096ce2ad518bcb477ba94a621077d31ee504674a671',
  '0x340c79399e39651fffb7b41cb1fa5c906d1ed587bb50a6d0a1053ca2574d9169',
  '0xabd9b111400edde4aff917611b9cff135a7b660415c86dff617f805b566e798e',
  '0x7c739cef18edac0f11339c94ccf389e67e09e46616dd91c27f620929ebf8d2d7',
  '0x9eeb4d0e689fb8925b1cf3c498367de5271bebdde28b216e61ff5afed92e89ad',
  '0x9be6505ffbbbe8738ef1f9428e119242859013866c85ece2d8fbde67e550dc14',
  '0x6e42ced6640860c6ae75b397c386275731cc12d295f58794c860927f7d16eb35',
  '0x282bd16e3eb4cd5376001044934056bed3d992b506e2e7fbf0da57681fb3c349',
  '0x0c9a82db506eb4f505f4cf3fef92c7744468090a003f596f6601780dfcbeb39a',
  '0x8f26a3a55b44b0752da8726083794aac115163e5eb5113edc073aaccbd14d475',
  '0xe457e6f6b45daac8a926ed200959fb7da4be8a352a3255a5845fdbf283d4e4f6',
  '0x40cba7b2e18f1960c35e69892406322d6be52c824d284bc89f1a6f42407fa8b8',
  '0x94d9f686d4e179173c0d0bb5cac63a65a811f0596d943c682221383fb169a1d0',
  '0xf29a1d19b3737165ec0ef35946ffccb0c62cf1e7bf42bf7c7d17de3ed0807647',
  '0x4b336a1817bc1e95c959f1c281557cc4dbcbaec27333a6448c55d66a9f6e203e',
  '0x1782de1840d57311d076b3de4da7a61b133819dae58ff49e6f29378035ea875f',
  '0x805ac36934f59a81dc73037d88edc036af307dd14d11c72d1e70f13e5c538902',
  '0xadd3a152120c200c86d2e14c1e8845de2d6aed7118ae3b1cea4d5275515f1137',
  '0x12b55f512bb06ab4243759ac7b4e35b0c93a877d2c4d85892d868d99eb2d9b50',
  '0xbb861a982191b5198f96c87e6266d7878b82ced6fb1dd323ac60727e0213730e',
  '0xc60547df7ea0e11e51f119809989c524dfbc35b2056fa1a01cc0f20bd4630a97',
  '0x0141c45cb1fe6542fcac165659abe86c365fbf5a37d8f2688ae2799065c5d368']

  const scriptStr = `const hashPairs = [];
  for (let j = 0; j < 32; j++) {
    hashPairs.push(tokenData.hash.slice(2 + (j * 2), 4 + (j * 2)));
  }
  
  // Parse the hash pairs into ints. Hash pairs are base 16 so "ec" becomes 236.
  // Each pair will become a value ranging from 0 - 255
  const decPairs = hashPairs.map(x => {
    return parseInt(x, 16);
  });
  
  // Grab the first 16 values of the hash to use as a noise seed.
  const seed = parseInt(tokenData.hash.slice(0, 16), 16);
  
  
  let sinoid, cosoid;
  
  let yoffset = 0;
  
  let boing;
  
  let chaos_toggle = 0;
  let loopTog = true;
  let y;
  let crossover_x;
  let crossover_y;
  let noiseModifier;
  let wobbliness;
  let straightness;
  let straightness_chaos;
  let farness;
  let boing_preserve;
  let cointoss;
  
  let colVariant;
  let variantChoice;
  let palettes = [
    [0, 155, 155], //cyan 0
    [251, 206, 177], //peachy 1
    [220, 190, 250], //lilac 2
    [111, 2, 213], //deep purple 3
    [139, 168, 193], //metallic blue 4
    [218, 165, 32], //golden 5
    [255, 255, 255], //white 6
    [255, 255, 255, 115], //ghost 7
    [112, 38, 112], // midnight 8
  ];
  
  let palette;
  
  let bgPalettes = [
    [25, 25, 25], //night
    [128, 128, 128], // grey
    [240, 234, 214], // eggshell
  ];
  
  let bgPalette;
  
  function setup() {
    createCanvas(1200, 1200);
   
    noiseSeed(seed);
    // setup randomness
    crossover_x = int(decPairs[23] % 2);
    crossover_y = int(decPairs[24] % 2);
    if (crossover_x == 1) {
      crossover_y = 1;
    }
  
    
  
    noiseModifier = int((decPairs[25] % 2)+2);
  
    selected = (decPairs[28] % 8);
    palette = palettes[selected];
  
    wobbliness = int(decPairs[21]+125);
    
    console.log(wobbliness)
    
    boing = int((decPairs[22] % 3)+1);
    boing_preserve = boing;
    
    
    straightness = int((decPairs[28] % 100)+300);
  
    farness = int((decPairs[18] % 6)+3)/(14);
  
  
    if (
      selected == 0 ||
      selected == 1 ||
      selected == 2 ||
      selected == 6 ||
      selected == 7
    ) {
      bgPalettes = [[25, 25, 25]];
    }
  
    if (selected == 3 || selected == 8) {
      bgPalettes = [
        [25, 25, 25],
        [240, 234, 214],
      ];
    }
    
    
    if (selected == 4 || selected == 5) {
      bgPalettes = [25, 25, 25];
    }
    
    
    
  
    if (variantChoice == 1 && colVariant == 25) {
      bgPalettes = [[25, 25, 25]];
    }
  
    if (variantChoice == 2 && colVariant == 25) {
      bgPalettes = [[25, 25, 25]];
    }
    // console.log(palette);
    // console.log(bgPalettes);
  
    selected = bgPalettes.length;
    selected = int(decPairs[29] % selected)
    bgPalette = bgPalettes[selected];
  }
  
  function draw() {
    fill(palette);
    background(bgPalette);
  
    sinoid = sin(frameCount / 250) * width;
    cosoid = cos(frameCount / 250) * width;
  
    if (decPairs[23] % 120 == 0) {
      if (decPairs[19] % 2 == 0) {
        fill(222, sinoid * 0.6, 100);
      }
      if (decPairs[19] % 2 == 1) {
        fill(sinoid * 0.5, 100, 101);
      }
    }
  
    beginShape();
    let xoffset = yoffset;
  
    for (let x = 0; x <= width; x += boing) {
      if (chaos_toggle == 0) {
        y = map(noise(xoffset, yoffset), 0, farness, wobbliness, straightness);
      } else {
        straightness_chaos = int(random(525, 625));
        y = map(noise(xoffset, yoffset), 0, 3/10, wobbliness, straightness_chaos);
      }
  
      vertex(height - y, height - x);
      vertex(height, height - x);
  
      xoffset += 0.001 * pow(noiseModifier, 2); // affects the *noise*
    }
  
    if (chaos_toggle == 0) {
      yoffset += 0.005;
      vertex(height * crossover_x, width * crossover_y);
      vertex(height, height);
    } else {
      yoffset += 0.035;
      vertex(width, (sinoid * height) / int(random((3*height)/4, height)));
      vertex(int(random(height, 2000)), height);
    }
  
    endShape(CLOSE);
  
    stroke(25, 25, 25, 2);
  
  }
  
  function doubleClicked() {
    boing += 1;
    // increase boing when click
  }
  
  function keyPressed() {
    if (keyCode === LEFT_ARROW) {
      chaos_toggle = 1;
    }
    if (keyCode === RIGHT_ARROW) {
      chaos_toggle = 0;
    }
  
    if (keyCode === BACKSPACE) {
      boing = boing_preserve;
    }
  
    if (keyCode === RETURN) {
      if (loopTog) {
        noLoop();
        loopTog = false;
      } else {
        loop();
        loopTog = true;
      }
    }
  }`;


const getScript = async (tokenId) => {
  // Your contract address from the dashboard
  //const contract = await sdk.getContract("0xb9Df8c7c073BF6F1CD392874e340289EE974DD30");
  // Get the script from the contract
  // var scriptStr = await contract.call("script"  

  const hash = tokenHashes[tokenId]
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
    "./public/token/js/pieces/mySketch" + tokenId + ".js"
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
