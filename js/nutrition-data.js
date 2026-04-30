const IMAGE_BASE = "https://image.chipotlenutrition.org";

const MENU_ITEMS = [
    { slug: "burrito", name: "Chipotle Burrito", image: `${IMAGE_BASE}/menu/burrito.webp` },
    { slug: "burrito-bowl", name: "Chipotle Burrito Bowl", image: `${IMAGE_BASE}/menu/burrito-bowl.webp` },
    { slug: "quesadilla", name: "Chipotle Quesadilla", image: `${IMAGE_BASE}/menu/quesadilla.webp` },
    { slug: "salad", name: "Chipotle Salad", image: `${IMAGE_BASE}/menu/salad.webp` },
    { slug: "tacos", name: "Chipotle Tacos", image: `${IMAGE_BASE}/menu/tacos.webp` },
    { slug: "kids-meal", name: "Chipotle Kid's Meal", image: `${IMAGE_BASE}/menu/kids-meal.webp` },
    { slug: "chips-and-sides", name: "Chipotle Chips & Sides", image: `${IMAGE_BASE}/menu/chips-and-sides.webp` },
];

function imgUrl(menuSlug, ingredient) {
    return `${IMAGE_BASE}/${menuSlug}/${ingredient}.webp`;
}

function makeProtein(slug) {
    return [
        { id: "carne-asada", name: "Carne Asada", subtitle: "Our Most Tender Steak", image: imgUrl(slug, "carne-asada"), cal: 250, fat: 14, protein: 29, carbs: 1, allowDouble: true },
        { id: "chicken", name: "Chicken", image: imgUrl(slug, "chicken"), cal: 180, fat: 7, protein: 32, carbs: 0, allowDouble: true },
        { id: "steak", name: "Steak", image: imgUrl(slug, "steak"), cal: 150, fat: 6, protein: 21, carbs: 1, allowDouble: true },
        { id: "beef-barbacoa", name: "Beef Barbacoa", image: imgUrl(slug, "beef-barbacoa"), cal: 170, fat: 7, protein: 24, carbs: 2, allowDouble: true },
        { id: "carnitas", name: "Carnitas", image: imgUrl(slug, "carnitas"), cal: 210, fat: 12, protein: 23, carbs: 0, allowDouble: true },
        { id: "sofritas", name: "Sofritas", subtitle: "Plant-Based Protein", image: imgUrl(slug, "sofritas"), cal: 150, fat: 10, protein: 8, carbs: 9, allowDouble: true },
        { id: "veggie", name: "Veggie", subtitle: "Includes Guacamole", image: imgUrl(slug, "veggie"), cal: 0, fat: 0, protein: 0, carbs: 0, allowDouble: false },
    ];
}

function makeRice(slug) {
    return [
        { id: "white-rice", name: "White Rice", image: imgUrl(slug, "white-rice"), cal: 210, fat: 4, protein: 4, carbs: 40 },
        { id: "brown-rice", name: "Brown Rice", image: imgUrl(slug, "brown-rice"), cal: 210, fat: 6, protein: 4, carbs: 36 },
        { id: "no-rice", name: "No Rice", image: imgUrl(slug, "no-rice"), cal: 0, fat: 0, protein: 0, carbs: 0 },
    ];
}

function makeBeans(slug) {
    return [
        { id: "black-beans", name: "Black Beans", image: imgUrl(slug, "black-beans"), cal: 130, fat: 2, protein: 8, carbs: 22 },
        { id: "pinto-beans", name: "Pinto Beans", image: imgUrl(slug, "pinto-beans"), cal: 130, fat: 2, protein: 8, carbs: 21 },
        { id: "no-beans", name: "No Beans", image: imgUrl(slug, "no-beans"), cal: 0, fat: 0, protein: 0, carbs: 0 },
    ];
}

