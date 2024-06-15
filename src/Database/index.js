import chalk from "chalk";
import mongoose from "mongoose";

export const Database = (db_url) => {
  mongoose
    .connect(db_url)
    .then(() =>
      console.log(
        `${chalk.bgGreen(" INFO ")} ${chalk.blue(
          "MongoDB connected successfully"
        )}`
      )
    )
    .catch((error) =>
      console.log(
        `${chalk.bgRed(" ERROR ")} MongoDB not connected : ${chalk.red(error)}`
      )
    );
};
