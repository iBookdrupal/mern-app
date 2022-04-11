const asyncHandler = require("express-async-handler");

//@descr get goals
//@route GET /api/goal
//@access  private

const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Get goals` });
});

//@descr Set goals
//@route Post /api/goal
//@access  private

const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  res.status(200).json({ message: `Set goals` });
});

//@descr Update goals
//@route PUT /api/goal/:id
//@access  private

const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update goal ${req.params.id}` });
});

//@descr Delete goal
//@route DELETE /api/goal/:id
//@access  private

const deleteGoal = async (req, res) => {
  res.status(200).json({ message: `Delete goal ${req.params.id}` });
};

module.exports = { getGoals, setGoal, updateGoal, deleteGoal };
