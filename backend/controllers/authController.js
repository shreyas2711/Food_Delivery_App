const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


async function hashPassword(plainTextPassword) {
    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(plainTextPassword, salt);
        console.log('Hash: ', hash);
        return hash;
    } catch (error) {
        console.error('Error hashing password:', error.message);
        throw error;
    }
}

exports.UserSignUp = (db)=>async(req,res,next)=>{

   try{
    const user_id = uuid.v4(); 
    const {name,email,password,phone} = req.body;
    const hashedPassword = await hashPassword(password);
    // console.log("Password is:")
    const user = await db.query('INSERT INTO Users (user_id,name, email, password, phone) VALUES ($1, $2, $3, $4,$5)', [user_id,name, email, hashedPassword, phone]);


    res.status(200).json({
        success:true,
        message:'User created successfully!',
        user
    })
   }
   catch(error){
    console.error('Error creating user!',error);
    res.status(500).json({
        error:'Internal server error'
    })
   }

}

exports.UserSignIn = (db) => async (req, res, next) => {
    try {
        const { email, password } = req.body;

        

        const result = await db.query('SELECT * FROM Users WHERE email=$1', [email]);
        const user = result.rows[0];
        console.log("this is user:",user)
        if (user) {
            const hashedPassword = user.password;
            console.log("password:",hashedPassword);
            const passwordMatch = await bcrypt.compare(password, hashedPassword);
            console.log("password check:",passwordMatch);
            if (passwordMatch) {
                const token = jwt.sign({ userId: user.user_id }, 'sjlkdksadashdajksda', { expiresIn: 3600 });
                res.cookie('token', token, { maxAge: 60 * 60 * 1000, httpOnly: true });

                res.json({
                    success: true,
                    message: 'Successfully signed in!',
                    token,
                    user
                });
            } else {
                res.status(401).json({
                    success: false,
                    message: 'Invalid credentials!'
                });
            }
        } else {
            res.status(401).json({
                success: false,
                message: 'Invalid credentials!'
            });
        }
    } catch (error) {
        console.error('Error singing in!', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};


exports.UserLogOut = (db)=>async(req,res,next)=>{

    res.clearCookie('token');
    res.status(200).json({
        success:true,
        message:"Logged out successsfully!!"
    })
}


exports.GetUser = (db)=>async(req,res,next)=>{

    try{
        const user = await db.query('SELECT * FROM Users');
        
        res.status(200).json({
            success:true,
            user
        })
    }
    catch(error){
        console.error('Error retrieving users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}