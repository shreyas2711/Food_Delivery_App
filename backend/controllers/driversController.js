const uuid = require('uuid');



exports.CreateDrvier= (db)=>async(req,res,next)=>{

    const driver_id = uuid.v4();
    const {driver_name, phone,location,status,driver_email} = req.body;
    try{    

        const data = await db.query('INSERT INTO drivers (driver_id,driver_name, phone,location,status,driver_email) VALUES($1,$2,$3,$4,$5,$6)',[driver_id,driver_name,phone,location,status,driver_email]);

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


exports.GetDrivers = (db)=>async(req,res,next)=>{

    try{
        
        const data = await db.query('SELECT * FROM drivers');

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