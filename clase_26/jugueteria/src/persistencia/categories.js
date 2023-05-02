class CategoryManager{
    constructor(){
        this.categories = [];
    }

    get(){
        return this.categories;
    };

    save(category){
        this.categories.push(category);
        return "categoria guardada"
    };

}

export {CategoryManager}