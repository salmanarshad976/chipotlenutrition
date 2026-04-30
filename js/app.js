let selectedItems = {};
let currentMenuSlug = null;
let itemDataMap = {};

function navigateTo(path) {
    window.history.pushState({}, "", path);
    route();
}

function route() {
    const path = window.location.pathname;
    const app = document.getElementById("app");
    selectedItems = {};
    itemDataMap = {};
    currentMenuSlug = null;
    hideNutritionBar();

    if (path === "/" || path === "") {
        renderHome(app);
        document.title = "Chipotle Nutrition Calculator - Free Calorie Counter & Nutrition Facts Tool";
    } else if (path === "/terms") {
        renderStaticPage(app, TERMS_CONTENT);
        document.title = "Terms of Service - Chipotle Nutrition Calculator";
    } else if (path === "/privacy") {
        renderStaticPage(app, PRIVACY_CONTENT);
        document.title = "Privacy Policy - Chipotle Nutrition Calculator";
    } else if (path.startsWith("/menu/")) {
        const slug = path.replace("/menu/", "");
        if (MENU_DATA[slug]) {
            currentMenuSlug = slug;
            renderMenuPage(app, slug);
            document.title = MENU_DATA[slug].name + " Nutrition Calculator - Calorie Counter & Nutrition Facts";
        } else {
            renderHome(app);
        }
    } else {
        renderHome(app);
    }

    window.scrollTo(0, 0);
}

/* ── HOME PAGE ── */

function renderHome(container) {
    container.innerHTML =
        '<div class="hero-gradient">' +
            '<div class="max-w-6xl mx-auto px-4 pt-20 pb-16">' +
                '<div class="text-center max-w-3xl mx-auto">' +
                    '<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-8" style="background:rgba(255,107,53,0.1);border:1px solid rgba(255,107,53,0.2);color:#ff6b35;">' +
                        '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>' +
                        'Free Nutrition Calculator' +
                    '</div>' +
                    '<h1 class="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">Know What You\'re <span class="gradient-text">Eating</span></h1>' +
                    '<p class="text-neutral-400 text-lg md:text-xl leading-relaxed mb-10">' +
                        'Calculate calories, protein, carbs, and fat for every Chipotle menu item. ' +
                        'Build your perfect meal and make smarter choices.' +
                    '</p>' +
                    '<a href="/menu/burrito-bowl" onclick="navigateTo(\'/menu/burrito-bowl\'); return false;" class="cta-btn text-lg">Start Building Your Meal</a>' +
                '</div>' +
            '</div>' +
        '</div>' +

        '<div class="max-w-6xl mx-auto px-4 py-16">' +
            '<div class="flex items-center justify-between mb-10">' +
                '<div>' +
                    '<h2 class="text-3xl font-bold text-white">Choose Your Meal</h2>' +
                    '<p class="text-neutral-500 mt-2">Select a menu item to start calculating nutrition</p>' +
                '</div>' +
                '<div class="hidden md:flex items-center gap-2 text-neutral-500 text-sm">' +
                    '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>' +
                    MENU_ITEMS.length + ' menu types' +
                '</div>' +
            '</div>' +

            '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">' +
                MENU_ITEMS.map(function(item) {
                    return '<a href="/menu/' + item.slug + '" onclick="navigateTo(\'/menu/' + item.slug + '\'); return false;"' +
                        ' aria-label="View ' + item.name + ' nutrition"' +
                        ' class="glass-card rounded-2xl overflow-hidden group block">' +
                            '<div class="p-6">' +
                                '<div class="flex justify-center mb-5 h-44">' +
                                    '<img src="' + item.image + '" alt="' + item.name + '"' +
                                        ' class="h-full object-contain group-hover:scale-105 transition-transform duration-500" loading="lazy">' +
                                '</div>' +
                                '<div class="flex items-center justify-between">' +
                                    '<div>' +
                                        '<h3 class="font-bold text-white text-lg">' + item.name.replace("Chipotle ", "") + '</h3>' +
                                        '<span class="text-neutral-500 text-sm">Nutrition Calculator</span>' +
                                    '</div>' +
                                    '<div class="w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-brand-500 transition-colors" style="background:rgba(255,255,255,0.06);">' +
                                        '<svg class="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</a>';
                }).join("") +
            '</div>' +

            renderFaqSection() +
        '</div>';
}

