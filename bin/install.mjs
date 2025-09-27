#!/usr/bin/env node
import { promisify } from "util";
import cp from "child_process";
import { join } from "path";
import fs, { existsSync, mkdirSync, rmSync } from "fs";
import ora from "ora";
import chalk from "chalk";
import inquirer from "inquirer";

// convert libs to promises
const exec = promisify(cp.exec);
const rm = promisify(fs.rm);

let projectPath = "";

process.on("SIGINT", () => {
  if (projectPath && existsSync(projectPath)) {
    rmSync(projectPath, { recursive: true, force: true });
    console.log(chalk.red("\n 🧹 Folder project sementara dihapus."));
  }
  console.log(chalk.yelllowBright("❌ Proses dibatalkan oleh pengguna"));
  process.exit(0);
});

// ASCII ART
const asciiArt = `                                             
 _____                     _____ _           _   
|   __|_ _ ___ ___ ___ ___|   __| |_ ___ ___| |_ 
|   __|_'_| . |  _| -_|_ -|__   |  _| .'|  _| '_|
|_____|_,_|  _|_| |___|___|_____|_| |__,|___|_,_|
          |_|                                                                                
`;

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
    type: "input",
    name: "project-name",
    message: "What is the name of your new project?",
    default: "my-server",
    validate: (value) => {
      if (value.includes(" ")) {
        return "Project name cannot contain spaces.";
      }
      if (!/^[a-zA-Z0-9-_]+$/.test(value)) {
        return "Only letters, numbers, dashes (-), and underscores (_) are allowed.";
      }
      return true;
    },
  },
  {
    type: "list",
    name: "project-template",
    message: "Which template do you want to use?",
    choices: templates,
  },
  {
    type: "list",
    name: "package-manager",
    message: "Choose your package manager:",
    choices: ["npm", "pnpm", "bun"],
  },
];

//  const projectName = process.argv[2];
// const projectPath = path.join(currentPath, projectName);

// change to your boilerplate repo
const git_repo = "https://github.com/Rauliqbal/create-express-stack.git";
const mongoose = "https://github.com/AzuraCoder/mongoose-template.git";

console.log(chalk.blue(asciiArt));

const main = async () => {
  try {
    const answers = await inquirer.prompt(question);
    const projectName = answers["project-name"];
    const projectTemplate = answers["project-template"];
    const projectPackageManager = answers["package-manager"];
    const currentPath = process.cwd();

    projectPath = join(currentPath, projectName);

    // Validasi kalo ada nama folder sama
    if (existsSync(projectPath)) {
      console.log(
        chalk.redBright("🚫 Nama project sudah digunakan. Pake nama lain aja")
      );
      process.exit(1);
    } else {
      mkdirSync(projectPath);
    }

    // Clone Project
    const gitLoading = ora("📡 Downloading... Please wait.").start();
    await exec(
      `git clone --depth 1 https://github.com/Rauliqbal/${projectTemplate}-boilerplate.git ${projectPath} --quiet`
    );
    gitLoading.succeed();

    // Setup project
    const setupLoading = ora("🛠️  Setting up your project...").start();
    const rmGit = rm(join(projectPath, ".git"), {
      recursive: true,
      force: true,
    });
    const rmLock = rm(join(projectPath, "package-lock.json"), {
      recursive: true,
      force: true,
    });

    await Promise.all([rmGit, rmLock]);
    process.chdir(projectPath);
    setupLoading.succeed();

    // Install Dependencies
    const installLoading = ora("📦 Installing dependencies...").start();
    await exec(`${projectPackageManager} install`);
    installLoading.succeed();

    console.log(chalk.greenBright("\n🎉 Beres! Project siap dijalankan."));
    console.log(chalk.gray("\nGet started:"));
    console.log(chalk.cyan(`  cd ${projectName}`));
    console.log(chalk.cyan(`  ${projectPackageManager} run dev\n`));
    console.log(chalk.magentaBright("✨ Happy hacking! ✨"));
  } catch (error) {
    if (
      error.isTtyError ||
      error.message?.includes("force closed the prompt")
    ) {
      console.log(
        chalk.yellowBright(
          "\n⚠️ Batal membuat project. Tidak ada perubahan yang terjadi"
        )
      );
    } else {
      console.error(
        chalk.red("\n ❌ Eh, ada error nih saat menjalankan CLI:"),
        error
      );
    }

    if (projectPath && existsSync(projectPath)) {
      rmSync(projectPath, { recursive: true, force: true });
    }

    process.exit(0);
  }
};

main();
