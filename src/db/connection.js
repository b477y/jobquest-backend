import mongoose from "mongoose";
import chalk from "chalk";

const connect2db = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log(chalk.bgGreen(`Database connection established successfully`));
  } catch (error) {
    console.log(
      chalk.bgRed(`An error occurred while connecting to the database`)
    );
  }
};

export default connect2db;
