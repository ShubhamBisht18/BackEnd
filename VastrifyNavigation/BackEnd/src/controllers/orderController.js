import Order from "../models/orderModels.js";

export const placeOrder = async (req, res) => {
  try {
    const { item, quantity, totalAmount, paymentMethod, location } = req.body;
    const userId = req.user.id;

    if (!item || !quantity || !totalAmount || !paymentMethod || !location) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const order = new Order({
      user: userId,
      item,
      quantity,
      totalAmount,
      paymentMethod,
      location,
      isPaid: paymentMethod === "Online",
      status: "Pending",
    });

    await order.save();
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("item", "name price");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId }).populate("item", "name price");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