function makeToppings(slug) {
    return [
        { id: "guacamole", name: "Guacamole", image: imgUrl(slug, "guacamole"), cal: 230, fat: 22, protein: 2, carbs: 8 },
        { id: "fresh-tomato-salsa", name: "Fresh Tomato Salsa", subtitle: "Mild", image: imgUrl(slug, "fresh-tomato-salsa"), cal: 25, fat: 0, protein: 0, carbs: 4 },
        { id: "roasted-chili-corn-salsa", name: "Roasted Chili-Corn Salsa", subtitle: "Medium", image: imgUrl(slug, "roasted-chili-corn-salsa"), cal: 80, fat: 2, protein: 3, carbs: 16 },
        { id: "tomatillo-green-chili-salsa", name: "Tomatillo-Green Chili Salsa", subtitle: "Medium", image: imgUrl(slug, "tomatillo-green-chili-salsa"), cal: 15, fat: 0, protein: 0, carbs: 4 },
        { id: "tomatillo-red-chili-salsa", name: "Tomatillo-Red Chili Salsa", subtitle: "Hot", image: imgUrl(slug, "tomatillo-red-chili-salsa"), cal: 30, fat: 0, protein: 0, carbs: 4 },
        { id: "sour-cream", name: "Sour Cream", image: imgUrl(slug, "sour-cream"), cal: 110, fat: 9, protein: 2, carbs: 2 },
        { id: "fajita-veggies", name: "Fajita Veggies", image: imgUrl(slug, "fajita-veggies"), cal: 20, fat: 0, protein: 1, carbs: 5 },
        { id: "cheese", name: "Cheese", image: imgUrl(slug, "cheese"), cal: 110, fat: 8, protein: 6, carbs: 1 },
        { id: "romaine-lettuce", name: "Romaine Lettuce", image: imgUrl(slug, "romaine-lettuce"), cal: 5, fat: 0, protein: 0, carbs: 1 },
        { id: "queso-blanco", name: "Queso Blanco", image: imgUrl(slug, "queso-blanco"), cal: 120, fat: 9, protein: 5, carbs: 4 },
    ];
}

function makeChipsDips(slug) {
    return [
        { id: "chips", name: "Chips", image: imgUrl(slug, "chips"), cal: 540, fat: 25, protein: 7, carbs: 73 },
        { id: "chips-guacamole", name: "Chips & Guacamole", image: imgUrl(slug, "chips-and-guacamole"), cal: 770, fat: 47, protein: 9, carbs: 81 },
        { id: "large-chips", name: "Large Chips", image: imgUrl(slug, "large-chips"), cal: 810, fat: 38, protein: 11, carbs: 110 },
        { id: "large-chips-guac", name: "Large Chips & Large Guacamole", image: imgUrl(slug, "large-chips-and-large-guacamole"), cal: 1270, fat: 82, protein: 15, carbs: 126 },
        { id: "chips-fresh-tomato", name: "Chips & Fresh Tomato Salsa", subtitle: "Mild", image: imgUrl(slug, "chips-and-fresh-tomato-salsa"), cal: 565, fat: 25, protein: 7, carbs: 74 },
        { id: "chips-red-chili", name: "Chips & Tomatillo-Red Chili Salsa", subtitle: "Hot", image: imgUrl(slug, "chips-and-tomatillo-red-chili-salsa"), cal: 570, fat: 25, protein: 7, carbs: 77 },
        { id: "chips-green-chili", name: "Chips & Tomatillo-Green Chili Salsa", subtitle: "Medium", image: imgUrl(slug, "chips-and-tomatillo-green-chili-salsa"), cal: 555, fat: 25, protein: 7, carbs: 77 },
        { id: "chips-corn-salsa", name: "Chips & Roasted Chili-Corn Salsa", subtitle: "Medium", image: imgUrl(slug, "chips-and-roasted-chili-corn-salsa"), cal: 620, fat: 27, protein: 10, carbs: 89 },
        { id: "chips-queso", name: "Chips & Queso Blanco", image: imgUrl(slug, "chips-and-queso-blanco"), cal: 780, fat: 43, protein: 17, carbs: 80 },
        { id: "large-chips-queso", name: "Large Chips & Large Queso Blanco", image: imgUrl(slug, "large-chips-and-large-queso-blanco"), cal: 1290, fat: 75, protein: 31, carbs: 124 },
    ];
}

