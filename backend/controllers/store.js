const Store = require("../models/store");
const { ErrorHandler, TryCatch } = require("../utils/error");

exports.create = TryCatch(async (req, res)=>{
    const storeDetails = req.body;
    if(!storeDetails){
        throw new ErrorHandler("Please provide all the fields", 400);
    }

    const store = await Store.create({...storeDetails});

    res.status(200).json({
        status: 200,
        success: true,
        message: "Store has been added successfully",
        store
    })
})
exports.update = TryCatch(async (req, res)=>{
    const {id} = req.params;
    const storeDetails = req.body;
    if(!id){
        throw new ErrorHandler("Store Id not provided", 400);
    }
    if(!storeDetails){
        throw new ErrorHandler("Please provide all the fields", 400);
    }
    let store = await Store.findById(id);
    if(!store){
        throw new ErrorHandler("Store doesn't exist", 400);
    }

    store = await Store.findByIdAndUpdate(id, {...storeDetails}, {new: true});

    res.status(200).json({
        status: 200,
        success: true,
        message: "Store has been updated successfully",
        store
    })
})
exports.remove = TryCatch(async (req, res)=>{
    const {id} = req.params;
    if(!id){
        throw new ErrorHandler("Store Id not provided", 400);
    }
    let store = await Store.findById(id);
    if(!store){
        throw new ErrorHandler("Store doesn't exist", 400);
    }

    await store.deleteOne();

    res.status(200).json({
        status: 200,
        success: true,
        message: "Store has been deleted successfully",
        store
    })
})
exports.details = TryCatch(async (req, res)=>{
    const {id} = req.params;
    if(!id){
        throw new ErrorHandler("Store Id not provided", 400);
    }
    let store = await Store.findById(id);
    if(!store){
        throw new ErrorHandler("Store doesn't exist", 400);
    }

    res.status(200).json({
        status: 200,
        success: true,
        store
    })
})
exports.all = TryCatch(async (req, res)=>{
    const stores = await Store.find({});
    res.status(200).json({
        status: 200,
        success: true,
        stores
    })
})