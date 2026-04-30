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
            document.title = `${MENU_DATA[slug].name} Nutrition Calculator - Calorie Counter & Nutrition Facts`;
        } else {
            renderHome(app);
        }
    } else {
        renderHome(app);
    }

    window.scrollTo(0, 0);
}

function renderHome(container) {
    container.innerHTML = `
        <div class="max-w-5xl mx-auto px-4 py-12">
            <div class="text-center mb-12">
                <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Chipotle Nutrition Calculator</h1>
                <p class="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
                    Calculate nutrition information for your favorite Chipotle meals with our free online tool.
                    Select your ingredients to see calories, protein, carbs, fat, and other nutrition facts for bowls,
                    burritos, salads, and more. Make healthier choices with instant nutrition data.
                </p>
            </div>

            <section class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                ${MENU_ITEMS.map(item => `
                    <a href="/menu/${item.slug}" onclick="navigateTo('/menu/${item.slug}'); return false;"
                       aria-label="View ${item.name} nutrition"
                       class="group block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200">
                        <div class="p-6">
                            <div class="flex justify-center mb-4">
                                <img src="${item.image}" alt="${item.name}"
                                     class="w-full max-w-xs h-48 object-contain" loading="lazy">
                            </div>
                            <h2 class="text-xl font-bold text-gray-800 mb-2">${item.name}</h2>
                            <span class="text-orange-500 group-hover:text-orange-600 font-medium text-sm transition-colors">
                                View ${item.name} Nutrition facts &rarr;
                            </span>
                        </div>
                    </a>
                `).join("")}
            </section>

            <section class="max-w-3xl mx-auto">
                <h2 class="text-3xl md:text-4xl font-bold text-red-600 text-center mb-3">Frequently Asked Questions</h2>
                <p class="text-center text-gray-600 mb-8">Find answers to common questions about using our Chipotle Nutrition Calculator</p>

                <div class="space-y-4">
                    ${FAQ_DATA.map((faq, i) => `
                        <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <button onclick="toggleFaq(${i})" class="w-full text-left px-6 py-5 flex items-center justify-between gap-4">
                                <h3 class="font-bold text-gray-800 text-lg">${faq.q}</h3>
                                <svg id="faq-icon-${i}" class="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            <div id="faq-body-${i}" class="hidden px-6 pb-5">
                                <p class="text-gray-600 leading-relaxed">${faq.a}</p>
                            </div>
                        </div>
                    `).join("")}
                </div>

                <div class="text-center mt-8">
                    <a href="/" onclick="navigateTo('/'); return false;"
                       class="inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                        Start Calculating Nutrition
                    </a>
                </div>
            </section>
        </div>
    `;
}

function toggleFaq(index) {
    const body = document.getElementById("faq-body-" + index);
    const icon = document.getElementById("faq-icon-" + index);
    if (body.classList.contains("hidden")) {
        body.classList.remove("hidden");
        icon.style.transform = "rotate(180deg)";
    } else {
        body.classList.add("hidden");
        icon.style.transform = "rotate(0deg)";
    }
}

function renderStaticPage(container, content) {
    container.innerHTML = `
        <div class="max-w-3xl mx-auto px-4 py-12">
            <div class="bg-white rounded-xl border border-gray-200 p-8 md:p-12">
                ${content}
            </div>
        </div>
    `;
}

