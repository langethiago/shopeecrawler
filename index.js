
exports.getProduct = async (req, res) => {
        const puppeteer = require('puppeteer');

        const browser = await puppeteer.launch({
            args: ['--no-sandbox','--incognito'],
            headless: true,
            defaultViewport: null,
        });
        
        const url = req.body.url; 
        
        const page = await browser.newPage();

        try{
            await page.goto(url, { waitUntil: 'networkidle0'});
        }catch(e){
            console.log(e);
        }

        page.evaluate(_ => {
            window.scrollBy(0, window.innerHeight);
        });
                let productName;
        let productImage;
        let productPrice;
        let productLogistic;
        let productSales;
        let productSeller;
        let productAvailable;
        let productStock;

        try{
            const itemProductName = await page.$("._44qnta");
            productName = await itemProductName.getProperty("innerText");
            productName = await productName.jsonValue();
        }catch(e){
            productName = "Nome não Encontrado";
        }

        try{
            const itemProductImage = await page.$eval(".VWiifV ", (el) => getComputedStyle(el).getPropertyValue('background-image'));
            productImage = itemProductImage.replace('url("','').replace('")','');
        }catch(e){
            productImage = "Imagem não encontrada";
        }

        try{
            const itemProductPrice = await page.$(".pqTWkA");
            productPrice = await itemProductPrice.getProperty("innerText");
            productPrice = await productPrice.jsonValue();
        }catch(e){
            productPrice = "Preço não encontrado";
        }

        try{
            const itemProductLogistic = await page.$(".WZTmVh");
            productLogistic = await itemProductLogistic.getProperty("innerText");
            productLogistic = await productLogistic.jsonValue();
        }catch(e){
            productLogistic = "Logistica não encontrada";
        }
        
        try{
            const itemProductSales = await page.$(".P3CdcB");
            productSales = await itemProductSales.getProperty("innerText");
            productSales = await productSales.jsonValue();
        }catch(e){
            productSales = "Vendas não encontrada";
        }

        try{
            const itemProductSeller = await page.$(".VlDReK");
            productSeller = await itemProductSeller.getProperty("innerText");
            productSeller = await productSeller.jsonValue();
        }catch(e){
            productSeller = "Vendedor não encontrado";
        }

        try{
            let itemProductAvailable = await page.$('.OWROcY');
            productAvailable = await itemProductAvailable.getProperty("innerText");
            productAvailable = await productAvailable.jsonValue();
        }catch(e){
            productAvailable = "Em Estoque";
        }

        try{
            let itemProductStock = await page.$('.rY0UiC ');
            productStock = await itemProductStock.getProperty("innerText");
            productStock = await productStock.jsonValue();
        }catch(e){
            productStock = "Estoque não encontrado"
        }

        try{
            let itemProduct = await page.$('.product-not-exist__text');
            product = await itemProduct.getProperty("innerText");
            product = await product.jsonValue();
        }catch(e){
            product = "Produto Exite"
        }

        var response = {
            'Product': product,
            'ProductName': productName,
            'ProductPrice': productPrice,
            'ProductImage': productImage,
            'ProductLogistics': productLogistic,
            'ProductSales': productSales,
            'ProductSeller': productSeller,
            'ProductAvailable': productAvailable,
            'ProductStock': productStock
        }

        res.status(200).send(response);
        browser.close();

        
};
