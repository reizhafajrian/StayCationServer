const router=require('express').Router()
const {upload,uploadMultiple}=require('../middleware/multer')




const adminController=require('../controller/AdminController')
//dashboard
router.get('/dashboard',adminController.viewDashboard);
//Category
router.get('/category',adminController.viewCategory);
router.post('/category',adminController.addCategory);
router.put('/category',adminController.editCategory);
//bank
router.get('/bank',adminController.viewBank);
router.post('/bank',upload,adminController.addBank);
router.put('/bank',upload,adminController.editBank);
router.delete('/bank/:id',adminController.deleteBank);
//item
router.get('/item',adminController.viewItem);
router.post('/item',uploadMultiple,adminController.addItem);
router.delete('/item/remove/:id',adminController.deleteItem);
router.get('/item/edit/:id',adminController.editItem);
router.get('/item/show-image/:id',adminController.showImageItem);
//booking
router.get('/booking',adminController.viewBooking);

router.delete('/category/remove/:id',adminController.deleteCategory);


module.exports=router