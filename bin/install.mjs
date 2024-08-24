#!/usr/bin/env node
import { promisify } from "util";
import cp from "child_process";
import path from "path";
import fs, { existsSync, mkdirSync } from "fs";
import ora from "ora";
import chalk from "chalk";
import inquirer from "inquirer";
import { downloadTemplate } from "giget";

// convert libs to promises
const exec = promisify(cp.exec);
const rm = promisify(fs.rm);

// if (process.argv.length < 3) {
//    console.log("Kamu harus menamai projek anda!");
//    console.log("Contohnya :");
//    console.log(chalk.green.bold("   npx create-express-stack my-server"));
//    process.exit(1);
// }

const templates = ["prisma", "mongoose"];
const dirName = templates;
const config = {
  directory: dirName,
  repository: "starter",
  user: "AzuraCoder",
  ref: "main",
};
const question = [
  {
    name: "project-name",
    type: "input",
    message: "What is your name?",
    default: "my-server",
  },
  {
    name: "project-template",
    type: "list",
    message: "Which template do you want to use?",
    choices: templates,
  },
];

//  const projectName = process.argv[2];
// const projectPath = path.join(currentPath, projectName);

// change to your boilerplate repo
const git_repo = "https://github.com/Rauliqbal/create-express-stack.git";
const mongoose = "https://github.com/AzuraCoder/mongoose-template.git"

inquirer.prompt(question).then(async (answers) => {
  const projectName = answers["project-name"];
  const projectTemplate = answers["project-template"];
  const currentPath = process.cwd();
  const projectPath = path.join(currentPath, projectName);

  

  if (fs.existsSync(projectPath)) {
    console.log(
      `Projek ${chalk.green(
        projectName
      )} sudah ada di direktori saat ini, harap beri nama lain🙏🏻.`
    );

    process.exit(1);
  } else {
    fs.mkdirSync(projectPath);
  }

  try {
    const gitSpinner = ora("Downloading files🚀...").start();
    await exec(`git clone --depth 1 https://github.com/AzuraCoder/${projectTemplate}-template.git  ${projectPath} --quiet`);
    gitSpinner.succeed();

    const cleanSpinner = ora("Tunggu sebentar yaa😁...").start();

    // Copy environment variables
    // fs.copyFileSync(path.join(projectPath, '.env.example'), path.join(projectPath, '.env'));

    // remove my git history
    const rmGit = rm(path.join(projectPath, ".git"), {
      recursive: true,
      force: true,
    });
    // // remove the installation file
    // const rmBin = rm(path.join(projectPath, "bin"), {
    //    recursive: true,
    //    force: true,
    // });
    // // remove license file
    // const rmLicense = rm(path.join(projectPath, "LICENSE"), {
    //    recursive: true,
    //    force: true,
    // });
    // // remove env file
    // const rmEnv = rm(path.join(projectPath, ".env.example"), {
    //    recursive: true,
    //    force: true,
    // });

    await Promise.all([rmGit]);

    process.chdir(projectPath);
    // remove the packages needed for cli
    await exec("npm uninstall ora cli-spinners");
    cleanSpinner.succeed();

    const npmSpinner = ora("Installing dependencies...").start();
    await exec("npm install");
    npmSpinner.succeed();

    console.log("🎉Yeay, projek Express Stackmu sudah siap🥳");
    console.log(chalk.gray("Get started with:"));
    console.log(chalk.green.bold(`    cd ${projectName}`));
    console.log(chalk.green.bold(`    npm run dev`));
    console.log("   ");
    console.log(chalk.blue.bold(" Happy Coding!👾 "));
  } catch (error) {
    // clean up in case of error, so the user does not have to do it manually
    fs.rmSync(projectPath, { recursive: true, force: true });
    console.log(error);
  }
});
