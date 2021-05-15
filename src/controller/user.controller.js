const User = require('../models/user.model');
const userController = {};


userController.registr = async(req, res, next) =>{
  const{firstname,lastName,email,userID,city,state,zip,phoneNumber,textInput} = req.body;
    const newUser = new User({
      firstname,
      lastName,
      email,
      userID,
      city,
      state,
      zip,
      phoneNumber,
      textInput
    });
    try {
        const user = await newUser.save();
        return res.send({user});
    } catch (e) {
        next(e);
    }
};

userController.sorting = async(req, res, next) =>{
    try {
        const results = await User.find({}).sort({
          messages: -1,
        })
        .limit(999999)
        return res.send({results});
        
    } catch (e) {
        next(e);
    }
};


userController.get = async (req, res, next) => {
  const { user } = req;

  const now = new Date();

  const month = parseInt(req.params.month);
  {
    month >= 0 && month <= 11 && now.setMonth(month);
  }

  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const query = {
    owner: user._id,
    created: {
      $gte: firstDay,
      $lt: lastDay,
    },
  };

  try {
    const expense = await User.find(query).sort({ created: 'desc' });
    const statistics = {};

    if (expense.length > 0) {
      //Max amount spent in the specified month
      statistics.max = expense.sort((a, b) => a.amount < b.amount)[0].amount;

      //Total amount spent in the specified month
      statistics.total = expense
        .map((item) => item.amount)
        .reduce((prev, next) => prev + next);

      //Avg expense for the given month
      statistics.avg = Math.floor(statistics.total / expense.length);
    }

    return res.send({
      expense,
      statistics,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = userController;
