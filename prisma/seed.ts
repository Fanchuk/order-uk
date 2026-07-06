import 'dotenv/config'
import prisma from '../src/shared/lib/prisma'

function toPence(value: string | number): number {
    return Math.round(parseFloat(String(value)) * 100)
}

const IMG = {
    burgers: ['/burger_base.jpg', '/burger_double.jpg', '/burger_chicken.jpg', '/burger.jpg', '/sandwich.jpg'],
    fries: ['/fries_classic.jpg', '/fries_curly.jpg', '/fries_cheese.jpg', '/fries_cajun.jpg', '/potato_wedges.jpg'],
    snacks: ['/chicken_nuggets.jpg', '/mozzarella_sticks.jpg', '/chicken_wings.jpg', '/chicken_strips.jpg', '/nuggets_box.jpg'],
    drinksCold: ['/drink_cola.jpg', '/drink_sprite.jpg', '/drink_fanta.jpg', '/drink_water.jpg', '/iced_tea.jpg', '/milkshake.jpg'],
    drinksHot: ['/coffee_cappuccino.jpg', '/coffee_latte.jpg', '/coffee_espresso.jpg', '/tea_hot.jpg'],
    desserts: ['/dessert_donut.jpg', '/dessert_brownie.jpg', '/dessert_cheesecake.jpg', '/dessert_applepie.jpg', '/dessert_cookie.jpg', '/dessert_cake.jpg', '/dessert_icecream.jpg'],
    kidsMeal: ['/burger_base.jpg', '/chicken_nuggets.jpg', '/menu-burger.jpg'],
    sauces: ['/sauce_ketchup.jpg', '/sauce_bbq.jpg', '/sauce_cheese.jpg', '/sauce_garlic.jpg', '/sauce_ranch.jpg'],
    gum: ['/gum_mint.jpg', '/gum_strawberry.jpg', '/gum_watermelon.jpg'],
    salads: ['/salad.jpg', '/salads.jpg', '/salad_caesar.jpg', '/salad_fresh.jpg', '/salad_coleslaw.jpg'],
}

// Унікальні промо картинки для кожного ресторану
const PROMO_IMAGES: Record<number, [string, string, string]> = {
    1: ['/promo_mcd_1.jpg',    '/promo_mcd_2.jpg',    '/promo_mcd_3.jpg'],
    2: ['/promo_papa_1.jpg',   '/promo_papa_2.jpg',   '/promo_papa_3.jpg'],
    3: ['/promo_kfc_1.jpg',    '/promo_kfc_2.jpg',    '/promo_kfc_3.jpg'],
    4: ['/promo_texas_1.jpg',  '/promo_texas_2.jpg',  '/promo_texas_3.jpg'],
    5: ['/promo_bk_1.jpg',     '/promo_bk_2.jpg',     '/promo_bk_3.jpg'],
    6: ['/promo_wendys_1.jpg', '/promo_wendys_2.jpg', '/promo_wendys_3.jpg'],
}

const MENU_CATEGORIES = [
    { id: 'offers',      name: 'Offers',      slug: 'offers' },
    { id: 'burgers',     name: 'Burgers',     slug: 'burgers' },
    { id: 'fries',       name: 'Fries',       slug: 'fries' },
    { id: 'snacks',      name: 'Snacks',      slug: 'snacks' },
    { id: 'salads',      name: 'Salads',      slug: 'salads' },
    { id: 'cold-drinks', name: 'Cold drinks', slug: 'cold-drinks' },
    { id: 'happy-meal',  name: 'Happy Meal®', slug: 'happy-meal' },
    { id: 'desserts',    name: 'Desserts',    slug: 'desserts' },
    { id: 'hot-drinks',  name: 'Hot drinks',  slug: 'hot-drinks' },
    { id: 'sauces',      name: 'Sauces',      slug: 'sauces' },
    { id: 'orbit',       name: 'Orbit®',      slug: 'orbit' },
]

