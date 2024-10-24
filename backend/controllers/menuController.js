



exports.GetMenu = (db)=>async(req,res,next)=>{

    try{
        
        const data = await db.query('SELECT * FROM menu');

        res.status(200).json({
            success:true,
            data
        })
    }
    catch(error){
        console.error('Error retriveing menu!',error);
        res.status(500).json({
            error:'Internal server error'
        })
       }
}

exports.GetFoodSize = (db)=>async(req,res,next)=>{

    try{
        
        const data = await db.query('SELECT * FROM foodsize');

        res.status(200).json({
            success:true,
            data
        })
    }
    catch(error){
        console.error('Error retriveing foodsize!',error);
        res.status(500).json({
            error:'Internal server error'
        })
       }
}