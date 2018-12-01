#!/usr/bin/env node

const fs = require("fs");

const { reactBasic, reactNativeBasic } = require("./basicComponent");
const mainDir = process.argv[2];
const mainPlatform = process.argv[3];

function createFile(dir, file) {
  fs.writeFile(`src/${dir}/${process.argv[4]}.js`, file, err => {
    if (err) {
      return console.log(err);
    }
    console.log("done");
  });
}

if (mainDir == "c" || mainDir == "s") {
  const dir = mainDir == "c" ? "components" : "screens";

  if (mainPlatform == "r" || mainPlatform == "rn") {
    const platform = mainPlatform == "r" ? "react" : "reactNative";
    const file = platform == "react" ? reactBasic : reactNativeBasic;
    fs.mkdir(`src/${dir}`, { recursive: true }, err => {
      if (err) {
        if (err.code == "EEXIST") {
          return createFile(dir, file);
        } else if (err.code == "ENOENT") {
          return console.log("No /src file exist");
        } else {
          console.log(err);
        }
      }
      createFile(dir, file);
    });
  } else {
    console.log('wrong param - try "r" or "rn"');
  }
} else {
  console.log('wrong param - try "c" or "s"');
}
