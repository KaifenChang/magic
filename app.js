// 魔法28天感恩練習應用
// 主程式邏輯

class MagicApp {
    constructor() {
        this.currentDay = 1;
        this.userData = this.loadUserData();
        this.init();
    }

    // 初始化應用
    init() {
        this.bindEvents();
        this.updateProgress();
        this.renderPracticesGrid();
        this.renderJournal();
        this.checkCurrentDay();
    }

    // 載入用戶資料
    loadUserData() {
        const saved = localStorage.getItem('magicAppData');
        if (saved) {
            return JSON.parse(saved);
        }
        return {
            startDate: null,
            currentDay: 1,
            completedDays: [],
            journal: {},
            desires: [] // 第13天的渴望清單會存在這裡
        };
    }

    // 儲存用戶資料
    saveUserData() {
        localStorage.setItem('magicAppData', JSON.stringify(this.userData));
    }

    // 檢查當前天數
    checkCurrentDay() {
        if (this.userData.startDate) {
            const start = new Date(this.userData.startDate);
            const today = new Date();
            const diffTime = Math.abs(today - start);
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
            this.currentDay = Math.min(diffDays, 28);
        } else {
            this.currentDay = this.userData.currentDay || 1;
        }
        this.updateProgress();
    }

    // 綁定事件
    bindEvents() {
        // 開始按鈕
        document.getElementById('start-btn').addEventListener('click', () => {
            this.startPractice(this.currentDay);
        });

        // 查看所有練習按鈕
        document.getElementById('view-all-btn').addEventListener('click', () => {
            this.showPage('all-practices');
        });

        // 導航按鈕
        document.querySelectorAll('.nav-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.currentTarget.dataset.target;
                this.showPage(target);
                document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
            });
        });

        // 返回按鈕
        document.querySelectorAll('.back-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.currentTarget.dataset.target;
                this.showPage(target);
                this.updateNavActive(target);
            });
        });

        // 儲存晨間感恩
        document.getElementById('save-morning-btn').addEventListener('click', () => {
            this.saveMorningGratitude();
        });

        // 完成今日練習
        document.getElementById('complete-day-btn').addEventListener('click', () => {
            this.completeDay();
        });

        // 魔法石點擊效果
        document.getElementById('magic-stone').addEventListener('click', function () {
            this.classList.toggle('active');
        });

        // 關閉完成彈窗
        document.getElementById('close-modal-btn').addEventListener('click', () => {
            document.getElementById('completion-modal').classList.remove('active');
            this.showPage('home');
            this.updateNavActive('home');
        });
    }

    // 顯示頁面
    showPage(pageId) {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(pageId).classList.add('active');

        // 如果是練習頁面，確保滾動到頂部
        if (pageId === 'practice') {
            window.scrollTo(0, 0);
        }
    }

    // 更新導航狀態
    updateNavActive(pageId) {
        document.querySelectorAll('.nav-item').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.target === pageId) {
                btn.classList.add('active');
            }
        });
    }

    // 更新進度環
    updateProgress() {
        const completedCount = this.userData.completedDays.length;
        const percentage = (completedCount / 28) * 100;
        const circumference = 2 * Math.PI * 52;
        const offset = circumference - (percentage / 100) * circumference;

        document.querySelector('.progress-ring-circle').style.strokeDashoffset = offset;
        document.getElementById('current-day').textContent = this.currentDay;

        // 更新開始按鈕文字
        const startBtn = document.getElementById('start-btn');
        if (this.userData.completedDays.includes(this.currentDay)) {
            startBtn.querySelector('span').textContent = '今日已完成 ✓';
        } else {
            startBtn.querySelector('span').textContent = '開始今日練習';
        }
    }

    // 開始練習
    startPractice(day) {
        // 如果是第一天且沒有開始日期，設定開始日期
        if (!this.userData.startDate) {
            this.userData.startDate = new Date().toISOString();
            this.saveUserData();
        }

        this.currentDay = day;
        const practice = PRACTICES[day - 1];

        // 更新頁面標題
        document.getElementById('practice-day-title').textContent = `第${day}天`;
        document.getElementById('practice-title').textContent = practice.title;
        document.getElementById('practice-icon').textContent = practice.icon;
        document.getElementById('practice-description').innerHTML = practice.description;

        // 渲染晨間感恩清單
        this.renderMorningList(day);

        // 渲染當日特定練習
        this.renderDailyPractice(practice);

        // 顯示/隱藏魔法石區塊
        const stoneSection = document.getElementById('stone-section');
        if (practice.hasMagicStone) {
            stoneSection.style.display = 'block';
            // 載入已存的最美好的事
            const journalEntry = this.userData.journal[day];
            if (journalEntry && journalEntry.bestThing) {
                document.getElementById('best-thing').value = journalEntry.bestThing;
            } else {
                document.getElementById('best-thing').value = '';
            }
        } else {
            stoneSection.style.display = 'none';
        }

        this.showPage('practice');
        this.updateNavActive('practice');
    }

    // 渲染晨間感恩清單
    renderMorningList(day) {
        const listContainer = document.getElementById('morning-list');
        listContainer.innerHTML = '';

        // 載入已存的感恩清單
        const journalEntry = this.userData.journal[day] || {};
        const savedGratitude = journalEntry.morningGratitude || [];

        for (let i = 1; i <= 10; i++) {
            const item = document.createElement('div');
            item.className = 'gratitude-item';
            item.innerHTML = `
                <span>${i}.</span>
                <input type="text" 
                       id="gratitude-${i}" 
                       placeholder="我感謝..." 
                       value="${savedGratitude[i - 1] || ''}">
            `;
            listContainer.appendChild(item);
        }
    }

    // 渲染當日特定練習
    renderDailyPractice(practice) {
        const container = document.getElementById('daily-practice-content');
        const section = document.getElementById('daily-practice-section');

        if (!practice.dailyPractice) {
            section.style.display = 'none';
            return;
        }

        section.style.display = 'block';
        const dp = practice.dailyPractice;
        let html = `<p class="section-tip">${dp.prompt}</p>`;

        switch (dp.type) {
            case 'relationship':
            case 'influencers':
            case 'wand':
                html += this.renderPeopleInput(3);
                break;
            case 'list':
            case 'people':
            case 'transform':
            case 'bills':
            case 'cues':
            case 'mistake':
                html += this.renderListInput(dp.count || 10);
                break;
            case 'desires':
                html += this.renderDesiresInput();
                break;
            case 'check':
                html += this.renderCheckInput();
                break;
            case 'todo':
                html += this.renderTodoInput();
                break;
            case 'outcomes':
                html += this.renderOutcomesInput();
                break;
            case 'health':
                html += this.renderHealthInput();
                break;
            case 'heal_relationship':
                html += this.renderHealRelationshipInput();
                break;
            case 'mirror':
                html += this.renderMirrorInput();
                break;
            case 'affirmation':
                html += this.renderAffirmation(dp.text);
                break;
            default:
                html += `<textarea id="daily-notes" placeholder="記錄你的練習..." rows="5"></textarea>`;
        }

        container.innerHTML = html;
        this.loadDailyPracticeData(practice.day);
    }

    // 渲染特定練習輸入類型
    renderPeopleInput(count) {
        let html = '';
        for (let i = 1; i <= count; i++) {
            html += `
                <div class="person-section">
                    <input type="text" id="person-${i}" placeholder="人名 ${i}" class="person-name-input">
                    <textarea id="person-${i}-thanks" placeholder="寫下你對這個人的感謝..." rows="3"></textarea>
                </div>
            `;
        }
        return html;
    }

    renderListInput(count) {
        let html = '<div class="practice-list">';
        for (let i = 1; i <= count; i++) {
            html += `
                <div class="practice-item">
                    <span>${i}.</span>
                    <input type="text" id="practice-item-${i}" placeholder="...">
                </div>
            `;
        }
        html += '</div>';
        return html;
    }

    renderDesiresInput() {
        let html = '<div class="desires-list">';
        for (let i = 1; i <= 10; i++) {
            html += `
                <div class="desire-item">
                    <span class="desire-prefix">感謝、感謝、感謝，</span>
                    <input type="text" id="desire-${i}" placeholder="你的渴望 ${i}">
                </div>
            `;
        }
        html += '</div>';
        return html;
    }

    renderCheckInput() {
        return `
            <div class="check-input">
                <label>你的名字：</label>
                <input type="text" id="check-name" placeholder="你的名字">
                <label>金額：</label>
                <input type="text" id="check-amount" placeholder="NT$ 或任何金額">
                <label>這筆錢要用來做什麼？</label>
                <textarea id="check-purpose" placeholder="描述你想用這筆錢做的事..." rows="3"></textarea>
            </div>
        `;
    }

    renderTodoInput() {
        let html = '<div class="todo-list">';
        html += '<p class="magic-title">✨ 魔法般的待辦清單 ✨</p>';
        for (let i = 1; i <= 5; i++) {
            html += `
                <div class="todo-item">
                    <input type="checkbox" id="todo-check-${i}">
                    <input type="text" id="todo-${i}" placeholder="待辦事項 ${i}">
                </div>
            `;
        }
        html += '</div>';
        return html;
    }

    renderOutcomesInput() {
        let html = '<div class="outcomes-list">';
        for (let i = 1; i <= 3; i++) {
            html += `
                <div class="outcome-item">
                    <span>感謝</span>
                    <input type="text" id="outcome-${i}" placeholder="事情 ${i}">
                    <span>帶來美好的結果！</span>
                </div>
            `;
        }
        html += '</div>';
        return html;
    }

    renderHealthInput() {
        return `
            <div class="health-input">
                <h5>三段巔峰時光：</h5>
                <textarea id="health-memories" placeholder="回想你感覺最好的三段時光..." rows="3"></textarea>
                <h5>五個運作正常的身體功能：</h5>
                <textarea id="health-functions" placeholder="例如：視力、聽力、心臟..." rows="2"></textarea>
                <h5>想改善的健康方面：</h5>
                <input type="text" id="health-improve" placeholder="你想改善的一件事">
            </div>
        `;
    }

    renderHealRelationshipInput() {
        return `
            <div class="heal-input">
                <input type="text" id="heal-person" placeholder="這個人的名字">
                <div class="heal-list">
                    ${Array.from({ length: 10 }, (_, i) => `
                        <div class="heal-item">
                            <span>${i + 1}.</span>
                            <span id="heal-name-display">（名字）</span>
                            <span>，我感謝你</span>
                            <input type="text" id="heal-${i + 1}" placeholder="...">
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderMirrorInput() {
        return `
            <div class="mirror-input">
                <p>🪞 看著鏡子，對自己說「感謝你」</p>
                <h5>寫下你感謝自己的三件事：</h5>
                <input type="text" id="mirror-1" placeholder="我感謝自己...">
                <input type="text" id="mirror-2" placeholder="我感謝自己...">
                <input type="text" id="mirror-3" placeholder="我感謝自己...">
            </div>
        `;
    }

    renderAffirmation(text) {
        return `
            <div class="affirmation-card">
                <p class="affirmation-text">"${text}"</p>
                <p class="affirmation-tip">請在今天至少四個時刻慢慢讀出這句話</p>
                <div class="affirmation-checks">
                    <label><input type="checkbox" id="affirm-1"> 第一次</label>
                    <label><input type="checkbox" id="affirm-2"> 第二次</label>
                    <label><input type="checkbox" id="affirm-3"> 第三次</label>
                    <label><input type="checkbox" id="affirm-4"> 第四次</label>
                </div>
            </div>
        `;
    }

    // 載入當日練習資料
    loadDailyPracticeData(day) {
        const journalEntry = this.userData.journal[day];
        if (!journalEntry || !journalEntry.dailyPractice) return;

        const data = journalEntry.dailyPractice;
        // 根據資料類型載入對應的輸入值
        Object.keys(data).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = data[key];
                } else {
                    element.value = data[key];
                }
            }
        });
    }

    // 儲存晨間感恩
    saveMorningGratitude() {
        const gratitude = [];
        for (let i = 1; i <= 10; i++) {
            const value = document.getElementById(`gratitude-${i}`).value.trim();
            if (value) gratitude.push(value);
        }

        if (!this.userData.journal[this.currentDay]) {
            this.userData.journal[this.currentDay] = {
                date: new Date().toLocaleDateString('zh-TW')
            };
        }
        this.userData.journal[this.currentDay].morningGratitude = gratitude;
        this.saveUserData();

        // 顯示儲存成功提示
        const btn = document.getElementById('save-morning-btn');
        const originalText = btn.textContent;
        btn.textContent = '✅ 已儲存！';
        btn.style.background = 'var(--success)';
        btn.style.color = 'white';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.color = '';
        }, 2000);
    }

    // 完成今日練習
    completeDay() {
        // 儲存晨間感恩
        this.saveMorningGratitude();

        // 儲存今日最美好的事
        const bestThing = document.getElementById('best-thing').value.trim();
        if (!this.userData.journal[this.currentDay]) {
            this.userData.journal[this.currentDay] = {
                date: new Date().toLocaleDateString('zh-TW')
            };
        }
        this.userData.journal[this.currentDay].bestThing = bestThing;
        this.userData.journal[this.currentDay].practiceTitle = PRACTICES[this.currentDay - 1].title;

        // 儲存當日練習資料
        const dailyPracticeData = this.collectDailyPracticeData();
        if (Object.keys(dailyPracticeData).length > 0) {
            this.userData.journal[this.currentDay].dailyPractice = dailyPracticeData;
        }

        // 如果是第13天（渴望清單），特別儲存以供後續使用
        if (this.currentDay === 13) {
            this.saveDesiresList();
        }

        // 標記為完成
        if (!this.userData.completedDays.includes(this.currentDay)) {
            this.userData.completedDays.push(this.currentDay);
        }

        // 更新當前天數
        if (this.currentDay < 28) {
            this.userData.currentDay = this.currentDay + 1;
        }

        this.saveUserData();
        this.updateProgress();
        this.renderPracticesGrid();
        this.renderJournal();

        // 顯示完成彈窗
        const modal = document.getElementById('completion-modal');
        const message = document.getElementById('completion-message');

        if (this.currentDay === 28) {
            message.textContent = '🎉 恭喜你完成了28天的魔法之旅！你已經寫下280項恩典！';
        } else {
            message.textContent = `你完成了第${this.currentDay}天的練習！明天繼續加油！`;
        }

        modal.classList.add('active');
    }

    // 收集當日練習資料
    collectDailyPracticeData() {
        const data = {};
        const container = document.getElementById('daily-practice-content');

        container.querySelectorAll('input, textarea').forEach(el => {
            if (el.id) {
                if (el.type === 'checkbox') {
                    data[el.id] = el.checked;
                } else if (el.value.trim()) {
                    data[el.id] = el.value.trim();
                }
            }
        });

        return data;
    }

    // 儲存渴望清單（第13天）
    saveDesiresList() {
        const desires = [];
        for (let i = 1; i <= 10; i++) {
            const el = document.getElementById(`desire-${i}`);
            if (el && el.value.trim()) {
                desires.push(el.value.trim());
            }
        }
        this.userData.desires = desires;
    }

    // 渲染練習總覽網格
    renderPracticesGrid() {
        const grid = document.getElementById('practices-grid');
        grid.innerHTML = '';

        PRACTICES.forEach((practice, index) => {
            const day = index + 1;
            const isCompleted = this.userData.completedDays.includes(day);
            const isCurrent = day === this.currentDay;
            const isLocked = day > this.currentDay && !this.userData.completedDays.includes(day - 1);

            const item = document.createElement('div');
            item.className = `practice-grid-item ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''}`;
            item.innerHTML = `
                <div class="day-number">${practice.icon}</div>
                <div class="day-number">第${day}天</div>
                <div class="practice-name">${practice.title}</div>
            `;

            if (!isLocked) {
                item.addEventListener('click', () => {
                    this.startPractice(day);
                });
            }

            grid.appendChild(item);
        });
    }

    // 渲染感恩日記
    renderJournal() {
        const container = document.getElementById('journal-content');
        const entries = Object.entries(this.userData.journal)
            .sort((a, b) => Number(b[0]) - Number(a[0]));

        if (entries.length === 0) {
            container.innerHTML = `
                <div class="empty-journal">
                    <p>📖 你的感恩日記還沒有任何記錄</p>
                    <p>開始今天的練習來建立你的第一筆記錄吧！</p>
                </div>
            `;
            return;
        }

        container.innerHTML = entries.map(([day, entry]) => `
            <div class="journal-entry">
                <div class="journal-entry-header">
                    <span class="journal-entry-day">第${day}天</span>
                    <span class="journal-entry-date">${entry.date || ''}</span>
                </div>
                <div class="journal-entry-title">${entry.practiceTitle || PRACTICES[day - 1]?.title || ''}</div>
                <div class="journal-entry-content">
                    ${entry.morningGratitude && entry.morningGratitude.length > 0 ? `
                        <h5>🌅 晨間感恩：</h5>
                        <ul>
                            ${entry.morningGratitude.map(g => `<li>✦ ${g}</li>`).join('')}
                        </ul>
                    ` : ''}
                    ${entry.bestThing ? `
                        <h5>🌙 今日最美好的事：</h5>
                        <p>${entry.bestThing}</p>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }
}

