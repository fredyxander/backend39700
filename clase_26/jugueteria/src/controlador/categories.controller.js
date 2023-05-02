import { CategoryService } from "../servicio/categories.service.js";

class CategoryController{
    static getCategories = (req,res)=>{
        const categories = CategoryService.getCategories();
        res.json({status:"success", data: categories});
    };

    static saveCategory = (req,res)=>{
        const result = CategoryService.saveCategory(req.body);
        res.json({status:"success", message: result});
    };
}

export {CategoryController}