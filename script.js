/* ==========================================
   NEONSTOCKS - JAVASCRIPT ENGINE & LOGIC
   ========================================== */

// --- Translation Dictionary (KA / EN) ---
const translations = {
  en: {
    v1_badge: "v2.4 LIVE",
    hud_online: "SYS.ONLINE",
    live_active: "LIVE DATA ACTIVE // STREAMING REAL-TIME SIMULATION FEED",
    market_chart: "Market Telemetry & Analysis",
    quick_trade: "Quick Trade Terminal",
    select_asset: "SELECT ASSET",
    order_amount: "ORDER AMOUNT ($)",
    btn_buy: "EXECUTE BUY",
    btn_sell: "EXECUTE SELL",
    terminal_log: "TERMINAL LOG",
    global_watchlist: "Global Asset Watchlist",
    search_placeholder: "Search ticker...",
    th_asset: "Asset",
    th_price: "Price (USD)",
    th_24h: "24h Change",
    th_volume: "24h Volume",
    th_action: "Action",
    trade_buy_msg: "[TRADE] Successfully bought",
    trade_sell_msg: "[TRADE] Successfully sold",
    init_msg:
      "[SYSTEM] Initialized secure neural link...<br>[SYSTEM] Ready for market execution.",
  },
  ka: {
    v1_badge: "v2.4 ლაივი",
    hud_online: "სისტემა.აქტიურია",
    live_active: "ლაივ მონაცემები აქტიურია // რეალურ დროში სიმულაციის სტრიმი",
    market_chart: "ბაზრის ტელემეტრია და ანალიზი",
    quick_trade: "სწრაფი ვაჭრობის ტერმინალი",
    select_asset: "აირჩიეთ აქტივი",
    order_amount: "ორდერის თანხა ($)",
    btn_buy: "ყიდვა",
    btn_sell: "გაყიდვა",
    terminal_log: "ტერმინალის ჟურნალი",
    global_watchlist: "გლობალური აქტივების სია",
    search_placeholder: "მოძებნე ტიქერი...",
    th_asset: "აქტივი",
    th_price: "ფასი (USD)",
    th_24h: "24სთ ცვლილება",
    th_volume: "24სთ მოცულობა",
    th_action: "მოქმედება",
    trade_buy_msg: "[ვაჭრობა] წარმატებით იყიდეთ",
    trade_sell_msg: "[ვაჭრობა] წარმატებით გაყიდეთ",
    init_msg:
      "[სისტემა] უსაფრთხო ნეირონული კავშირი დამყარებულია...<br>[სისტემა] მზადაა ბაზარზე ოპერირებისთვის.",
  },
};

let currentLang = "ka"; // Default to Georgian as requested

// --- Assets Data Source ---
const assetsData = [
  {
    id: "BTC",
    name: "Bitcoin",
    ticker: "BTC/USD",
    price: 68420.5,
    change: 2.45,
    volume: "$32.4B",
    icon: "fa-brands fa-bitcoin",
    isCrypto: true,
  },
  {
    id: "ETH",
    name: "Ethereum",
    ticker: "ETH/USD",
    price: 3540.8,
    change: 1.82,
    volume: "$15.1B",
    icon: "fa-brands fa-ethereum",
    isCrypto: true,
  },
  {
    id: "SPX",
    name: "S&P 500",
    ticker: "SPX",
    price: 5230.15,
    change: 0.45,
    volume: "$410.5B",
    icon: "fa-solid fa-chart-line",
    isCrypto: false,
  },
  {
    id: "NDX",
    name: "NASDAQ",
    ticker: "NDX",
    price: 16410.9,
    change: -0.32,
    volume: "$280.2B",
    icon: "fa-solid fa-microchip",
    isCrypto: false,
  },
  {
    id: "SOL",
    name: "Solana",
    ticker: "SOL/USD",
    price: 145.2,
    change: 5.12,
    volume: "$4.8B",
    icon: "fa-solid fa-coins",
    isCrypto: true,
  },
  {
    id: "TSLA",
    name: "Tesla",
    ticker: "TSLA",
    price: 175.5,
    change: -1.25,
    volume: "$12.3B",
    icon: "fa-solid fa-car",
    isCrypto: false,
  },
  {
    id: "NVDA",
    name: "NVIDIA",
    ticker: "NVDA",
    price: 890.4,
    change: 3.74,
    volume: "$45.6B",
    icon: "fa-solid microchip",
    isCrypto: false,
  },
  {
    id: "AAPL",
    name: "Apple",
    ticker: "AAPL",
    price: 172.1,
    change: 0.15,
    volume: "$9.8B",
    icon: "fa-solid fa-laptop",
    isCrypto: false,
  },
];