function makeSingleSides(slug) {
    return [
        { id: "side-guacamole", name: "Side of Guacamole", image: imgUrl(slug, "side-of-guacamole"), cal: 230, fat: 22, protein: 2, carbs: 8 },
        { id: "large-side-guacamole", name: "Large Side of Guacamole", image: imgUrl(slug, "large-side-of-guacamole"), cal: 460, fat: 44, protein: 4, carbs: 16 },
        { id: "side-queso", name: "Side of Queso Blanco", image: imgUrl(slug, "side-of-queso-blanco"), cal: 240, fat: 18, protein: 10, carbs: 8 },
        { id: "large-side-queso", name: "Large Side of Queso Blanco", image: imgUrl(slug, "large-side-of-queso-blanco"), cal: 480, fat: 37, protein: 20, carbs: 14 },
        { id: "tortilla-side", name: "Tortilla on the Side", image: imgUrl(slug, "tortilla-on-the-side"), cal: 320, fat: 9, protein: 8, carbs: 50 },
    ];
}

const MENU_DATA = {
    burrito: {
        name: "Chipotle Burrito",
        heroImage: `${IMAGE_BASE}/menu/burrito.webp`,
        sections: [
            {
                title: "INCLUDED INGREDIENT",
                items: [
                    { id: "tortilla", name: "Tortilla", image: imgUrl("burrito", "tortilla"), cal: 320, fat: 9, protein: 8, carbs: 50 },
                ],
            },
            { title: "PROTEIN OR VEGGIE", subtitle: "choose any two", items: makeProtein("burrito") },
            { title: "Rice", items: makeRice("burrito") },
            { title: "Beans", items: makeBeans("burrito") },
            { title: "Top Things Off", items: makeToppings("burrito") },
            {
                title: "Options",
                items: [
                    { id: "double-wrap", name: "Double Wrap with Tortilla", image: imgUrl("burrito", "double-wrap-with-tortilla"), cal: 320, fat: 9, protein: 8, carbs: 50 },
                ],
            },
            { title: "Chips & Dips", items: makeChipsDips("burrito") },
            { title: "Single Sides", items: makeSingleSides("burrito") },
        ],
    },
    "burrito-bowl": {
        name: "Chipotle Burrito Bowl",
        heroImage: `${IMAGE_BASE}/menu/burrito-bowl.webp`,
        sections: [
            { title: "PROTEIN OR VEGGIE", subtitle: "choose any two", items: makeProtein("burrito-bowl") },
            { title: "Rice", items: makeRice("burrito-bowl") },
            { title: "Beans", items: makeBeans("burrito-bowl") },
            { title: "Top Things Off", items: makeToppings("burrito-bowl") },
            { title: "Chips & Dips", items: makeChipsDips("burrito-bowl") },
            { title: "Single Sides", items: makeSingleSides("burrito-bowl") },
        ],
    },
    quesadilla: {
        name: "Chipotle Quesadilla",
        heroImage: `${IMAGE_BASE}/menu/quesadilla.webp`,
        sections: [
            {
                title: "INCLUDED INGREDIENTS",
                items: [
                    { id: "flour-tortilla", name: "Flour Tortilla", image: imgUrl("quesadilla", "flour-tortilla"), cal: 320, fat: 9, protein: 8, carbs: 50 },
                    { id: "cheese-quesadilla", name: "Cheese", image: imgUrl("quesadilla", "cheese"), cal: 110, fat: 8, protein: 6, carbs: 1 },
                ],
            },
            { title: "PROTEIN OR VEGGIE", subtitle: "choose one", items: makeProtein("quesadilla") },
            { title: "Top Things Off", items: makeToppings("quesadilla") },
            { title: "Chips & Dips", items: makeChipsDips("quesadilla") },
            { title: "Single Sides", items: makeSingleSides("quesadilla") },
        ],
    },
    salad: {
        name: "Chipotle Salad",
        heroImage: `${IMAGE_BASE}/menu/salad.webp`,
        sections: [
            {
                title: "INCLUDED INGREDIENT",
                items: [
                    { id: "romaine-lettuce-base", name: "Romaine Lettuce", image: imgUrl("salad", "romaine-lettuce"), cal: 5, fat: 0, protein: 0, carbs: 1 },
                ],
            },
            { title: "PROTEIN OR VEGGIE", subtitle: "choose any two", items: makeProtein("salad") },
            { title: "Rice", items: makeRice("salad") },
            { title: "Beans", items: makeBeans("salad") },
            { title: "Top Things Off", items: makeToppings("salad") },
            {
                title: "Dressing",
                items: [
                    { id: "chipotle-honey-vinaigrette", name: "Chipotle-Honey Vinaigrette", image: imgUrl("salad", "chipotle-honey-vinaigrette"), cal: 220, fat: 16, protein: 0, carbs: 18 },
                ],
            },
            { title: "Chips & Dips", items: makeChipsDips("salad") },
            { title: "Single Sides", items: makeSingleSides("salad") },
        ],
    },
    tacos: {
        name: "Chipotle Tacos",
        heroImage: `${IMAGE_BASE}/menu/tacos.webp`,
        sections: [
            {
                title: "INCLUDED INGREDIENT",
                items: [
                    { id: "crispy-corn-tortilla", name: "Crispy Corn Tortilla", image: imgUrl("tacos", "crispy-corn-tortilla"), cal: 200, fat: 7, protein: 3, carbs: 30 },
                    { id: "soft-flour-tortilla", name: "Soft Flour Tortilla", image: imgUrl("tacos", "soft-flour-tortilla"), cal: 250, fat: 7, protein: 6, carbs: 40 },
                ],
            },
            { title: "PROTEIN OR VEGGIE", subtitle: "choose any two", items: makeProtein("tacos") },
            { title: "Top Things Off", items: makeToppings("tacos") },
            { title: "Chips & Dips", items: makeChipsDips("tacos") },
            { title: "Single Sides", items: makeSingleSides("tacos") },
        ],
    },
    "kids-meal": {
        name: "Chipotle Kid's Meal",
        heroImage: `${IMAGE_BASE}/menu/kids-meal.webp`,
        sections: [
            {
                title: "ENTREE",
                items: [
                    { id: "kid-build-your-own", name: "Build Your Own", image: imgUrl("kids-meal", "build-your-own"), cal: 0, fat: 0, protein: 0, carbs: 0 },
                    { id: "kid-quesadilla", name: "Kid's Quesadilla", image: imgUrl("kids-meal", "kids-quesadilla"), cal: 430, fat: 17, protein: 14, carbs: 51 },
                ],
            },
            { title: "PROTEIN OR VEGGIE", subtitle: "choose one", items: makeProtein("kids-meal") },
            { title: "Rice", items: makeRice("kids-meal") },
            { title: "Beans", items: makeBeans("kids-meal") },
            { title: "Top Things Off", items: makeToppings("kids-meal") },
            { title: "Chips & Dips", items: makeChipsDips("kids-meal") },
            { title: "Single Sides", items: makeSingleSides("kids-meal") },
        ],
    },
    "chips-and-sides": {
        name: "Chipotle Chips & Sides",
        heroImage: `${IMAGE_BASE}/menu/chips-and-sides.webp`,
        sections: [
            { title: "Chips & Dips", items: makeChipsDips("chips-and-sides") },
            { title: "Single Sides", items: makeSingleSides("chips-and-sides") },
        ],
    },
};

