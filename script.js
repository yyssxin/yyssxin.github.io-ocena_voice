/**
 * 模組一：通用功能 (所有頁面)
 * 處理導覽列與首頁卡片跳轉
 */
const initCommon = () => {
    // 點擊「開始探索」平滑滾動到主題區
    const startBtn = document.querySelector('.btn-start');
    if (startBtn) {
        startBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const topicsSection = document.querySelector('#topics');
            if (topicsSection) topicsSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // 首頁卡片點擊邏輯：跳轉至對應 HTML 檔案
    const cards = document.querySelectorAll('.topic-card');
    cards.forEach(card => {
        card.addEventListener('click', function () {
            const title = this.querySelector('h3').innerText;
            if (title === "行動測驗") {
                window.location.href = 'quiz.html';
            } else if (title === "瀕危生物地圖") {
                window.location.href = 'map.html';
            } else if (title === "珊瑚白化") {
                window.location.href = "coral.html";
            }
        });
    });
};

/**
 * 模組二：行動測驗功能
 */
const initQuiz = () => {
    const questions = [
        {
            question: "每年約有多少噸塑膠垃圾進入海洋？",
            options: ["100萬~300萬噸", "400萬~700萬噸", "800萬~1300萬噸", "1500萬噸"],
            correct: 2,
            explanation: "根據研究，每年有高達 800 萬至 1300 萬噸塑膠流入海洋，這相當於每分鐘就有一輛垃圾車的塑膠量被倒入海中。"
        },
        {
            question: "下列哪一種生物常因誤食塑膠袋而導致腸道阻塞死亡？",
            options: ["小丑魚", "綠蠵龜", "大翅鯨", "旗魚"],
            correct: 1,
            explanation: "海龜主要以水母為食，而漂浮在水中的塑膠袋外觀極像水母，導致海龜誤食後無法消化，最終因腸道阻塞而死亡。"
        },
        {
            question: "全球珊瑚礁消失的主要原因是什麼？",
            options: ["海水升溫與污染", "魚類太多", "海底火山爆發", "潮汐變化"],
            correct: 0,
            explanation: "氣候變遷導致海水溫度上升，會使與珊瑚共生的藻類離開，造成珊瑚白化，若水溫持續過高，珊瑚最終會死亡。"
        },
        {
            question: "什麼是「微塑膠」？",
            options: ["一種新型魚餌", "直徑小於 5mm 的塑膠微粒", "顯微鏡下的水分子", "高科技纖維"],
            correct: 1,
            explanation: "微塑膠是指直徑小於 5 毫米的塑膠碎片，它們極易被海洋生物吸收進入食物鏈，最終可能影響人類健康。"
        },
        {
            question: "聯合國在 2023 年通過了什麼重要條約，目標在 2030 年前保護 30% 的海洋？",
            options: ["全球公海條約", "巴黎氣候協議", "京都議定書", "海洋垃圾公約"],
            correct: 0,
            explanation: "《全球公海條約》是保護國際水域生物多樣性的關鍵協議，旨在 2030 年前將全球 30% 的公海納入保護區。"
        },
        {
            question: "目前哪一項新興產業威脅到深海生態，可能破壞棲地？",
            options: ["深海採礦", "海底電纜鋪設", "離岸風電", "潮汐發電"],
            correct: 0,
            explanation: "深海採礦會擾動海床沉積物並釋放毒素，對生長緩慢的深海生物與脆弱的生態系統造成毀滅性破壞。"
        },
        {
            question: "「過度捕撈」對海洋生態系造成什麼影響？",
            options: ["魚類變多", "食物網崩潰與物種滅絕", "海水變淡", "海浪變小"],
            correct: 1,
            explanation: "過度捕撈會導致特定物種數量急遽下降，破壞捕食者與獵物間的平衡，進而導致整個海洋食物網的瓦解。"
        },
        {
            question: "台灣西岸特有族群數量不到 50 隻的珍稀哺乳動物？",
            options: ["中華白海豚", "瓶鼻海豚", "小虎鯨", "江豚"],
            correct: 0,
            explanation: "生活在台灣西岸的中華白海豚（媽祖魚）因棲地喪失、離岸風電噪音及汙染，目前的成體數量已低於 50 隻，極度瀕危。"
        },
        {
            question: "什麼行為可以有效減少海洋中的「幽靈漁網」問題？",
            options: ["多吃進口魚類", "支持永續漁業與實名制漁具", "丟入海中", "不使用漁具"],
            correct: 1,
            explanation: "幽靈漁網是指遺失在海裡的廢棄漁具。推行漁具實名制並支持永續經營的漁法，能有效追蹤來源並減少廢棄物產生。"
        },
        {
            question: "海洋吸收了全球約多少比例的二氧化碳？",
            options: ["5%", "10%", "20%~30%", "80%"],
            correct: 2,
            explanation: "海洋是地球最大的儲碳庫之一，吸收了人類活動產生約 20%~30% 的二氧化碳，但也因此導致海水酸性增加。"
        }
    ];

    let currentQuestionIndex = 0;
    let selectedOption = null;
    let isShowingExplanation = false; 
    let score = 0; 

    const questionText = document.getElementById("question-text");
    const optionsGroup = document.getElementById("options-group");
    const submitBtn = document.getElementById("submit-btn");
    const scoreDisplay = document.getElementById("score-display"); // 🆕 抓取分數顯示元素

    if (!questionText || !submitBtn) return;

    function loadQuestion() {
        const q = questions[currentQuestionIndex];
        isShowingExplanation = false;
        selectedOption = null;

        questionText.innerText = q.question;
        document.getElementById("question-number").innerText = `題目 ${currentQuestionIndex + 1} / ${questions.length}`;
        document.getElementById("progress-bar").style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;

        
        const explDiv = document.getElementById("explanation-box");
        if (explDiv) explDiv.style.display = "none";

        optionsGroup.innerHTML = "";
        q.options.forEach((opt, index) => {
            const div = document.createElement("div");
            div.className = "option-item";
            div.innerText = opt;
            div.onclick = () => {
                if (isShowingExplanation) return; // 顯示說明時不能換選項
                document.querySelectorAll(".option-item").forEach(o => o.classList.remove("selected"));
                div.classList.add("selected");
                selectedOption = index;
                submitBtn.classList.add("active");
                submitBtn.disabled = false;
            };
            optionsGroup.appendChild(div);
        });
        submitBtn.innerText = "提交答案";
        submitBtn.classList.remove("active");
        submitBtn.disabled = true;
    }

    submitBtn.onclick = () => {
        const q = questions[currentQuestionIndex];// 取得當前題目
        const explDiv = document.getElementById("explanation-box") || createExplanationBox();

        if (!isShowingExplanation) {
            // 第一階段：顯示結果與說明
            isShowingExplanation = true;
            const optionItems = document.querySelectorAll(".option-item");
            // 核心邏輯：判斷對錯 (Logic Check)
            if (selectedOption === q.correct) {
                // 答對了
                score += 10; // 加分 (假設一題10分)
                scoreDisplay.innerText = `得分: ${score}`; // 即時更新介面
                explDiv.innerHTML = `<strong style="color:var(--success-green)">✅ 回答正確！</strong><br>${q.explanation}`;
            } else {
                explDiv.innerHTML = `<strong style="color:#e74c3c">❌ 回答錯誤</strong><br>正確答案是：<b>${q.options[q.correct]}</b><br><br>${q.explanation}`;
                // 標出正確選項
                optionItems[q.correct].style.borderColor = "var(--success-green)";
                optionItems[q.correct].style.background = "#e8f5e9";
            }

            explDiv.style.display = "block";
            submitBtn.innerText = "下一題";
        } else {
            // 第二階段：切換到下一題
            currentQuestionIndex++;
            currentQuestionIndex < questions.length ? loadQuestion() : showFinalResult();
        }
    };

    // 自動建立說明區塊的輔助函式
    function createExplanationBox() {
        const box = document.createElement("div");
        box.id = "explanation-box";
        box.style.marginTop = "20px";
        box.style.padding = "15px";
        box.style.background = "#f8f9fa";
        box.style.borderLeft = "5px solid var(--primary-blue)";
        box.style.borderRadius = "8px";
        optionsGroup.after(box);
        return box;
    }

    function showFinalResult() {
        const card = document.querySelector(".quiz-card");
        card.innerHTML = `
            <div style="text-align:center">
                <h2>測驗結束！</h2>
                <p style="margin: 20px 0;">感謝您參與海洋知識大挑戰，<br>讓我們一起守護蔚藍海洋！</p>
                <button class="submit-btn active" onclick="location.reload()" style="cursor:pointer">重新挑戰</button>
            </div>`;
    }

    loadQuestion();
};



/**
 * 模組三：珊瑚白化模擬功能
 */
const initCoralSimulation = () => {
    const slider = document.getElementById('temp-slider');
    const img = document.getElementById('coral-img');
    const healthBar = document.getElementById('health-bar');
    const healthText = document.getElementById('health-text');
    const warningText = document.getElementById('warning-text');
    const statusAlert = document.getElementById('status-alert');
    const tempVal = document.getElementById('temp-val');

    if (!slider || !img) return; // 若非模擬頁面則停止

    // 監聽滑桿數值變化
    slider.oninput = function () {
        const val = parseInt(this.value);
        if (tempVal) tempVal.innerText = val;

        let health = 100;
        let gray = 0;

        // 邏輯：28度(含)以下都是健康
        if (val <= 28) {
            health = 100;
            gray = 0;
        } else {
            // 超過 28 度開始計算
            const ratio = (val - 28) / (32 - 28);
            health = Math.max(0, 100 - (ratio * 100));
            gray = ratio * 100;
        }

        // 視覺更新
        img.style.filter = `grayscale(${gray}%) brightness(${100 + gray}%)`;

        // 更新進度條
        healthBar.style.width = health + '%';
        if (healthText) healthText.innerText = Math.round(health) + '% 健康';

        // 文字與顏色更新
        if (val > 30) {
            // 嚴重
            if (warningText) warningText.innerText = "警報：水溫過高！珊瑚正在大規模白化並面臨死亡。";
            if (statusAlert) statusAlert.className = "alert alert-danger d-flex align-items-center justify-content-center m-0 py-3";
            healthBar.className = "progress-bar progress-bar-striped progress-bar-animated bg-danger";
            if (healthText) healthText.className = "fw-bold text-danger";
            if (tempVal) tempVal.className = "text-danger fw-bold temp-display";
        } else if (val > 28) {
            // 警戒
            if (warningText) warningText.innerText = "注意：珊瑚感受到生存壓力，顏色正在褪去。";
            if (statusAlert) statusAlert.className = "alert alert-warning d-flex align-items-center justify-content-center m-0 py-3";
            healthBar.className = "progress-bar progress-bar-striped progress-bar-animated bg-warning";
            if (healthText) healthText.className = "fw-bold text-warning";
            if (tempVal) tempVal.className = "text-warning fw-bold temp-display";
        } else {
            // 安全
            if (warningText) warningText.innerText = "目前的溫度非常適合珊瑚生長。";
            if (statusAlert) statusAlert.className = "alert alert-success d-flex align-items-center justify-content-center m-0 py-3";
            healthBar.className = "progress-bar progress-bar-striped progress-bar-animated bg-success";
            if (healthText) healthText.className = "fw-bold text-success";
            if (tempVal) tempVal.className = "text-success fw-bold temp-display";
        }
    };
};

// 執行所有初始化
document.addEventListener('DOMContentLoaded', () => {
    initCommon();
    initQuiz();
    initCoralSimulation();
});