let selectedChartAsset = "BTC";
let mainChart = null;
const sparkcharts = {};

// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
  initMatrixRain();
  initThemeSelector();
  initLanguageSwitcher();
  initWatchlistTable();
  initMainChart();
  initSparklines();
  initTradeTerminal();

  // Start Live Simulation Loop
  setInterval(updateLivePrices, 1500);
});

// --- Matrix Digital Rain Canvas ---
function initMatrixRain() {
  const canvas = document.getElementById("matrix-canvas");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const katakana =
    "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
  const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
  const alphabet = katakana + latin;

  const fontSize = 14;
  let columns = canvas.width / fontSize;
  const rainDrops = Array.from({ length: Math.floor(columns) }).fill(1);

  function draw() {
    ctx.fillStyle = "rgba(15, 17, 26, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle =
      getComputedStyle(document.body).getPropertyValue("--primary") ||
      "#7dcfff";
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < rainDrops.length; i++) {
      const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
      const x = i * fontSize;
      const y = rainDrops[i] * fontSize;
      ctx.fillText(text, x, y);

      if (y > canvas.height && Math.random() > 0.975) {
        rainDrops[i] = 0;
      }
      rainDrops[i]++;
    }
  }
  setInterval(draw, 30);
}

// --- Theme Selector ---
function initThemeSelector() {
  const selector = document.getElementById("theme-selector");
  selector.addEventListener("change", (e) => {
    document.body.setAttribute("data-theme", e.target.value);
  });
}

// --- Language Switcher ---
function initLanguageSwitcher() {
  const langBtn = document.getElementById("lang-toggle");
  const langText = document.getElementById("lang-text");

  langBtn.addEventListener("click", () => {
    currentLang = currentLang === "ka" ? "en" : "ka";
    langText.textContent = currentLang.toUpperCase();
    applyTranslations();
  });
}

function applyTranslations() {
  const t = translations[currentLang];
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) el.textContent = t[key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (t[key]) el.placeholder = t[key];
  });
}

// --- Watchlist Table ---
function initWatchlistTable() {
  const tbody = document.getElementById("watchlist-tbody");
  renderTableRows(assetsData);

  document.getElementById("asset-search").addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = assetsData.filter(
      (a) =>
        a.name.toLowerCase().includes(term) ||
        a.ticker.toLowerCase().includes(term),
    );
    renderTableRows(filtered);
  });
}

function renderTableRows(data) {
  const tbody = document.getElementById("watchlist-tbody");
  tbody.innerHTML = "";
  data.forEach((asset) => {
    const tr = document.createElement("tr");
    const trendClass = asset.change >= 0 ? "positive" : "negative";
    const sign = asset.change >= 0 ? "+" : "";
    tr.innerHTML = `
            <td><div class="asset-info"><i class="${asset.icon} crypto-icon"></i><div><strong>${asset.name}</strong><br><span class="ticker">${asset.ticker}</span></div></div></td>
            <td><strong>$${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong></td>
            <td><span class="trend-badge ${trendClass}">${sign}${asset.change.toFixed(2)}%</span></td>
            <td>${asset.volume}</td>
            <td><button class="table-action-btn" onclick="selectAssetForChart('${asset.id}')">SELECT</button></td>
        `;
    tbody.appendChild(tr);
  });
}