const FAQ_DATA = [
    {
        q: "What is the Chipotle Nutrition Calculator?",
        a: "The Chipotle Nutrition Calculator is a free online tool that helps you track calories, protein, carbs, and nutrition facts for all Chipotle menu items. You can customize your bowl, burrito, salad, or other items to see instant nutrition information and make healthier choices."
    },
    {
        q: "How accurate is the Chipotle calorie counter?",
        a: "Our Chipotle calorie counter uses nutrition data that's updated in real-time from the official Chipotle nutrition calculator at chipotle.com. This ensures you get the most accurate calorie counts and nutrition facts for all menu combinations."
    },
    {
        q: "Can I track macros with the Chipotle nutrition info tool?",
        a: "Yes! Our Chipotle nutrition calculator shows detailed macro information including protein, carbohydrates, fat, fiber, and sodium for every ingredient. This makes it perfect for tracking your daily macros and meeting fitness goals."
    },
    {
        q: "Is the Chipotle nutrition calculator free to use?",
        a: "Absolutely! Our Chipotle nutrition calculator is completely free with no registration required. You can calculate nutrition facts for unlimited meal combinations without any cost or restrictions."
    },
    {
        q: "What Chipotle menu items can I calculate nutrition for?",
        a: "You can use our Chipotle calorie counter for all menu items including bowls, burritos, salads, tacos, quesadillas, and kids meals. Each item shows complete nutrition facts including calories, protein, and other essential nutrients."
    },
    {
        q: "How often is the Chipotle nutrition data updated?",
        a: "Our Chipotle nutrition info is synchronized in real-time with the official Chipotle nutrition calculator, ensuring you always have access to the latest nutrition facts and calorie information for all menu items and seasonal offerings."
    },
    {
        q: "Can I save my Chipotle nutrition calculations?",
        a: "While our Chipotle nutrition calculator doesn't store personal data for privacy reasons, you can easily recreate your favorite combinations anytime. The tool remembers your selections during your current session for convenience."
    },
    {
        q: "Does the calorie counter include all Chipotle toppings?",
        a: "Yes! Our comprehensive Chipotle calorie counter includes nutrition facts for all proteins, rice, beans, salsas, cheese, guacamole, and other toppings. You can see how each ingredient affects your total nutrition info."
    },
    {
        q: "Is this tool affiliated with Chipotle Mexican Grill?",
        a: "No, our Chipotle nutrition calculator is an independent tool created to help customers make informed choices. While we use official nutrition data from Chipotle's website, we are not affiliated with Chipotle Mexican Grill, Inc."
    },
    {
        q: "How can I use this tool for meal planning?",
        a: "Our Chipotle nutrition calculator is perfect for meal planning! You can experiment with different combinations to meet your calorie goals, compare nutrition facts across menu items, and plan balanced meals that fit your dietary needs and preferences."
    },
    {
        q: "Still have questions?",
        a: "Can't find what you're looking for? Feel free to explore our nutrition calculator and discover more about Chipotle menu items."
    },
];

