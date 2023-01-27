const tokenData = {
        hash: "0xabd9b111400edde4aff917611b9cff135a7b660415c86dff617f805b566e798e",
        tokenId: 44
    }

const hashPairs = [];
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
  }