import bcrypt from "bcrypt";

export const comparePassword = async (password, hashedPassword) => {
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    return isPasswordValid;
};