const TERMS_CONTENT = `
<h1 class="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
<p class="text-gray-600 mb-6">Effective Date: September 2025</p>

<h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">1. Acceptance of Terms</h2>
<p class="text-gray-700 mb-4">By accessing and using ChipotleNutrition.org ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.</p>

<h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">2. Description of Service</h2>
<p class="text-gray-700 mb-4">ChipotleNutrition.org is a free online nutrition calculator that provides estimated nutritional information for menu items similar to those offered by Chipotle Mexican Grill. Our tool allows users to customize meal combinations and view calculated nutrition facts.</p>

<h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">3. Use of Service</h2>
<ul class="list-disc pl-6 text-gray-700 mb-4 space-y-2">
    <li>This service is provided free of charge for personal, non-commercial use</li>
    <li>You may access and use the nutrition calculator for informational purposes</li>
    <li>You agree not to attempt to hack, disrupt, or overload our servers</li>
    <li>You will not use automated tools to scrape or harvest data from our site</li>
    <li>Commercial use or redistribution of our content is prohibited without permission</li>
</ul>

<h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">4. Intellectual Property</h2>
<p class="text-gray-700 mb-4">The design, functionality, and content of this website are owned by ChipotleNutrition.org. You may not copy, reproduce, or distribute our content without permission.</p>

<h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">5. Disclaimer and Accuracy</h2>
<ul class="list-disc pl-6 text-gray-700 mb-4 space-y-2">
    <li>Nutrition information is provided for educational and informational purposes only</li>
    <li>We strive for accuracy but cannot guarantee all nutritional data is completely accurate</li>
    <li>We are not affiliated with, endorsed by, or connected to Chipotle Mexican Grill, Inc.</li>
    <li>Our calculations are estimates based on publicly available nutritional information</li>
    <li>Always consult official sources and healthcare professionals for dietary decisions</li>
</ul>

<h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">6. Health and Dietary Advice</h2>
<ul class="list-disc pl-6 text-gray-700 mb-4 space-y-2">
    <li>This tool does not provide medical or dietary advice</li>
    <li>Consult healthcare professionals for specific dietary requirements</li>
    <li>We are not responsible for dietary decisions based on our calculations</li>
    <li>Users with food allergies should verify ingredients with official sources</li>
</ul>

<h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">7. Limitation of Liability</h2>
<p class="text-gray-700 mb-4">ChipotleNutrition.org is provided "as is" without warranties of any kind, express or implied. We are not liable for any direct, indirect, incidental, or consequential damages arising from use of this service.</p>

<h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">8. Modifications</h2>
<p class="text-gray-700 mb-4">We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated effective date.</p>

<h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">9. Termination</h2>
<p class="text-gray-700 mb-4">We may suspend or terminate access to our service at any time for violation of these terms.</p>

<h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">10. Contact Information</h2>
<p class="text-gray-700 mb-4">For questions about these terms, contact us at support@chipotlenutrition.org</p>
`;