// --- Charts Initialization ---
function initMainChart() {
  const ctx = document.getElementById("mainMarketChart").getContext("2d");
  const initialData = generateMockChartData();

  mainChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: initialData.labels,
      datasets: [
        {
          label: "Price (USD)",
          data: initialData.prices,
          borderColor: "#7dcfff",
          backgroundColor: "rgba(125, 207, 255, 0.1)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: {
          grid: { color: "rgba(255,255,255,0.05)" },
          ticks: { color: "#565f89", font: { family: "Space Mono" } },
        },
        y: {
          grid: { color: "rgba(255,255,255,0.05)" },
          ticks: { color: "#565f89", font: { family: "Space Mono" } },
        },
      },
    },
  });

  document.querySelectorAll(".time-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document
        .querySelectorAll(".time-btn")
        .forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");
      updateChartTimeframe(e.target.getAttribute("data-time"));
    });
  });
}

function generateMockChartData(points = 20) {
  let labels = [];
  let prices = [];
  let base = 68000;
  for (let i = points; i >= 0; i--) {
    labels.push(`${i}m ago`);
    base += (Math.random() - 0.48) * 150;
    prices.push(parseFloat(base.toFixed(2)));
  }
  return { labels, prices };
}

function updateChartTimeframe(timeframe) {
  const data = generateMockChartData(
    timeframe === "1H" ? 15 : timeframe === "1D" ? 24 : 30,
  );
  mainChart.data.labels = data.labels;
  mainChart.data.datasets[0].data = data.prices;
  mainChart.update();
}

function selectAssetForChart(assetId) {
  selectedChartAsset = assetId;
  const asset = assetsData.find((a) => a.id === assetId);
  if (asset) {
    const newData = generateMockChartData();
    mainChart.data.datasets[0].data = newData.prices;
    mainChart.update();
    document.getElementById("trade-asset").value = assetId;
  }
}

function initSparklines() {
  ["btc", "eth", "spx", "ndx"].forEach((id) => {
    const ctx = document.getElementById(`${id}-sparkline`).getContext("2d");
    sparkcharts[id] = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["", "", "", "", "", "", ""],
        datasets: [
          {
            data: [10, 12, 11, 14, 13, 15, 18],
            borderColor: "#9ece6a",
            borderWidth: 1.5,
            pointRadius: 0,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { x: { display: false }, y: { display: false } },
      },
    });
  });
}

// --- Live Price Ticks Simulation ---
function updateLivePrices() {
  assetsData.forEach((asset) => {
    const delta = (Math.random() - 0.49) * (asset.price * 0.001);
    asset.price += delta;
    asset.change += (Math.random() - 0.5) * 0.05;
  });

  // Update Summary Top Cards
  updateSummaryCardDOM(
    "btc",
    assetsData.find((a) => a.id === "BTC"),
  );
  updateSummaryCardDOM(
    "eth",
    assetsData.find((a) => a.id === "ETH"),
  );
  updateSummaryCardDOM(
    "spx",
    assetsData.find((a) => a.id === "SPX"),
  );
  updateSummaryCardDOM(
    "ndx",
    assetsData.find((a) => a.id === "NDX"),
  );

  // Update Table
  renderTableRows(assetsData);
}

function updateSummaryCardDOM(prefix, asset) {
  if (!asset) return;
  document.getElementById(`${prefix}-price`).textContent =
    `$${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const trendEl = document.getElementById(`${prefix}-trend`);
  const sign = asset.change >= 0 ? "+" : "";
  trendEl.textContent = `${sign}${asset.change.toFixed(2)}%`;
  trendEl.className = `trend-badge ${asset.change >= 0 ? "positive" : "negative"}`;
}

// --- Trade Terminal ---
function initTradeTerminal() {
  const buyBtn = document.getElementById("btn-buy");
  const sellBtn = document.getElementById("btn-sell");
  const output = document.getElementById("terminal-output");

  buyBtn.addEventListener("click", () => executeTrade("BUY"));
  sellBtn.addEventListener("click", () => executeTrade("SELL"));
}

function executeTrade(type) {
  const assetId = document.getElementById("trade-asset").value;
  const amount = document.getElementById("trade-amount").value;
  const output = document.getElementById("terminal-output");
  const t = translations[currentLang];

  const msgKey = type === "BUY" ? t.trade_buy_msg : t.trade_sell_msg;
  const timeStr = new Date().toLocaleTimeString();

  const logLine = `[${timeStr}] ${msgKey} $${amount} of ${assetId}.<br>`;
  output.innerHTML = logLine + output.innerHTML;
}
