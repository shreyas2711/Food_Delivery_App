const uuid = require('uuid');


exports.CreateRestraunt = (db)=>async(req,res,next)=>{

    const rest_id = uuid.v4();
    const {restraunt_name,address, phone} = req.body;
    try{    

        const data = await db.query('INSERT INTO Restraunts (restraunt_id,restraunt_name, address, phone) VALUES($1,$2,$3,$4)',[rest_id,restraunt_name,address,phone]);

        res.status(200).json({
            success:true,
            message:'New restraunt created successfully!',
            data
        })
    }
    catch(error){
        console.error('Error creating Restraunt!',error);
        res.status(500).json({
            error:'Internal server error'
        })
       }
}

exports.GetRestraunts = (db)=>async(req,res,next)=>{

    try{
        
        const data = await db.query('SELECT * FROM Restraunts');

        res.status(200).json({
            success:true,
            data
        })
    }
    catch(error){
        console.error('Error retriveing restraunts!',error);
        res.status(500).json({
            error:'Internal server error'
        })
       }
}