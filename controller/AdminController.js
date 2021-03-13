const Category = require("../models/Category");
const Bank = require("../models/Bank");
const fs = require("fs-extra");
const path = require("path");
const Image = require("../models/Image");
const Item = require("../models/Item");

module.exports = {
  viewDashboard: (req, res) => {
    res.render("Admin/Dashboard/View_Dashboard", {
      title: "StayCation | Dashboard",
    });
  },
  viewCategory: async (req, res) => {
    try {
      const category = await Category.find();
      const alertMesage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = {
        message: alertMesage,
        status: alertStatus,
      };
      res.render("Admin/Category/Category", {
        category,
        alert,
        title: "StayCation | Category",
      });
    } catch (err) {
      res.redirect("admin/category");
    }
  },
  addCategory: async (req, res) => {
    try {
      const { name } = req.body;
      await Category.create({ name });
      req.flash("alertMessage", "Success Add Category");
      req.flash("alertStatus", "success");
      res.redirect("/admin/category");
    } catch (e) {
      req.flash("alertMessage", `${e.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/category");
    }
  },
  editCategory: async (req, res) => {
    try {
      const { _id, name } = req.body;
      const find = await Category.findOne({ _id: _id });
      if (find != null) {
        find.name = name;
        await find.save();
        req.flash("alertMessage", "Success Edit Category");
        req.flash("alertStatus", "success");
        res.redirect("/admin/category");
      }
    } catch (e) {
      req.flash("alertMessage", "Failed Edit Category");
      req.flash("alertStatus", "danger");
      res.redirect("/admin/category");
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const find = await Category.findOne({ _id: id });
      await find.remove();
      req.flash("alertMessage", "Success Delete Category");
      req.flash("alertStatus", "danger");
      res.redirect("/admin/category");
    } catch (e) {
      req.flash("alertMessage", "Failed to Delete Category");
      req.flash("alertStatus", "danger");
      res.redirect("/admin/category");
    }
  },
  viewBank: async (req, res) => {
    const data = await Bank.find();
    const alertMesage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = {
      message: alertMesage,
      status: alertStatus,
    };
    res.render("Admin/Bank/Bank", {
      title: "StayCation | Bank",
      data,
      alert,
    });
  },
  addBank: async (req, res) => {
    try {
      const data = req.body;
      await Bank.create({
        nameBank: data.name_bank,
        nomorRekening: data.nomor_rekening,
        name: data.name,
        imageUrl: `images/${req.file.filename}`,
      });
      req.flash("alertMessage", "Success Add Bank");
      req.flash("alertStatus", "success");
      res.redirect("/admin/bank");
    } catch (err) {
      console.log(err);
    }
  },
  editBank: async (req, res) => {
    try {
      const data = req.body;
      const hasil = await Bank.findOne({ _id: data._id });
      console.log(hasil);
      if (req.file === undefined) {
        hasil.name = data.name;
        hasil.nameBank = data.name_bank;
        hasil.nomorRekening = data.nomor_rekening;
        await hasil.save();
        req.flash("alertMessage", "Success Edit Bank");
        req.flash("alertStatus", "success");
        res.redirect("/admin/bank");
      } else {
        await fs.unlink(path.join(`public/${hasil.imageUrl}`));
        hasil.name = data.name;
        hasil.nameBank = data.name_bank;
        hasil.nomorRekening = data.nomor_rekening;
        hasil.imageUrl = `images/${req.file.filename}`;
        console.log(hasil.imageUrl);
        await hasil.save();
        req.flash("alertMessage", "Success Edit Bank");
        req.flash("alertStatus", "success");
        res.redirect("/admin/bank");
      }
    } catch (err) {
      console.log(err);
    }
  },
  deleteBank: async (req, res) => {
    try {
      const { id } = req.params;
      const hasil = await Bank.findOne({ _id: id });
      await fs.unlink(path.join(`public/${hasil.imageUrl}`));
      await hasil.remove();
      req.flash("alertMessage", "Success Deleted Bank");
      req.flash("alertStatus", "danger");
      res.redirect("/admin/bank");
    } catch (err) {
      console.log(err);
      const { id } = req.params;
      const hasil = await Bank.findOne({ _id: id });
      await hasil.remove();
      req.flash("alertMessage", "Success Deleted Bank");
      req.flash("alertStatus", "danger");
      res.redirect("/admin/bank");
    }
  },
  viewItem: async (req, res) => {
    const alertMesage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = {
      message: alertMesage,
      status: alertStatus,
    };
    try {
      const item = await Item.find();
      const category = await Category.find();
      res.render("Admin/Item/Item", {
        title: "StayCation | Item",
        item,
        category,
        alert,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/item");
    }
  },
  addItem: async (req, res) => {
    try {
      const { category, title, price, city, desc } = req.body;
      if (req.files.length > 0) {
        const categories = await Category.findOne({ _id: category });
        const newItem = {
          category: categories._id,
          title,
          price,
          city,
          desc,
        };
        const item = await Item.create(newItem);
        await categories.itemId.push({ _id: item._id });
        await categories.save();
        for (let i = 0; i < req.files.length; i++) {
          const imageSave = await Image.create({
            imageUrl: `images/${req.files[i].filename}`,
          });
          item.imageId.push({ _id: imageSave._id });
          await item.save();
        }
      }
      req.flash("alertMessage", `success add item`);
      req.flash("alertStatus", "success");
      res.redirect("/admin/item");
      res.redirect("/admin/item");
    } catch (err) {
      console.log(err);
    }
  },
  deleteItem: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Item.findOne({ _id: id });
      if (item.imageId.length > 0) {
        item.imageId.forEach(async (element, key) => {
          await fs.unlink(path.join(`public/${element.imageUrl}`));
        });
      }
      await item.remove();
      req.flash("alertMessage", `success delete item`);
      req.flash("alertStatus", "success");
      res.redirect("/admin/item");
    }catch(err){
      console.log(err)
    }
  },
  viewBooking: (req, res) => {
    res.render("Admin/Booking/Booking", {
      title: "StayCation | Booking",
    });
  },
};
