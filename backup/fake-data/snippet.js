const faker = require('faker');

n = 0

while(n <  60){
    let producto = ("Moldura-" + faker.commerce.productMaterial()+"-" + faker.commerce.color() );
    let precio   = faker.commerce.price(150, 500,0, "$");
    let sku      = ("SKU-" + faker.random.alphaNumeric(8) );
    let cantidad = faker.random.number({min:0, max: 500 });
    console.log(sku + " "+ producto+" " + precio+ " " + "cantidad:"+  cantidad);
    n ++;
}
