export const POPULAR_RESTAURANTS = [
    {
        id: 1,
        name: "McDonald's London",
        image: '/mcdonalds.png',
    },
    {
        id: 2,
        name: 'Papa Johns',
        image: '/papa-johns.png',
    },
    {
        id: 3,
        name: 'KFC West London',
        image: '/kfc.png',
    },
    {
        id: 4,
        name: 'Texas Chicken',
        image: '/texas-chicken.png',
    },
    {
        id: 5,
        name: 'Burger King',
        image: '/burger-king.png',
    },
    {
        id: 6,
        name: "Wendy's",
        image: '/shaurma.png',
    },
]

export const RESTAURANT_OFFERS = [
    {
        id: 1,
        discount: '-20%',
        restaurant: "McDonald's East London",
        title: 'First Order Discount',
        image: '/offer-first-order.jpg',
    },
    {
        id: 2,
        discount: '-20%',
        restaurant: "McDonald's East London",
        title: 'Vegan Discount',
        image: '/offer-vegan.jpg',
    },
    {
        id: 3,
        discount: '-100%',
        restaurant: "McDonald's East London",
        title: 'Free ice Cream Offer',
        image: '/offer-ice-cream.jpg',
    },
]

export const RESTAURANT_CATEGORIES = ['Offers', 'Burgers', 'Fries', 'Snacks', 'Salads', 'Cold drinks', 'Happy Meal®', 'Desserts', 'Hot drinks', 'Sauces', 'Orbit®']

export const SORT_OPTIONS = ['Sort by Pricing', 'Price: Low to High', 'Price: High to Low', 'Top Rated']

export const DESKTOP_MENU_ITEMS = [
    ...Array(6)
        .fill(null)
        .map((_, i) => ({
            id: `desktop-burger-${i}`,
            category: 'Burgers',
            name: 'Royal Cheese Burger with extra Fries',
            description: '1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks',
            price: 23.1, // ✅ Перетворено на число
            image: '/menu-burger.jpg',
        })),
    ...Array(6)
        .fill(null)
        .map((_, i) => ({
            id: `desktop-fries-${i}`,
            category: 'Fries',
            name: 'The classics for 3',
            description: '1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks',
            price: 23.1, // ✅ Перетворено на число
            image: '/menu-fries.jpg',
        })),
    ...Array(6)
        .fill(null)
        .map((_, i) => ({
            id: `desktop-drink-${i}`,
            category: 'Cold drinks', // ✅ Виправлено регістр літери "d" відповідно до RESTAURANT_CATEGORIES
            name: 'The classics for 3',
            description: '1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks',
            price: 23.1, // ✅ Перетворено на число
            image: '/menu-drink.jpg',
        })),
]

export const MOBILE_MENU_ITEMS = [
    {
        id: 'mobile-burger',
        name: 'Farm House Xtreme Pizza',
        description: '1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries , 3 cold drinks',
        image: '/menu-pizza.jpg',
        spiciness: 3,
        variants: [
            { name: 'Small', price: 21.9 }, // ✅ Перетворено на число
            { name: 'Medium', price: 25.9 }, // ✅ Перетворено на число
            { name: 'Large', price: 27.9 }, // ✅ Перетворено на число
            { name: 'XL Large with Sauces', price: 32.9 }, // ✅ Перетворено на число
        ],
    },
    {
        id: 'mobile-fries',
        name: 'Farm House Xtreme Pizza',
        description: '1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries , 3 cold drinks',
        image: '/menu-pizza.jpg',
        spiciness: 3,
        variants: [
            { name: 'Small', price: 21.9 },
            { name: 'Medium', price: 25.9 },
            { name: 'Large', price: 27.9 },
            { name: 'XL Large with Sauces', price: 32.9 },
        ],
    },
    {
        id: 'mobile-drink',
        name: 'Farm House Xtreme Pizza',
        description: '1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries , 3 cold drinks',
        image: '/menu-pizza.jpg',
        spiciness: 3,
        variants: [
            { name: 'Small', price: 21.9 },
            { name: 'Medium', price: 25.9 },
            { name: 'Large', price: 27.9 },
            { name: 'XL Large with Sauces', price: 32.9 },
        ],
    },
]

export const BASKET_ITEMS = [
    {
        id: 1,
        qty: 1,
        name: '12" Vegitarian Pizza',
        desc: 'No Mushrooms + green peppers',
        price: 27.9, // ✅ Перетворено на число
        trashIcon: '/icon-trash-grey.svg',
    },
    {
        id: 2,
        qty: 1,
        name: '17" Tandoori Pizza',
        desc: 'No Mushrooms + green peppers',
        price: 17.9, // ✅ Перетворено на число
        trashIcon: '/icon-trash-dark.svg',
    },
    {
        id: 3,
        qty: 2,
        name: 'Coke Coca Cola',
        desc: '',
        price: 4.9, // ✅ Перетворено на число
        trashIcon: '/icon-trash-red.svg',
    },
    {
        id: 4,
        qty: 1,
        name: '12" Vegitarian Pizza',
        desc: 'No Mushrooms + green peppers',
        price: 27.9, // ✅ Перетворено на число
        trashIcon: '/icon-trash-purple.svg',
    },
]