const PRIVACY_CONTENT = `
<h1 class="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
<p class="text-gray-600 mb-6">Effective Date: September 2025</p>

<h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">1. Our Commitment to Privacy</h2>
<p class="text-gray-700 mb-4">At ChipotleNutrition.org, we are committed to protecting your privacy. This Privacy Policy explains our practices regarding the collection, use, and disclosure of information when you use our nutrition calculator service.</p>

<h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">2. Information We Do Not Collect</h2>
<p class="text-gray-700 mb-2">We have designed our service with privacy in mind:</p>
<ul class="list-disc pl-6 text-gray-700 mb-4 space-y-2">
    <li>We do not collect personal information such as names, email addresses, or phone numbers</li>
    <li>We do not use cookies to track your browsing behavior</li>
    <li>We do not store your meal calculations or nutrition queries</li>
    <li>We do not use analytics tools that track individual users</li>
    <li>We do not require account registration or login</li>
    <li>We do not collect IP addresses or device information for tracking purposes</li>
</ul>

<h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">3. How Our Service Works</h2>
<ul class="list-disc pl-6 text-gray-700 mb-4 space-y-2">
    <li>All nutrition calculations are performed in your browser locally</li>
    <li>No meal data is transmitted to or stored on our servers</li>
    <li>Each visit is independent with no connection to previous sessions</li>
    <li>Your nutrition calculations remain completely private</li>
</ul>

<h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">4. Third-Party Services</h2>
<ul class="list-disc pl-6 text-gray-700 mb-4 space-y-2">
    <li>We do not integrate with social media platforms that track users</li>
    <li>We do not use advertising networks that collect personal data</li>
    <li>We do not employ third-party analytics services</li>
    <li>Any external links are clearly marked and subject to their own privacy policies</li>
</ul>

<h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">5. Age Requirements</h2>
<p class="text-gray-700 mb-4">There are no age restrictions for using our nutrition calculator. Since we don't collect any personal information, users of all ages can safely use our service.</p>

<h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">6. Data Security</h2>
<p class="text-gray-700 mb-4">While we don't collect personal data, we maintain security measures to protect our service from unauthorized access and ensure reliable functionality.</p>

<h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">7. Your Rights</h2>
<p class="text-gray-700 mb-4">Since we don't collect personal information, there is no personal data to access, modify, or delete. You maintain complete control over your privacy when using our service.</p>

<h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">8. Changes to This Policy</h2>
<p class="text-gray-700 mb-4">We will update this Privacy Policy if our practices change. Any updates will be posted on this page with a new effective date. Since we don't collect contact information, we cannot notify users directly of changes.</p>

<h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">9. Compliance</h2>
<p class="text-gray-700 mb-4">Our privacy practices comply with applicable data protection laws. Since we don't collect personal data, most data protection requirements are inherently satisfied.</p>

<h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">10. Contact Us</h2>
<p class="text-gray-700 mb-4">If you have questions about this privacy policy, please contact us at privacy@chipotlenutrition.org</p>
`;
