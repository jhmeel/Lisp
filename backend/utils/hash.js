import bcrypt from 'bcrypt'


export const hashPassword = async function (password){
    const hash = await bcrypt.hash(password, 10)
    return process.env.PASS_PREFIX+hash
}

export const comparePassword = async function(enteredPassword,usrPassword) {
    return await bcrypt.compare(`LP${enteredPassword}`,usrPassword);
}