// 在 DOM 載入完成後初始化應用
document.addEventListener('DOMContentLoaded', () => {
    window.magicApp = new MagicApp();
});

// 添加額外的 CSS 樣式（動態注入）
const additionalStyles = `
    .person-section {
        margin-bottom: var(--spacing-md);
    }

    .person-name-input {
        width: 100%;
        margin-bottom: var(--spacing-xs);
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-radius: var(--radius-sm);
        padding: var(--spacing-sm);
        color: var(--text-primary);
        font-family: var(--font-main);
    }

    .person-section textarea,
    #daily-notes,
    .health-input textarea,
    .check-input textarea {
        width: 100%;
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-radius: var(--radius-sm);
        padding: var(--spacing-sm);
        color: var(--text-primary);
        font-family: var(--font-main);
        resize: vertical;
    }

    .practice-list,
    .desires-list,
    .todo-list,
    .outcomes-list,
    .heal-list {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
    }

    .practice-item,
    .desire-item,
    .todo-item,
    .outcome-item,
    .heal-item {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
    }

    .practice-item span,
    .heal-item span {
        color: var(--gold);
        min-width: 24px;
    }

    .practice-item input,
    .desire-item input,
    .todo-item input[type="text"],
    .outcome-item input,
    .heal-item input {
        flex: 1;
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-radius: var(--radius-sm);
        padding: var(--spacing-sm);
        color: var(--text-primary);
        font-family: var(--font-main);
    }

    .desire-prefix {
        color: var(--accent);
        font-size: 0.9rem;
        white-space: nowrap;
    }

    .magic-title {
        text-align: center;
        color: var(--gold);
        margin-bottom: var(--spacing-md);
    }

    .todo-item input[type="checkbox"] {
        width: 20px;
        height: 20px;
        accent-color: var(--primary);
    }

    .check-input label {
        display: block;
        color: var(--text-secondary);
        margin: var(--spacing-sm) 0 var(--spacing-xs);
    }

    .check-input input {
        width: 100%;
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-radius: var(--radius-sm);
        padding: var(--spacing-sm);
        color: var(--text-primary);
        font-family: var(--font-main);
    }

    .health-input h5,
    .mirror-input h5 {
        color: var(--accent);
        margin: var(--spacing-md) 0 var(--spacing-xs);
    }

    .health-input input,
    .mirror-input input {
        width: 100%;
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-radius: var(--radius-sm);
        padding: var(--spacing-sm);
        color: var(--text-primary);
        font-family: var(--font-main);
        margin-bottom: var(--spacing-sm);
    }

    .heal-input > input {
        width: 100%;
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-radius: var(--radius-sm);
        padding: var(--spacing-sm);
        color: var(--text-primary);
        font-family: var(--font-main);
        margin-bottom: var(--spacing-md);
    }

    #heal-name-display {
        color: var(--primary-light);
    }

    .affirmation-card {
        background: linear-gradient(135deg, var(--primary), var(--secondary));
        border-radius: var(--radius-lg);
        padding: var(--spacing-lg);
        text-align: center;
    }

    .affirmation-text {
        font-size: 1.3rem;
        font-weight: 500;
        color: var(--text-primary);
        margin-bottom: var(--spacing-md);
    }

    .affirmation-tip {
        font-size: 0.9rem;
        color: var(--text-secondary);
        margin-bottom: var(--spacing-md);
    }

    .affirmation-checks {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-sm);
        justify-content: center;
    }

    .affirmation-checks label {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
        background: var(--bg-glass);
        padding: var(--spacing-xs) var(--spacing-sm);
        border-radius: var(--radius-sm);
        cursor: pointer;
    }

    .affirmation-checks input {
        accent-color: var(--gold);
    }

    .mirror-input p {
        text-align: center;
        font-size: 1.1rem;
        margin-bottom: var(--spacing-md);
    }

    .journal-entry-content h5 {
        color: var(--accent);
        margin: var(--spacing-sm) 0 var(--spacing-xs);
        font-size: 0.9rem;
    }

    .journal-entry-content ul {
        list-style: none;
        padding: 0;
    }

    .journal-entry-content li {
        padding: var(--spacing-xs) 0;
        color: var(--text-secondary);
        font-size: 0.9rem;
    }
`;

// 注入額外樣式
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
