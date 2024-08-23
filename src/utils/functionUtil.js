import bcrypt from "bcrypt";

export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const isValidPassword = (user, password) => {
  console.log("isValidPassword!");
  console.log("password: ", password);
  console.log("user.password: ", user.password);

  return bcrypt.compareSync(password, user.password);
};