function renderMenuPage(container, slug) {
    const data = MENU_DATA[slug];
    const otherMenus = MENU_ITEMS.filter(m => m.slug !== slug);

    container.innerHTML = `
        <div class="max-w-3xl mx-auto px-4 py-12">
            <div class="text-center mb-8">
                <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">${data.name} Nutrition Calculator</h1>
                <p class="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Calculate nutrition information for your favorite ${data.name} meals with our free online tool.
                    Select your ingredients to see calories, protein, carbs, fat, and other nutrition facts for bowls,
                    burritos, salads, and more. Make healthier choices with instant nutrition data.
                </p>
            </div>

            <div class="flex justify-center mb-10">
                <img src="${data.heroImage}" alt="${data.name}" class="max-w-md w-full object-contain" loading="eager">
            </div>

            <div id="menu-sections" class="space-y-8">
                ${data.sections.map((section, si) => renderSection(section, si, slug)).join("")}
            </div>

            <section class="mt-16">
                <h2 class="text-2xl font-bold text-gray-800 mb-6">Other Menu & Nutrition Calculator</h2>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                    ${otherMenus.map(m => `
                        <a href="/menu/${m.slug}" onclick="navigateTo('/menu/${m.slug}'); return false;"
                           aria-label="View ${m.name} nutrition calculator"
                           class="group bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md hover:border-gray-300 transition-all text-center">
                            <img src="${m.image}" alt="${m.name}" class="w-full h-24 object-contain mb-2" loading="lazy">
                            <div class="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">${m.name} Nutrition Calculator nutrition calculator</div>
                        </a>
                    `).join("")}
                </div>
            </section>

            <nav aria-label="Breadcrumb" class="mt-8 text-sm text-gray-500">
                <a href="/" onclick="navigateTo('/'); return false;" aria-label="Go to Home" class="text-blue-600 hover:text-blue-800">Home</a>
                <span class="mx-1">/</span>
                <span>${data.name.replace("Chipotle ", "")}</span>
            </nav>
        </div>
    `;
}

function renderSection(section, sectionIndex, slug) {
    return `
        <div class="bg-white rounded-lg shadow-md p-6">
            <div class="mb-4">
                <h2 class="text-2xl font-semibold text-gray-800 uppercase">${section.title}</h2>
                ${section.subtitle ? '<p class="text-sm text-gray-600 mt-1">' + section.subtitle + '</p>' : ""}
            </div>
            <div class="space-y-3">
                ${section.items.map((item, ii) => {
                    const key = sectionIndex + "-" + ii;
                    itemDataMap[key] = item;
                    return renderIngredientRow(item, key);
                }).join("")}
            </div>
        </div>
    `;
}