function buildMenu(restaurantId: number, brand: string, flavour: { burger: string; combo: string; meal: string }) {
    const promos = PROMO_IMAGES[restaurantId]

    return [
        // OFFERS — унікальні картинки для кожного ресторану
        {
            restaurantId,
            menuCategoryId: 'offers',
            name: `${flavour.combo} Combo`,
            description: `${flavour.combo}, fries, and a drink at a great price.`,
            price: toPence('1.99'),
            oldPrice: toPence('2.49'),
            discountLabel: '-20%',
            imagePath: promos[0],
            isPromo: true,
        },
        {
            restaurantId,
            menuCategoryId: 'offers',
            name: 'Family Box',
            description: 'Four burgers, fries, and nuggets for the whole family.',
            price: toPence('4.99'),
            oldPrice: toPence('5.99'),
            discountLabel: '-17%',
            imagePath: promos[1],
            isPromo: true,
        },
        {
            restaurantId,
            menuCategoryId: 'offers',
            name: 'Chicken Combo',
            description: 'Chicken burger, fries, and a drink.',
            price: toPence('1.79'),
            oldPrice: toPence('2.19'),
            discountLabel: '-18%',
            imagePath: promos[2],
            isPromo: true,
        },

        // BURGERS
        {
            restaurantId,
            menuCategoryId: 'burgers',
            name: flavour.burger,
            description: 'Signature patty, special sauce, cheese, and fresh vegetables.',
            price: toPence('1.35'),
            imagePath: IMG.burgers[(restaurantId + 2) % IMG.burgers.length],
        },
        {
            restaurantId,
            menuCategoryId: 'burgers',
            name: 'Cheeseburger',
            description: 'Patty, cheddar cheese, and pickles.',
            price: toPence('0.65'),
            imagePath: '/burger_base.jpg',
        },
        {
            restaurantId,
            menuCategoryId: 'burgers',
            name: 'Double Cheeseburger',
            description: 'Two patties and double cheese.',
            price: toPence('0.95'),
            imagePath: '/burger_double.jpg',
        },

        // FRIES
        { restaurantId, menuCategoryId: 'fries', name: 'Small Fries',  description: 'Crispy golden French fries.',          price: toPence('0.45'), imagePath: '/fries_classic.jpg' },
        { restaurantId, menuCategoryId: 'fries', name: 'Curly Fries',  description: 'Seasoned curly fries.',                price: toPence('0.65'), imagePath: '/fries_curly.jpg' },
        { restaurantId, menuCategoryId: 'fries', name: 'Cheese Fries', description: 'Fries topped with melted cheese sauce.', price: toPence('0.85'), imagePath: '/fries_cheese.jpg' },

        // SNACKS
        { restaurantId, menuCategoryId: 'snacks', name: 'Nuggets 6 pcs',     description: 'Six pieces of tender chicken fillet.',       price: toPence('0.89'), imagePath: '/chicken_nuggets.jpg' },
        { restaurantId, menuCategoryId: 'snacks', name: 'Nuggets 9 pcs',     description: 'Nine pieces of crispy chicken nuggets.',      price: toPence('1.19'), imagePath: '/nuggets_box.jpg' },
        { restaurantId, menuCategoryId: 'snacks', name: 'Mozzarella Sticks', description: 'Breaded cheese sticks with marinara dip.',    price: toPence('0.90'), imagePath: '/mozzarella_sticks.jpg' },

        // SALADS
        { restaurantId, menuCategoryId: 'salads', name: 'Caesar Salad',  description: 'Romaine lettuce, grilled chicken, parmesan, Caesar dressing.', price: toPence('1.10'), imagePath: '/salad_caesar.jpg' },
        { restaurantId, menuCategoryId: 'salads', name: 'Garden Salad',  description: 'Fresh seasonal vegetables with light dressing.',               price: toPence('0.75'), imagePath: '/salad_fresh.jpg' },
        { restaurantId, menuCategoryId: 'salads', name: 'Coleslaw',      description: 'Fresh cabbage and carrots in creamy sauce.',                    price: toPence('0.55'), imagePath: '/salad_coleslaw.jpg' },

        // COLD DRINKS
        { restaurantId, menuCategoryId: 'cold-drinks', name: 'Coca-Cola 0.5L', description: 'Classic refreshing cola.',          price: toPence('0.40'), imagePath: '/drink_cola.jpg' },
        { restaurantId, menuCategoryId: 'cold-drinks', name: 'Sprite 0.5L',    description: 'Crisp lemon-lime soda.',            price: toPence('0.40'), imagePath: '/drink_sprite.jpg' },
        { restaurantId, menuCategoryId: 'cold-drinks', name: 'Iced Tea',       description: 'Refreshing iced tea with lemon.',   price: toPence('0.45'), imagePath: '/iced_tea.jpg' },

        // HAPPY MEAL
        {
            restaurantId,
            menuCategoryId: 'happy-meal',
            name: `${flavour.meal} Nuggets Box`,
            description: 'Nuggets, fries, drink, and a surprise toy.',
            price: toPence('1.35'),
            imagePath: IMG.kidsMeal[restaurantId % IMG.kidsMeal.length],
        },
        {
            restaurantId,
            menuCategoryId: 'happy-meal',
            name: `${flavour.meal} Cheeseburger Box`,
            description: 'Mini cheeseburger, fries, drink, and a toy.',
            price: toPence('1.35'),
            imagePath: '/burger_base.jpg',
        },
        {
            restaurantId,
            menuCategoryId: 'happy-meal',
            name: `${flavour.meal} Hamburger Box`,
            description: 'Mini hamburger, fries, drink, and a toy.',
            price: toPence('1.29'),
            imagePath: '/menu-burger.jpg',
        },

        // DESSERTS
        { restaurantId, menuCategoryId: 'desserts', name: 'Ice Cream Cone',    description: 'Soft vanilla ice cream in a crispy cone.',  price: toPence('0.30'), imagePath: '/dessert_icecream.jpg' },
        { restaurantId, menuCategoryId: 'desserts', name: 'Chocolate Brownie', description: 'Rich chocolate brownie with nuts.',          price: toPence('0.65'), imagePath: '/dessert_brownie.jpg' },
        { restaurantId, menuCategoryId: 'desserts', name: 'Apple Pie',         description: 'Crispy pastry filled with warm apple.',      price: toPence('0.35'), imagePath: '/dessert_applepie.jpg' },

        // HOT DRINKS
        { restaurantId, menuCategoryId: 'hot-drinks', name: 'Cappuccino', description: 'Classic Italian cappuccino.',        price: toPence('0.55'), imagePath: '/coffee_cappuccino.jpg' },
        { restaurantId, menuCategoryId: 'hot-drinks', name: 'Latte',      description: 'Smooth coffee with steamed milk.',   price: toPence('0.60'), imagePath: '/coffee_latte.jpg' },
        { restaurantId, menuCategoryId: 'hot-drinks', name: 'Espresso',   description: 'Strong, bold espresso shot.',        price: toPence('0.40'), imagePath: '/coffee_espresso.jpg' },

        // SAUCES
        { restaurantId, menuCategoryId: 'sauces', name: 'Ketchup',     description: 'Classic tomato ketchup.',           price: toPence('0.10'), imagePath: '/sauce_ketchup.jpg' },
        { restaurantId, menuCategoryId: 'sauces', name: 'BBQ Sauce',   description: 'Sweet and smoky barbecue sauce.',   price: toPence('0.15'), imagePath: '/sauce_bbq.jpg' },
        { restaurantId, menuCategoryId: 'sauces', name: 'Cheese Sauce',description: 'Creamy melted cheese dip.',         price: toPence('0.15'), imagePath: '/sauce_cheese.jpg' },

        // ORBIT
        { restaurantId, menuCategoryId: 'orbit', name: 'Orbit Mint',       description: 'Refreshing mint chewing gum.',        price: toPence('0.25'), imagePath: '/gum_mint.jpg' },
        { restaurantId, menuCategoryId: 'orbit', name: 'Orbit Strawberry', description: 'Strawberry flavoured chewing gum.',   price: toPence('0.25'), imagePath: '/gum_strawberry.jpg' },
        { restaurantId, menuCategoryId: 'orbit', name: 'Orbit Watermelon', description: 'Watermelon flavoured chewing gum.',   price: toPence('0.25'), imagePath: '/gum_watermelon.jpg' },
    ]
}

