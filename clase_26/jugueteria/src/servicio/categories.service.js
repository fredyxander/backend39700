import { CategoryManager } from "../persistencia/categories.js";

const categoryManager = new CategoryManager();

class CategoryService{
    static getCategories = ()=>{
        const categories = categoryManager.get();
        return categories;
    };

    static saveCategory = (category)=>{
        const result = categoryManager.save(category);
        return result;
    }
};

export {CategoryService}