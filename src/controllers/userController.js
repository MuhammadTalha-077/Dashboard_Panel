const User = require('../models/User');

exports.listUsers = async (req, res) => {
  const users = await User.find().select('-password');
  // return role instead of isAdmin
  res.json(users.map(u => ({ _id: u._id, name: u.name, email: u.email, role: u.role })));
};

exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ _id: user._id, name: user.name, email: user.email, role: user.role });
};

exports.deleteUser = async (req, res) => {
  const removed = await User.findByIdAndDelete(req.params.id);
  if (!removed) return res.status(404).json({ message: 'User not found' });
  res.json({ message: 'User removed' });
};

exports.updateUserRole = async (req, res) => {
  const { role } = req.body;
  if (!['user', 'admin', 'superadmin'].includes(role)) return res.status(400).json({ message: 'Invalid role' });
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.role = role;
  await user.save();
  res.json({ message: 'Role updated', user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
};