async function main() {
    console.log('🗑  Очищаємо базу...')
    await prisma.orderItem.deleteMany()
    await prisma.order.deleteMany()
    await prisma.review.deleteMany()
    await prisma.coupon.deleteMany()
    await prisma.emailSubscriber.deleteMany()
    await prisma.partnerApplication.deleteMany()
    await prisma.restaurantMenuItem.deleteMany()
    await prisma.restaurantMenuCategory.deleteMany()
    await prisma.address.deleteMany()
    await prisma.user.deleteMany()
    await prisma.specialPromo.deleteMany()
    await prisma.promoCategory.deleteMany()
    await prisma.subcategory.deleteMany()
    await prisma.product.deleteMany()
    await prisma.restaurant.deleteMany()
    await prisma.category.deleteMany()

    console.log('📂 Категорії...')
    await prisma.category.createMany({
        data: [
            { id: 1, name: 'Burgers & Fast food', slug: 'burgers-fast-food', imagePath: '/burgers.jpg' },
            { id: 2, name: 'Salads',               slug: 'salads',           imagePath: '/salads.jpg' },
            { id: 3, name: 'Pasta & Casuals',      slug: 'pasta-casuals',    imagePath: '/pasta.jpg' },
            { id: 4, name: 'Pizza',                slug: 'pizza',            imagePath: '/pizza.jpg' },
            { id: 5, name: 'Breakfast',            slug: 'breakfast',        imagePath: '/breakfast.jpg' },
            { id: 6, name: 'Soups',                slug: 'soups',            imagePath: '/soups.jpg' },
        ],
    })

    console.log('📁 Підкатегорії...')
    await prisma.subcategory.createMany({
        data: [
            { name: 'Classic Burgers',    slug: 'classic-burgers',   categoryId: 1 },
            { name: 'Chicken Burgers',    slug: 'chicken-burgers',   categoryId: 1 },
            { name: 'Vegan Burgers',      slug: 'vegan-burgers',     categoryId: 1 },
            { name: 'Caesar Salads',      slug: 'caesar-salads',     categoryId: 2 },
            { name: 'Green Salads',       slug: 'green-salads',      categoryId: 2 },
            { name: 'Classic Pasta',      slug: 'classic-pasta',     categoryId: 3 },
            { name: 'Cream Pasta',        slug: 'cream-pasta',       categoryId: 3 },
            { name: 'Classic Pizza',      slug: 'classic-pizza',     categoryId: 4 },
            { name: 'Meat Pizza',         slug: 'meat-pizza',        categoryId: 4 },
            { name: 'Eggs & Omelettes',   slug: 'eggs-omelettes',    categoryId: 5 },
            { name: 'Pancakes & Waffles', slug: 'pancakes-waffles',  categoryId: 5 },
            { name: 'Cream Soups',        slug: 'cream-soups',       categoryId: 6 },
            { name: 'Clear Soups',        slug: 'clear-soups',       categoryId: 6 },
        ],
    })

    console.log('🍔 Глобальні продукти...')
    await prisma.product.createMany({
        data: [
            { name: 'Classic Burger',          description: 'Juicy beef patty, cheddar cheese, fresh vegetables, signature sauce.', price: toPence('1.45'), imagePath: '/burger_base.jpg',       categoryId: 1, spiciness: 0 },
            { name: 'Spicy Chicken Burger',    description: 'Crispy chicken fillet in spicy breading with hot sauce.',              price: toPence('1.55'), imagePath: '/burger_chicken.jpg',    categoryId: 1, spiciness: 4 },
            { name: 'Double Bacon Burger',     description: 'Two patties, crispy bacon, melted cheese.',                           price: toPence('1.85'), imagePath: '/burger_double.jpg',     categoryId: 1, spiciness: 1 },
            { name: 'Chicken Caesar',          description: 'Romaine, grilled chicken, parmesan, Caesar dressing.',                price: toPence('1.35'), imagePath: '/salad_caesar.jpg',      categoryId: 2, spiciness: 0 },
            { name: 'Greek Salad',             description: 'Fresh vegetables, feta cheese, olives.',                             price: toPence('1.20'), imagePath: '/salad_fresh.jpg',       categoryId: 2, spiciness: 0 },
            { name: 'Spaghetti Bolognese',     description: 'Classic pasta with meat sauce and parmesan.',                        price: toPence('1.55'), imagePath: '/pasta_tomato.jpg',      categoryId: 3, spiciness: 1 },
            { name: 'Pasta Carbonara',         description: 'Spaghetti with bacon, egg, cream sauce.',                           price: toPence('1.65'), imagePath: '/pasta_cream.jpg',       categoryId: 3, spiciness: 0 },
            { name: 'Margherita Pizza',        description: 'Tomato sauce, mozzarella, fresh basil.',                            price: toPence('1.35'), imagePath: '/pizza_cheese.jpg',      categoryId: 4, spiciness: 0 },
            { name: 'Pepperoni Pizza',         description: 'Spicy pepperoni sausage and double cheese.',                        price: toPence('1.65'), imagePath: '/pizza_meat.jpg',        categoryId: 4, spiciness: 3 },
            { name: 'English Breakfast',       description: 'Fried eggs, bacon, sausages, beans, toast.',                        price: toPence('1.45'), imagePath: '/breakfast_eggs.jpg',    categoryId: 5, spiciness: 0 },
            { name: 'Pancakes with Maple Syrup', description: 'Fluffy pancakes with syrup and berries.',                         price: toPence('1.10'), imagePath: '/breakfast_pancakes.jpg',categoryId: 5, spiciness: 0 },
            { name: 'Ukrainian Borscht',       description: 'Classic borscht with sour cream and garlic rolls.',                 price: toPence('0.95'), imagePath: '/soup_red.jpg',          categoryId: 6, spiciness: 1 },
            { name: 'Chicken Noodle Soup',     description: 'Rich broth with chicken and homemade noodles.',                     price: toPence('0.85'), imagePath: '/soup_asian.jpg',        categoryId: 6, spiciness: 0 },
        ],
    })

    console.log('🏪 Ресторани...')
    await prisma.restaurant.createMany({
        data: [
            { id: 1, name: "McDonald's London", logoPath: '/mcdonalds.png',     bannerImagePath: '/restaurant-bg.jpg', rating: 4.8, deliveryTimeMinutes: '20-30', minimumOrder: toPence('1.50') },
            { id: 2, name: 'Papa Johns',         logoPath: '/papa-johns.png',    bannerImagePath: '/restaurant-bg.jpg', rating: 4.6, deliveryTimeMinutes: '30-40', minimumOrder: toPence('2.00') },
            { id: 3, name: 'KFC West London',    logoPath: '/kfc.png',           bannerImagePath: '/restaurant-bg.jpg', rating: 4.7, deliveryTimeMinutes: '25-35', minimumOrder: toPence('1.80') },
            { id: 4, name: 'Texas Chicken',      logoPath: '/texas-chicken.png', bannerImagePath: '/restaurant-bg.jpg', rating: 4.5, deliveryTimeMinutes: '30-45', minimumOrder: toPence('1.70') },
            { id: 5, name: 'Burger King',        logoPath: '/burger-king.png',   bannerImagePath: '/restaurant-bg.jpg', rating: 4.6, deliveryTimeMinutes: '20-35', minimumOrder: toPence('1.60') },
            { id: 6, name: "Wendy's",            logoPath: '/shaurma.png',       bannerImagePath: '/restaurant-bg.jpg', rating: 4.4, deliveryTimeMinutes: '25-40', minimumOrder: toPence('1.90') },
        ],
    })

    console.log('📋 Категорії меню...')
    await prisma.restaurantMenuCategory.createMany({ data: MENU_CATEGORIES })

    console.log('🍽  Меню для всіх ресторанів...')
    const restaurantFlavours = [
        { id: 1, brand: "McDonald's",   burger: 'Big Mac',      combo: 'Big Mac',    meal: 'Happy Meal' },
        { id: 2, brand: 'Papa Johns',   burger: 'Italian Stack', combo: 'Pizza Duo',  meal: 'Kids Pizza' },
        { id: 3, brand: 'KFC',          burger: 'Zinger Burger', combo: 'Zinger',     meal: 'Kids Bucket' },
        { id: 4, brand: 'Texas Chicken',burger: 'Texas Burger',  combo: 'Texas',      meal: 'Lil Texas' },
        { id: 5, brand: 'Burger King',  burger: 'Whopper',       combo: 'Whopper',    meal: 'King Junior' },
        { id: 6, brand: "Wendy's",      burger: 'Dave Single',   combo: 'Baconator',  meal: "Wendy's Kids" },
    ]

    for (const r of restaurantFlavours) {
        await prisma.restaurantMenuItem.createMany({
            data: buildMenu(r.id, r.brand, { burger: r.burger, combo: r.combo, meal: r.meal }),
        })
        console.log(`   ✓ ${r.brand}: 33 позиції`)
    }

    console.log('🎊 Промо категорії...')
    await prisma.promoCategory.createMany({
        data: [
            { id: 1, name: 'Vegan',            slug: 'vegan' },
            { id: 2, name: 'Sushi',             slug: 'sushi' },
            { id: 3, name: 'Pizza & Fast food', slug: 'pizza-fast-food' },
            { id: 4, name: 'Others',            slug: 'others' },
        ],
    })

    await prisma.specialPromo.createMany({
        data: [
            { id: 1,  name: 'Vegan Bowl',         description: 'Quinoa, chickpeas, avocado, fresh vegetables.',       price: toPence('1.30'), discountPercent: '-20%', imagePath: '/salad_fresh.jpg',        promoCategoryId: 1 },
            { id: 2,  name: 'Vegan Burger Set',    description: 'Plant-based patty, fries, and a drink.',             price: toPence('1.80'), discountPercent: '-15%', imagePath: '/burger_vegan.jpg',       promoCategoryId: 1 },
            { id: 3,  name: 'Vegan Salad Box',     description: 'Mixed greens, tofu, seeds, and citrus dressing.',    price: toPence('1.10'), discountPercent: '-25%', imagePath: '/salads.jpg',             promoCategoryId: 1 },
            { id: 4,  name: 'Sushi Platter',       description: '24 rolls with salmon and cream cheese.',             price: toPence('3.20'), discountPercent: '-30%', imagePath: '/sushi_roll.jpg',         promoCategoryId: 2 },
            { id: 5,  name: 'California Roll',     description: 'Rolls with crab, avocado, tobiko caviar.',           price: toPence('1.65'), discountPercent: '-20%', imagePath: '/sushi_roll.jpg',         promoCategoryId: 2 },
            { id: 6,  name: 'Sushi Mix',           description: 'Assortment of 16 different sushi and rolls.',        price: toPence('2.80'), discountPercent: '-15%', imagePath: '/sushi_roll.jpg',         promoCategoryId: 2 },
            { id: 7,  name: 'Pizza of the Day',    description: 'Large pepperoni pizza at a special price.',          price: toPence('1.50'), discountPercent: '-35%', imagePath: '/pizza_meat.jpg',         promoCategoryId: 3 },
            { id: 8,  name: 'Combo Burger Deal',   description: 'Burger, fries, and a drink.',                       price: toPence('1.90'), discountPercent: '-20%', imagePath: '/burger_double.jpg',      promoCategoryId: 3 },
            { id: 9,  name: 'Family Pizza Set',    description: 'Two large pizzas and a 1.5L drink.',                price: toPence('3.50'), discountPercent: '-25%', imagePath: '/pizza_cheese.jpg',       promoCategoryId: 3 },
            { id: 10, name: 'Dessert Assortment',  description: 'Set of three signature desserts.',                  price: toPence('1.20'), discountPercent: '-15%', imagePath: '/dessert_cheesecake.jpg', promoCategoryId: 4 },
            { id: 11, name: 'Coffee Set',          description: 'Two coffees of your choice and a croissant.',       price: toPence('0.95'), discountPercent: '-20%', imagePath: '/coffee_latte.jpg',       promoCategoryId: 4 },
            { id: 12, name: 'Snack Box',           description: 'Nuggets, onion rings, and sauces.',                 price: toPence('1.35'), discountPercent: '-10%', imagePath: '/chicken_wings.jpg',      promoCategoryId: 4 },
        ],
    })

    console.log('📧 Email підписники...')
    await prisma.emailSubscriber.createMany({
        data: [
            { email: 'john@example.com' },
            { email: 'jane@example.com' },
            { email: 'bob@example.com' },
        ],
    })

    console.log('👤 Тестові юзери...')
    await prisma.user.createMany({
        data: [
            { id: 'user-customer-1', email: 'customer@test.com', name: 'Test Customer', role: 'CUSTOMER',         hashedPassword: 'TODO_hash' },
            { id: 'user-owner-1',    email: 'owner@test.com',    name: 'Owner User',    role: 'RESTAURANT_OWNER', hashedPassword: 'TODO_hash' },
            { id: 'user-admin-1',    email: 'admin@test.com',    name: 'Admin User',    role: 'ADMIN',            hashedPassword: 'TODO_hash' },
        ],
    })

    await prisma.address.create({
        data: {
            userId: 'user-customer-1',
            label: 'Home',
            line1: '42 Baker Street',
            city: 'London',
            postcode: 'NW1 6XE',
            isDefault: true,
        },
    })

    console.log('🎟  Купони...')
    await prisma.coupon.createMany({
        data: [
            { code: 'ORDER5',  type: 'FIXED',        value: 500, minOrderAmount: 1500, maxUses: 100,  isActive: true },
            { code: 'MINUS20', type: 'PERCENT',       value: 20,  minOrderAmount: 2000, maxUses: 50,   isActive: true },
            { code: 'FREEDEL', type: 'FREE_DELIVERY', value: 0,   minOrderAmount: 1000, maxUses: null, isActive: true },
        ],
    })

    console.log('📦 Тестові замовлення...')
    const menuItems = await prisma.restaurantMenuItem.findMany({
        select: { id: true, name: true, restaurantId: true },
    })

    const getMenuItemId = (restaurantId: number, name: string) => {
        const item = menuItems.find((m) => m.restaurantId === restaurantId && m.name === name)
        if (!item) throw new Error(`Menu item "${name}" not found for restaurant ${restaurantId}`)
        return item.id
    }

    const address = await prisma.address.findFirst({ where: { userId: 'user-customer-1' } })

    await prisma.order.create({
        data: {
            userId: 'user-customer-1',
            restaurantId: 1,
            addressId: address?.id,
            status: 'CONFIRMED',
            notes: 'Please ring the doorbell twice',
            subtotal: toPence('2.00'),
            deliveryFee: toPence('0.99'),
            discount: 0,
            total: toPence('2.99'),
            items: {
                create: [
                    { menuItemId: getMenuItemId(1, 'Big Mac'),     name: 'Big Mac',     price: toPence('1.35'), quantity: 1 },
                    { menuItemId: getMenuItemId(1, 'Curly Fries'), name: 'Curly Fries', price: toPence('0.65'), quantity: 1 },
                ],
            },
        },
    })

    await prisma.order.create({
        data: {
            userId: 'user-customer-1',
            restaurantId: 1,
            addressId: address?.id,
            status: 'PREPARING',
            notes: null,
            subtotal: toPence('3.34'),
            deliveryFee: toPence('0.99'),
            discount: 0,
            total: toPence('4.33'),
            items: {
                create: [
                    { menuItemId: getMenuItemId(1, 'Big Mac'),          name: 'Big Mac',          price: toPence('1.35'), quantity: 2 },
                    { menuItemId: getMenuItemId(1, 'Coca-Cola 0.5L'),   name: 'Coca-Cola 0.5L',   price: toPence('0.40'), quantity: 1 },
                    { menuItemId: getMenuItemId(1, 'Chocolate Brownie'), name: 'Chocolate Brownie', price: toPence('0.65'), quantity: 1 },
                ],
            },
        },
    })

    await prisma.order.create({
        data: {
            userId: 'user-customer-1',
            restaurantId: 3,
            addressId: address?.id,
            status: 'READY',
            notes: 'Leave at the door',
            subtotal: toPence('3.20'),
            deliveryFee: toPence('0.99'),
            discount: toPence('0.64'),
            couponCode: 'MINUS20',
            total: toPence('3.55'),
            items: {
                create: [
                    { menuItemId: getMenuItemId(3, 'Zinger Burger'),  name: 'Zinger Burger',  price: toPence('1.10'), quantity: 2 },
                    { menuItemId: getMenuItemId(3, 'Curly Fries'),    name: 'Curly Fries',    price: toPence('0.65'), quantity: 1 },
                    { menuItemId: getMenuItemId(3, 'Coca-Cola 0.5L'), name: 'Coca-Cola 0.5L', price: toPence('0.40'), quantity: 1 },
                ],
            },
        },
    })

    await prisma.order.create({
        data: {
            userId: 'user-customer-1',
            restaurantId: 5,
            addressId: address?.id,
            status: 'ON_THE_WAY',
            notes: null,
            subtotal: toPence('1.35'),
            deliveryFee: 0,
            discount: 0,
            couponCode: 'FREEDEL',
            total: toPence('1.35'),
            items: {
                create: [
                    { menuItemId: getMenuItemId(5, 'Whopper'), name: 'Whopper', price: toPence('1.35'), quantity: 1 },
                ],
            },
        },
    })

    await prisma.order.create({
        data: {
            userId: 'user-customer-1',
            restaurantId: 1,
            addressId: address?.id,
            status: 'DELIVERED',
            notes: null,
            subtotal: toPence('6.58'),
            deliveryFee: toPence('0.99'),
            discount: toPence('5.00'),
            couponCode: 'ORDER5',
            total: toPence('2.57'),
            items: {
                create: [
                    { menuItemId: getMenuItemId(1, 'Big Mac Combo'), name: 'Big Mac Combo', price: toPence('1.99'), quantity: 2 },
                    { menuItemId: getMenuItemId(1, 'Curly Fries'),   name: 'Curly Fries',   price: toPence('0.65'), quantity: 4 },
                ],
            },
        },
    })

    console.log('✅ База заповнена успішно!')
}

main()
    .catch((e) => {
        console.error('❌ Помилка seed:', e)
        process.exit(1)
    })
    .finally(() => prisma.$disconnect())