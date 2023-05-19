import {faker, Faker, es, en} from "@faker-js/faker";
// const { commerce, image, database, string } = faker;

export const customFaker = new Faker({
    // Now multiple fallbacks are supported
    locale: [en],
});

const { commerce, image, database, string, internet, person, phone, datatype, lorem } = customFaker;

const generateProduct = ()=>{
    return {
        id: database.mongodbObjectId(),
        title: commerce.productName(),
        price: parseFloat(commerce.price()),
        departament: commerce.department(),
        stock: parseInt(string.numeric(2)),
        image: image.url(),
        code: string.alphanumeric(10),
        description:commerce.productDescription()
    }
}

// const product  = generateProduct();
// console.log(product);


export const generateUser = ()=>{
    //generamos un numero aleatorio de productos, que se van agregar al carrito
    const productsNumber = Math.ceil(Math.random()*10);// 1 y 10
    let products = [];
    for(let i=0;i<productsNumber;i++){
        const product = generateProduct();
        products.push(product)
    };
    return {
        id:database.mongodbObjectId(),
        first_name:person.firstName(),
        last_name: person.lastName(),
        phone: phone.number(),
        email:internet.email(),
        avatar: image.avatar(),
        role:datatype.boolean() ? 'premium' : 'user',
        jobTitle: person.jobTitle(),
        cart:products
    }
};

// const user = generateUser();
// console.log(user)