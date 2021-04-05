const userService = require('./user.service')


async function getUser(req, res) {
    const user = await userService.getById(req.params.id)
    res.send(user)
}

async function getUsers(req, res) {
    const users = await userService.query(req.query)
    res.send(users)
}

async function deleteUser(req, res) {
    await userService.remove(req.params.id)
    res.end()
}

async function updateUser(req, res) {
    const user = req.body;
    await userService.update(user)
    res.send(user)
}

async function signup(req, res) {
    try {
        const user = req.body;
        const alreadyExisting = await userService.getByEmail(user.email);
        if (alreadyExisting) {
            res.json({error:'Email already exists!'})
        }
        else {
            await userService.signup(user);
            res.json(user);
        }
    }
    catch (err) {
        res.status(401)
        // .json({error:'dsfsdfsdfsdfsd'})
    }
}

async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await userService.login(email, password);
        // console.log(user);
        if (!user) return;
        if(user.error){
            // console.log('err');
            res.json(user)
        }
        else {
            // console.log('session on');
            req.session.user = user;
            res.json(user);
        }
    }
    catch (err) {
        res.status(401)
    }
}

module.exports = {
    getUser,
    getUsers,
    deleteUser,
    updateUser,
    signup,
    login
}