function escapeAttr(s) {
    return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderIngredientRow(item, key) {
    return `
        <div id="item-${key}" class="cursor-pointer select-none transition-all duration-200 rounded-lg hover:ring-1 hover:ring-gray-300"
             role="button" tabindex="0" aria-pressed="false"
             onclick="toggleItem('${key}')"
             onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();toggleItem('${key}');}">
            <div class="border rounded-lg p-4 transition-colors bg-white border-gray-200" id="item-border-${key}">
                <div class="flex items-center gap-4">
                    <div class="flex-shrink-0">
                        <div id="item-check-${key}" class="w-5 h-5 md:w-6 md:h-6 rounded border-2 flex items-center justify-center transition-colors shadow-sm bg-white border-gray-300">
                        </div>
                    </div>
                    <div class="flex-shrink-0">
                        <img src="${item.image}" alt="${escapeAttr(item.name)}" class="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md" loading="lazy">
                    </div>
                    <div class="flex-grow min-w-0">
                        <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                            <div class="flex-grow min-w-0">
                                <h3 class="font-semibold text-lg text-gray-800 truncate">${escapeAttr(item.name)}</h3>
                                ${item.subtitle ? '<p class="text-sm text-gray-500">' + escapeAttr(item.subtitle) + '</p>' : ""}
                                <div id="item-portion-${key}" class="hidden mt-2"></div>
                            </div>
                            <div class="flex-shrink-0">
                                <div class="flex flex-wrap gap-4 text-sm" id="item-nutrition-${key}">
                                    <div class="flex flex-col items-center bg-orange-50 rounded-lg px-3 py-2 min-w-[60px]">
                                        <span class="font-bold text-orange-600">${item.cal}</span>
                                        <span class="text-xs text-gray-600">Calories</span>
                                    </div>
                                    <div class="flex flex-col items-center bg-blue-50 rounded-lg px-3 py-2 min-w-[60px]">
                                        <span class="font-bold text-blue-600">${item.fat}g</span>
                                        <span class="text-xs text-gray-600">Fat</span>
                                    </div>
                                    <div class="flex flex-col items-center bg-green-50 rounded-lg px-3 py-2 min-w-[60px]">
                                        <span class="font-bold text-green-600">${item.protein}g</span>
                                        <span class="text-xs text-gray-600">Protein</span>
                                    </div>
                                    <div class="flex flex-col items-center bg-purple-50 rounded-lg px-3 py-2 min-w-[60px]">
                                        <span class="font-bold text-purple-600">${item.carbs}g</span>
                                        <span class="text-xs text-gray-600">Carbs</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

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
    var border = document.getElementById("item-border-" + key);
    var check = document.getElementById("item-check-" + key);
    var portion = document.getElementById("item-portion-" + key);
    var row = document.getElementById("item-" + key);

    if (border) {
        border.classList.remove("border-gray-200", "bg-white");
        border.classList.add("border-orange-400", "bg-orange-50");
    }
    if (check) {
        check.classList.remove("bg-white", "border-gray-300");
        check.classList.add("bg-orange-500", "border-orange-500");
        check.innerHTML = '<svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>';
    }
    if (row) {
        row.setAttribute("aria-pressed", "true");
    }

    if (item.allowDouble && portion) {
        portion.classList.remove("hidden");
        portion.innerHTML = '<div class="flex items-center gap-3 text-sm" onclick="event.stopPropagation();">' +
            '<div class="flex items-center gap-1">' +
            '<button onclick="event.stopPropagation(); setPortion(\'' + key + '\', \'normal\');" id="portion-normal-' + key + '" class="w-5 h-5 rounded-full border-2 flex items-center justify-center border-orange-500 bg-orange-500">' +
            '<svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>' +
            '</button>' +
            '<label class="cursor-pointer" onclick="event.stopPropagation(); setPortion(\'' + key + '\', \'normal\');">Normal</label>' +
            '</div>' +
            '<div class="flex items-center gap-1">' +
            '<button onclick="event.stopPropagation(); setPortion(\'' + key + '\', \'double\');" id="portion-double-' + key + '" class="w-5 h-5 rounded-full border-2 flex items-center justify-center border-gray-300 bg-white">' +
            '</button>' +
            '<label class="cursor-pointer" onclick="event.stopPropagation(); setPortion(\'' + key + '\', \'double\');">Double</label>' +
            '</div>' +
            '</div>';
    }
}

function setItemUnselected(key) {
    var border = document.getElementById("item-border-" + key);
    var check = document.getElementById("item-check-" + key);
    var portion = document.getElementById("item-portion-" + key);
    var row = document.getElementById("item-" + key);

    if (border) {
        border.classList.remove("border-orange-400", "bg-orange-50");
        border.classList.add("border-gray-200", "bg-white");
    }
    if (check) {
        check.classList.remove("bg-orange-500", "border-orange-500");
        check.classList.add("bg-white", "border-gray-300");
        check.innerHTML = "";
    }
    if (portion) {
        portion.classList.add("hidden");
        portion.innerHTML = "";
    }
    if (row) {
        row.setAttribute("aria-pressed", "false");
    }
}

function setPortion(key, portion) {
    if (!selectedItems[key]) return;
    selectedItems[key].portion = portion;

    var normalBtn = document.getElementById("portion-normal-" + key);
    var doubleBtn = document.getElementById("portion-double-" + key);

    if (portion === "normal") {
        if (normalBtn) {
            normalBtn.className = "w-5 h-5 rounded-full border-2 flex items-center justify-center border-orange-500 bg-orange-500";
            normalBtn.innerHTML = '<svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>';
        }
        if (doubleBtn) {
            doubleBtn.className = "w-5 h-5 rounded-full border-2 flex items-center justify-center border-gray-300 bg-white";
            doubleBtn.innerHTML = "";
        }
    } else {
        if (doubleBtn) {
            doubleBtn.className = "w-5 h-5 rounded-full border-2 flex items-center justify-center border-orange-500 bg-orange-500";
            doubleBtn.innerHTML = '<svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>';
        }
        if (normalBtn) {
            normalBtn.className = "w-5 h-5 rounded-full border-2 flex items-center justify-center border-gray-300 bg-white";
            normalBtn.innerHTML = "";
        }
    }

    updateNutritionBar();
}

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

window.addEventListener("popstate", route);

route();
