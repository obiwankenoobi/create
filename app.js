#!/usr/bin/env node

const fs = require("fs");
const { exec } = require("child_process");
const program = require("commander");
const { reactBasic, reactNativeBasic } = require("./basicComponent");
const {
  basicActions,
  basicIndexReducers,
  basicReducers,
  basicStore,
  basicTypes
} = require("./reduxBasicComponent");
const modules = ["redux", "react-redux", "redux-thunk"];

function createFile(dir, file) {
  fs.writeFile(`src/${dir}/${process.argv[4]}.js`, file, err => {
    if (err) {
      return console.log(err);
    }
    console.log("done");
  });
}

async function checkForSrc() {
  return fs.existsSync("src");
}

program
  .version("0.1.0")
  .arguments("<dir> [platform] [fileName]")
  .action((dir, platform, fileName) => {
    if (dir == "co" || dir == "sc") {
      if (!platform || !fileName) {
        console.log("missing params");
      } else {
        switch (dir) {
          case "co":
            initComponent(platform, fileName, "components");
            break;
          case "sc":
            initComponent(platform, fileName, "screens");
            break;

          default:
            break;
        }
      }
    } else if (dir == "redux") {
      checkForSrc()
        .then(async isSrcExist => {
          if (isSrcExist) {
            return createRedux();
          }
          await createDir("src");
          return createRedux();
        })
        .catch(e => console.log(e));
    } else {
      console.log("missing params");
    }
  });

program.parse(process.argv);

async function createComponent(dir, fileName, file) {
  createDir(dir)
    .then(async res => {
      await createFile(fileName, dir, file(fileName));
      console.log("file created");
    })
    .catch(async e => {
      await createFile(fileName, dir, file(fileName));
    });
}

function initComponent(platform, fileName, screenOrComponent) {
  if (platform == "rc") {
    checkForSrc()
      .then(async isSrcExist => {
        if (isSrcExist) {
          return createComponent(
            `src/${screenOrComponent}`,
            fileName,
            reactBasic
          );
        } else {
          await createDir("src");
          return createComponent(
            `src/${screenOrComponent}`,
            fileName,
            reactBasic
          );
        }
      })
      .catch(e => console.log(e));
  } else if (platform == "rn") {
    checkForSrc()
      .then(async isSrcExist => {
        if (isSrcExist) {
          return createComponent(
            `src/${screenOrComponent}`,
            fileName,
            reactNativeBasic
          );
        } else {
          await createDir("src");
          return createComponent(
            `src/${screenOrComponent}`,
            fileName,
            reactNativeBasic
          );
        }
      })
      .catch(e => console.log(e));
  }
}

async function createRedux() {
  try {
    await createDir("src/redux");
    await createDir("src/redux/actions");
    await createDir("src/redux/reducers");

    await createFile("mainReducers.js", "src/redux/reducers", basicReducers);

    await createFile("types.js", "src/redux/actions", basicTypes);
    await createFile("mainActions.js", "src/redux/actions", basicActions);

    await createFile(
      "mainReducers.js",
      "src/redux/reducers",
      basicIndexReducers
    );
    await createFile("index.js", "src/redux/reducers", basicIndexReducers);
    await createFile("store.js", "src/redux", basicStore);

    checkForModules(...modules).then(res => {
      if (res.length) {
        installModules(res);
      } else {
        console.log("all modules installed");
      }
    });
  } catch (e) {
    console.log(e);
  }
}

function createDir(dirName) {
  return new Promise((resolve, reject) => {
    fs.mkdir(`${dirName}`, { recursive: true }, err => {
      if (err) {
        reject({ msg: `${dirName} dir couldnt be created`, err });
      } else {
        console.log(`${dirName} created`);
        resolve(dirName);
      }
    });
  });
}

function createFile(fileName, filePath, file) {
  return new Promise((resolve, reject) => {
    fs.writeFile(`${filePath}/${fileName}.js`, file, err => {
      if (err) {
        reject({ msg: `${fileName} file couldnt be created`, err });
      } else {
        resolve(fileName);
      }
    });
  });
}

async function checkForModules(...modules) {
  let modulesToInstall = [];
  for (const m of modules) {
    try {
      require.resolve(m);
    } catch (error) {
      modulesToInstall.push(m);
    }
  }
  return modulesToInstall;
}

function installModules(...modules) {
  exec(`npm i -S ${modules[0].join(" ")}`);
}