function renderFaqSection() {
    return '<div class="max-w-3xl mx-auto">' +
        '<div class="text-center mb-10">' +
            '<h2 class="text-3xl font-bold text-white mb-3">Frequently Asked Questions</h2>' +
            '<p class="text-neutral-500">Everything you need to know about using our calculator</p>' +
        '</div>' +
        '<div class="space-y-3">' +
            FAQ_DATA.map(function(faq, i) {
                return '<div class="faq-item">' +
                    '<button onclick="toggleFaq(' + i + ')" class="w-full text-left px-6 py-5 flex items-center justify-between gap-4">' +
                        '<h3 class="font-semibold text-white text-[15px]">' + faq.q + '</h3>' +
                        '<svg id="faq-icon-' + i + '" class="w-5 h-5 text-neutral-500 flex-shrink-0 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
                            '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>' +
                        '</svg>' +
                    '</button>' +
                    '<div id="faq-body-' + i + '" class="hidden px-6 pb-5">' +
                        '<p class="text-neutral-400 leading-relaxed text-sm">' + faq.a + '</p>' +
                    '</div>' +
                '</div>';
            }).join("") +
        '</div>' +
    '</div>';
}

function toggleFaq(index) {
    var body = document.getElementById("faq-body-" + index);
    var icon = document.getElementById("faq-icon-" + index);
    if (body.classList.contains("hidden")) {
        body.classList.remove("hidden");
        icon.style.transform = "rotate(180deg)";
    } else {
        body.classList.add("hidden");
        icon.style.transform = "rotate(0deg)";
    }
}

/* ── STATIC PAGES ── */

function renderStaticPage(container, content) {
    container.innerHTML =
        '<div class="max-w-3xl mx-auto px-4 py-16">' +
            '<div class="static-page section-card p-8 md:p-12">' +
                content +
            '</div>' +
        '</div>';
}

/* ── MENU PAGE ── */

function renderMenuPage(container, slug) {
    var data = MENU_DATA[slug];
    var otherMenus = MENU_ITEMS.filter(function(m) { return m.slug !== slug; });

    var sectionsHtml = data.sections.map(function(section, si) {
        return renderSection(section, si, slug);
    }).join("");

    var otherMenusHtml = otherMenus.map(function(m) {
        return '<a href="/menu/' + m.slug + '" onclick="navigateTo(\'/menu/' + m.slug + '\'); return false;"' +
            ' aria-label="View ' + m.name + ' nutrition calculator"' +
            ' class="other-menu-card">' +
                '<img src="' + m.image + '" alt="' + m.name + '" class="w-full h-20 object-contain mb-3" loading="lazy">' +
                '<div class="text-sm text-neutral-400">' + m.name.replace("Chipotle ", "") + '</div>' +
            '</a>';
    }).join("");

    container.innerHTML =
        '<div class="hero-gradient">' +
            '<div class="max-w-3xl mx-auto px-4 pt-12 pb-8">' +
                '<nav class="breadcrumb text-sm text-neutral-500 mb-8">' +
                    '<a href="/" onclick="navigateTo(\'/\'); return false;" aria-label="Go to Home">Home</a>' +
                    '<span class="mx-2 text-neutral-600">/</span>' +
                    '<span class="text-neutral-400">' + data.name.replace("Chipotle ", "") + '</span>' +
                '</nav>' +

                '<div class="flex flex-col md:flex-row items-center gap-8 mb-12">' +
                    '<div class="flex-shrink-0">' +
                        '<img src="' + data.heroImage + '" alt="' + data.name + '" class="w-48 md:w-64 object-contain" loading="eager">' +
                    '</div>' +
                    '<div>' +
                        '<h1 class="text-3xl md:text-4xl font-black text-white mb-3">' + data.name.replace("Chipotle ", "") + ' <span class="gradient-text">Calculator</span></h1>' +
                        '<p class="text-neutral-400 leading-relaxed">' +
                            'Select your ingredients below to calculate the total nutrition for your ' + data.name.replace("Chipotle ", "").toLowerCase() + '. ' +
                            'Tap any item to add it to your meal.' +
                        '</p>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +

        '<div class="max-w-3xl mx-auto px-4 pb-16">' +
            '<div id="menu-sections" class="space-y-6">' +
                sectionsHtml +
            '</div>' +

            '<div class="mt-16">' +
                '<h2 class="text-2xl font-bold text-white mb-6">Other Calculators</h2>' +
                '<div class="grid grid-cols-2 md:grid-cols-3 gap-4">' +
                    otherMenusHtml +
                '</div>' +
            '</div>' +
        '</div>';
}

