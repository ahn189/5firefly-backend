const Helper = require('../models/Helper');

// GET all helpers
exports.getAllHelpers = async (req, res) => {
  try {
    const helpers = await Helper.find();
    res.json(helpers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create new helper
exports.createHelper = async (req, res) => {
  const helper = new Helper(req.body);
  try {
    const newHelper = await helper.save();
    res.status(201).json(newHelper);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update helper
exports.updateHelper = async (req, res) => {
  try {
    const updated = await Helper.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE helper
exports.deleteHelper = async (req, res) => {
  try {
    await Helper.findByIdAndDelete(req.params.id);
    res.json({ message: 'Đã xoá thành công' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST upload image
exports.uploadImage = async (req, res) => {
  try {
    const helper = await Helper.findByIdAndUpdate(
      req.params.id,
      { image: req.file.filename },
      { new: true }
    );
    res.json(helper);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/helpers/match?address=...&gender=...
exports.matchHelpers = async (req, res) => {
  const { address, gender } = req.query;
  try {
    const query = {};
    if (address) query.address = { $regex: address, $options: "i" };
    if (gender) query.gender = gender;

    const matchedHelpers = await Helper.find(query);
    res.json(matchedHelpers);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi matching", error: err.message });
  }
};