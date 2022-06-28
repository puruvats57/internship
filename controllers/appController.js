
const User = require("../models/User");




exports.update = async (req, res) => {
  var _id = req.query.id;
  console.log("id", _id);
  
  console.log(req.body);
  const { name, desc, brand,ram } = req.body;

  User.updateOne(
		{ _id: _id },
    { $set: { name:name,desc:desc,brand:brand,ram:ram }  },function(err,d){
			if(err) console.warn(err);
			console.log('item updated');
			console.log(d);
		}
	 );
  return res.json({status:"updated"});
   
};


exports.add = async (req, res) => {
  const { name, desc ,brand,ram,price} = req.body;

user = new User({
    name:name,
    
    desc:desc,
    brand:brand,
    ram: ram,
    price:price
  });

  await user.save();

  console.log('added successfully');
  return res.json({status:"added successfully"});
};


exports.filter = async (req, res) => {
  var name = req.query.name;
  var brand = req.query.brand;
  var ram = req.query.ram;
  var price = req.query.price;
  var sort = req.query.sort;
  console.log(sort);
  if (sort == "ascending")
      sort = 1;
  else(sort == 'descending')
      sort = -1;

  if (brand && ram) {
    
  
  User.aggregate([
    {
      $match:
      {
        brand: brand, ram: ram
      }
      
    },
    { $group: { _id: { name: "$name", description: "$desc", price: "$price" } } },
    { $sort: { price: sort } }

  ])
    .then(result => {
      console.log(result);
      return res.json({ details: result });

    })
    .catch(error => {
      console.log(error)
    })
}
  
  else if (ram) {
    User.aggregate([
      {
        $match:
        {
          ram: ram
        }
        
      },
      { $group: { _id: { brand: "$brand", name: "$name", description: "$desc",ram:"$ram", price: "$price" } } },
      { $sort: { price: sort } }
  
    ])
      .then(result => {
        console.log(result);
        return res.json({ details: result });
  
      })
      .catch(error => {
        console.log(error)
      })

    
  }
  else if (name) {
    User.aggregate([
      {
        $match:
        {
          name: name
        }
        
      },
      { $group: { _id: { brand:"$brand",name: "$name", description: "$desc",ram:"$ram",price:"$price" } } },
      { $sort: { price: sort } }
    ])
      .then(result => {
        console.log(result);
        return res.json({ details: result });
  
      })
      .catch(error => {
        console.log(error)
      })
    
  }

}


exports.delete = async (req, res) => {
  var _id = req.query.id;
  console.log("id", _id);
  

  User.deleteOne(
    { _id: _id },
    function (err, d) {
      if (err) console.warn(err);
      console.log('item deleted');
      console.log(d);
		
    }
  );
  return res.json({status:"deleted"});

}


exports.getdetails = async (req, res) => {
  var name=req.query.name;
  User.find(
		{name:name},{},
    function(err,d){
			if(err) console.warn(err);
		
      console.log(d);
      return res.json({details:d});
		}
	 );
 
}















  
  
  
    
    
  
    
    
  
  
  











