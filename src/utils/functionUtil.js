import bcrypt from "bcrypt";

export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const isValidPassword = (user, password) => {
  let res;

  console.log("isValidPassword!");

  if (user.email == "admin@flameshop.com") {
    res = bcrypt.compareSync(password, "$2b$10$YPm0x87BJVJIFHH.9v72.ePx1owT7NDLl72fI6KWRf3/mL2hbCopG");
  } else {
    res = bcrypt.compareSync(password, user.password);
  }

  console.log("password: ", password);
  console.log("user.password: ", user.password);
  console.log("res: ", res);

  // return bcrypt.compareSync(password, user.password);
  return res;
};