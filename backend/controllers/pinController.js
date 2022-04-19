const asyncHandler = require("express-async-handler");
const Uuid = require("uuid");

const PIN = require("../model/pinModel");

//Function to generate pin
const generateRandomNumber = (n) => {
  const result =
    Math.floor(Math.random() * (9 * Math.pow(10, n - 1))) + Math.pow(10, n - 1);
  const str = result.toString();
  const myResult = `${str.substring(0, 4)}-${str.substring(
    4,
    8
  )}-${str.substring(8, 12)}-${str.substring(12, 16)}`;
  return myResult;
};

//@descr get sms
//@route GET /sms
//@access  private

const getPIN = asyncHandler(async (req, res) => {
  const pin = await PIN.find();
  console.log(generateRandomNumber(16));

  res.status(200).json(pin);
});

//@descr Set sms
//@route Post /sms
//@access  private

const setPIN = asyncHandler(async (req, res) => {
  if (!req.body.user) {
    res.status(400);
    throw new Error("Please add a pin field");
  }

  const pin = await PIN.create({
    pin: generateRandomNumber(16),
    unit: req.body.unit,
    user: req.body.user,
  });

  res.status(200).json(pin);
});

//@descr Update SMS
//@route PUT /sms/:id
//@access  private

const updatePIN = asyncHandler(async (req, res) => {
  const pin = await PIN.findById(req.params.id);

  if (!pin) {
    res.status(400);
    throw new Error("SMS not found");
  }

  const updatedPIN = await PIN.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedPIN);
});

//@descr Delete sms
//@route DELETE /sms/:id
//@access  private

const deletePIN = async (req, res) => {
  const pin = await PIN.findById(req.params.id);

  if (!pin) {
    res.status(400);
    throw new Error("SMS not found");
  }
  await pin.remove();
  res.status(200).json({ id: req.params.id });
};

module.exports = { getPIN, setPIN, updatePIN, deletePIN };