function renderSection(section, sectionIndex, slug) {
    var itemsHtml = section.items.map(function(item, ii) {
        var key = sectionIndex + "-" + ii;
        itemDataMap[key] = item;
        return renderIngredientRow(item, key);
    }).join("");

    return '<div class="section-card p-5 md:p-6">' +
        '<div class="mb-4">' +
            '<h2 class="text-lg font-bold text-white uppercase tracking-wide">' + section.title + '</h2>' +
            (section.subtitle ? '<p class="text-sm text-neutral-500 mt-1">' + section.subtitle + '</p>' : '') +
        '</div>' +
        '<div class="space-y-2">' +
            itemsHtml +
        '</div>' +
    '</div>';
}

function escapeAttr(s) {
    return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderIngredientRow(item, key) {
    return '<div id="item-' + key + '" class="ingredient-card cursor-pointer select-none p-4"' +
        ' role="button" tabindex="0" aria-pressed="false"' +
        ' onclick="toggleItem(\'' + key + '\')"' +
        ' onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();toggleItem(\'' + key + '\');}">' +
        '<div class="flex items-center gap-4">' +
            '<div class="custom-check" id="item-check-' + key + '"></div>' +
            '<img src="' + item.image + '" alt="' + escapeAttr(item.name) + '" class="w-14 h-14 md:w-16 md:h-16 object-cover rounded-lg flex-shrink-0" loading="lazy">' +
            '<div class="flex-grow min-w-0">' +
                '<div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2">' +
                    '<div class="flex-grow min-w-0">' +
                        '<h3 class="font-semibold text-white text-[15px] truncate">' + escapeAttr(item.name) + '</h3>' +
                        (item.subtitle ? '<p class="text-xs text-neutral-500">' + escapeAttr(item.subtitle) + '</p>' : '') +
                        '<div id="item-portion-' + key + '" class="hidden mt-2"></div>' +
                    '</div>' +
                    '<div class="flex flex-wrap gap-2 flex-shrink-0">' +
                        '<div class="nutrition-pill cal"><span class="value text-xs font-bold">' + item.cal + '</span><div class="label text-[10px] text-neutral-500">Cal</div></div>' +
                        '<div class="nutrition-pill fat"><span class="value text-xs font-bold">' + item.fat + 'g</span><div class="label text-[10px] text-neutral-500">Fat</div></div>' +
                        '<div class="nutrition-pill pro"><span class="value text-xs font-bold">' + item.protein + 'g</span><div class="label text-[10px] text-neutral-500">Pro</div></div>' +
                        '<div class="nutrition-pill carb"><span class="value text-xs font-bold">' + item.carbs + 'g</span><div class="label text-[10px] text-neutral-500">Carb</div></div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>';
}

/* ── SELECTION LOGIC ── */

function toggleItem(key) {
    var item = itemDataMap[key];
    if (!item) return;

    if (selectedItems[key]) {
        delete selectedItems[key];
        setItemUnselected(key);
    } else {
        selectedItems[key] = { cal: item.cal, fat: item.fat, protein: item.protein, carbs: item.carbs, portion: "normal", allowDouble: item.allowDouble };
        setItemSelected(key, item);
    }
    updateNutritionBar();
}

function setItemSelected(key, item) {
    var card = document.getElementById("item-" + key);
    var check = document.getElementById("item-check-" + key);
    var portion = document.getElementById("item-portion-" + key);

    if (card) card.classList.add("selected");
    if (check) {
        check.classList.add("checked");
        check.innerHTML = '<svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>';
    }
    if (card) card.setAttribute("aria-pressed", "true");

    if (item.allowDouble && portion) {
        portion.classList.remove("hidden");
        portion.innerHTML =
            '<div class="flex items-center gap-4 text-sm" onclick="event.stopPropagation();">' +
                '<div class="flex items-center gap-1.5 cursor-pointer" onclick="event.stopPropagation(); setPortion(\'' + key + '\', \'normal\');">' +
                    '<div class="portion-radio active" id="portion-normal-' + key + '">' +
                        '<div class="w-2 h-2 rounded-full bg-white"></div>' +
                    '</div>' +
                    '<span class="text-neutral-300 text-xs">Normal</span>' +
                '</div>' +
                '<div class="flex items-center gap-1.5 cursor-pointer" onclick="event.stopPropagation(); setPortion(\'' + key + '\', \'double\');">' +
                    '<div class="portion-radio" id="portion-double-' + key + '"></div>' +
                    '<span class="text-neutral-300 text-xs">Double</span>' +
                '</div>' +
            '</div>';
    }
}

function setItemUnselected(key) {
    var card = document.getElementById("item-" + key);
    var check = document.getElementById("item-check-" + key);
    var portion = document.getElementById("item-portion-" + key);

    if (card) card.classList.remove("selected");
    if (check) {
        check.classList.remove("checked");
        check.innerHTML = "";
    }
    if (portion) {
        portion.classList.add("hidden");
        portion.innerHTML = "";
    }
    if (card) card.setAttribute("aria-pressed", "false");
}

function setPortion(key, portion) {
    if (!selectedItems[key]) return;
    selectedItems[key].portion = portion;

    var normalBtn = document.getElementById("portion-normal-" + key);
    var doubleBtn = document.getElementById("portion-double-" + key);

    if (portion === "normal") {
        if (normalBtn) {
            normalBtn.className = "portion-radio active";
            normalBtn.innerHTML = '<div class="w-2 h-2 rounded-full bg-white"></div>';
        }
        if (doubleBtn) {
            doubleBtn.className = "portion-radio";
            doubleBtn.innerHTML = "";
        }
    } else {
        if (doubleBtn) {
            doubleBtn.className = "portion-radio active";
            doubleBtn.innerHTML = '<div class="w-2 h-2 rounded-full bg-white"></div>';
        }
        if (normalBtn) {
            normalBtn.className = "portion-radio";
            normalBtn.innerHTML = "";
        }
    }

    updateNutritionBar();
}

/* ── NUTRITION BAR ── */

function updateNutritionBar() {
    var bar = document.getElementById("nutrition-bar");
    var keys = Object.keys(selectedItems);
    var count = keys.length;

    if (count === 0) {
        hideNutritionBar();
        return;
    }

    var totalCal = 0, totalFat = 0, totalProtein = 0, totalCarbs = 0;
    for (var i = 0; i < keys.length; i++) {
        var item = selectedItems[keys[i]];
        var multiplier = item.portion === "double" ? 2 : 1;
        totalCal += item.cal * multiplier;
        totalFat += item.fat * multiplier;
        totalProtein += item.protein * multiplier;
        totalCarbs += item.carbs * multiplier;
    }

    document.getElementById("selected-count").textContent = count + " item" + (count !== 1 ? "s" : "") + " selected";
    document.getElementById("total-calories").textContent = totalCal;
    document.getElementById("total-fat").textContent = totalFat + "g";
    document.getElementById("total-protein").textContent = totalProtein + "g";
    document.getElementById("total-carbs").textContent = totalCarbs + "g";

    bar.style.display = "block";
    requestAnimationFrame(function() {
        bar.classList.remove("translate-y-full");
        bar.classList.add("translate-y-0");
    });
}

function hideNutritionBar() {
    var bar = document.getElementById("nutrition-bar");
    bar.classList.remove("translate-y-0");
    bar.classList.add("translate-y-full");
    setTimeout(function() {
        if (bar.classList.contains("translate-y-full")) {
            bar.style.display = "none";
        }
    }, 300);
}

function clearAllSelections() {
    var keys = Object.keys(selectedItems);
    for (var i = 0; i < keys.length; i++) {
        setItemUnselected(keys[i]);
    }
    selectedItems = {};
    updateNutritionBar();
}

/* ── INIT ── */

window.addEventListener("popstate", route);
route();
