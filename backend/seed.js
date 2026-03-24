import 'dotenv/config';
import mongoose from 'mongoose';
import Product from './models/product.model.js';

const BACKEND_URL = 'https://homemart-backend.onrender.com';

// Actual uploaded image filenames mapped to product IDs 1–36
const imageMap = {
  1:  'product_1732120512404.png',
  2:  'product_1732120553299.png',
  3:  'product_1732120583204.png',
  4:  'product_1732120603286.png',
  5:  'product_1732120624897.png',
  6:  'product_1732120642111.png',
  7:  'product_1732120658526.png',
  8:  'product_1732120677229.png',
  9:  'product_1732120693259.png',
  10: 'product_1732120730383.png',
  11: 'product_1732120734801.png',
  12: 'product_1732120756291.png',
  13: 'product_1732121093511.png',
  14: 'product_1732121110747.png',
  15: 'product_1732121127128.png',
  16: 'product_1732121168607.png',
  17: 'product_1732121191484.png',
  18: 'product_1732121209369.png',
  19: 'product_1732121227962.png',
  20: 'product_1732121245205.png',
  21: 'product_1732121268935.png',
  22: 'product_1732121306495.png',
  23: 'product_1732121325229.png',
  24: 'product_1732121344749.png',
  25: 'product_1732121451514.png',
  26: 'product_1732121469410.png',
  27: 'product_1732121491445.png',
  28: 'product_1732121513066.png',
  29: 'product_1732121535468.png',
  30: 'product_1732121554033.png',
  31: 'product_1732121571182.png',
  32: 'product_1732121594049.png',
  33: 'product_1732121992977.png',
  34: 'product_1732122094859.png',
  35: 'product_1732122134686.png',
  36: 'product_1732122803358.png',
};

const products = [
  // Women (1–12)
  { id: 1,  name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", category: "women", new_price: 50.0,  old_price: 80.5,  available: true },
  { id: 2,  name: "Printed Georgette Saree with Blouse Piece",               category: "women", new_price: 85.0,  old_price: 120.5, available: true },
  { id: 3,  name: "Women Floral Embroidered Kurta with Palazzos",             category: "women", new_price: 60.0,  old_price: 100.5, available: true },
  { id: 4,  name: "Women Solid Round Neck Casual Dress",                      category: "women", new_price: 100.0, old_price: 150.0, available: true },
  { id: 5,  name: "Women Ethnic Motifs Printed Anarkali Kurta",               category: "women", new_price: 85.0,  old_price: 120.5, available: true },
  { id: 6,  name: "Women Woven Design Wrap Saree",                            category: "women", new_price: 85.0,  old_price: 120.5, available: true },
  { id: 7,  name: "Women Floral Print Fit and Flare Dress",                   category: "women", new_price: 85.0,  old_price: 120.5, available: true },
  { id: 8,  name: "Women Solid Mandarin Collar Straight Kurta",               category: "women", new_price: 85.0,  old_price: 120.5, available: true },
  { id: 9,  name: "Women Embroidered Straight Kurta",                         category: "women", new_price: 85.0,  old_price: 120.5, available: true },
  { id: 10, name: "Women Floral Print Wrap Maxi Dress",                       category: "women", new_price: 85.0,  old_price: 120.5, available: true },
  { id: 11, name: "Women Solid Peplum Top",                                   category: "women", new_price: 85.0,  old_price: 120.5, available: true },
  { id: 12, name: "Women Striped Straight Kurta",                             category: "women", new_price: 85.0,  old_price: 120.5, available: true },
  // Men (13–24)
  { id: 13, name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", category: "men",   new_price: 85.0,  old_price: 120.5, available: true },
  { id: 14, name: "Men Slim Fit Chinos",                                      category: "men",   new_price: 85.0,  old_price: 120.5, available: true },
  { id: 15, name: "Men Solid Round Neck Pure Cotton T-shirt",                 category: "men",   new_price: 85.0,  old_price: 120.5, available: true },
  { id: 16, name: "Men Checked Slim Fit Formal Shirt",                        category: "men",   new_price: 85.0,  old_price: 120.5, available: true },
  { id: 17, name: "Men Solid Polo Collar T-shirt",                            category: "men",   new_price: 85.0,  old_price: 120.5, available: true },
  { id: 18, name: "Men Solid Slim Fit Casual Shirt",                          category: "men",   new_price: 85.0,  old_price: 120.5, available: true },
  { id: 19, name: "Men Washed Slim Fit Jeans",                                category: "men",   new_price: 85.0,  old_price: 120.5, available: true },
  { id: 20, name: "Men Solid Regular Fit Casual Jacket",                      category: "men",   new_price: 85.0,  old_price: 120.5, available: true },
  { id: 21, name: "Men Printed Regular Fit Casual Shirt",                     category: "men",   new_price: 85.0,  old_price: 120.5, available: true },
  { id: 22, name: "Men Solid Slim Fit Track Pants",                           category: "men",   new_price: 85.0,  old_price: 120.5, available: true },
  { id: 23, name: "Men Solid Hooded Sweatshirt",                              category: "men",   new_price: 85.0,  old_price: 120.5, available: true },
  { id: 24, name: "Men Solid Regular Fit Polo T-shirt",                       category: "men",   new_price: 85.0,  old_price: 120.5, available: true },
  // Kids (25–36)
  { id: 25, name: "Boys Orange Colourblocked Hooded Sweatshirt",              category: "kid",   new_price: 85.0,  old_price: 120.5, available: true },
  { id: 26, name: "Girls Floral Print Fit and Flare Dress",                   category: "kid",   new_price: 85.0,  old_price: 120.5, available: true },
  { id: 27, name: "Boys Solid Round Neck T-shirt",                            category: "kid",   new_price: 85.0,  old_price: 120.5, available: true },
  { id: 28, name: "Girls Embroidered Anarkali Kurta",                         category: "kid",   new_price: 85.0,  old_price: 120.5, available: true },
  { id: 29, name: "Boys Checked Shirt with Shorts",                           category: "kid",   new_price: 85.0,  old_price: 120.5, available: true },
  { id: 30, name: "Girls Solid Lehenga Choli",                                category: "kid",   new_price: 85.0,  old_price: 120.5, available: true },
  { id: 31, name: "Boys Solid Slim Fit Jeans",                                category: "kid",   new_price: 85.0,  old_price: 120.5, available: true },
  { id: 32, name: "Girls Floral Print Maxi Dress",                            category: "kid",   new_price: 85.0,  old_price: 120.5, available: true },
  { id: 33, name: "Boys Solid Track Pants",                                   category: "kid",   new_price: 85.0,  old_price: 120.5, available: true },
  { id: 34, name: "Girls Solid Peplum Top with Skirt",                        category: "kid",   new_price: 85.0,  old_price: 120.5, available: true },
  { id: 35, name: "Boys Printed Casual Shirt",                                category: "kid",   new_price: 85.0,  old_price: 120.5, available: true },
  { id: 36, name: "Girls Striped Casual Dress",                               category: "kid",   new_price: 85.0,  old_price: 120.5, available: true },
];

const productsWithImages = products.map((p) => ({
  ...p,
  image: `${BACKEND_URL}/images/${imageMap[p.id]}`,
}));

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const deleted = await Product.deleteMany({ id: { $gte: 1, $lte: 36 } });
    console.log(`Cleared ${deleted.deletedCount} existing seed products`);

    await Product.insertMany(productsWithImages);
    console.log(`Seeded ${productsWithImages.length} products successfully`);

    await mongoose.disconnect();
    console.log('Done.');
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  }
}

seed();
