// 28天魔法練習內容
// 基於朗達·拜恩《魔法》一書

const PRACTICES = [
    {
        day: 1,
        title: "數算你的恩典",
        icon: "🌟",
        isNew: true,
        hasMorningList: true,
        hasMagicStone: false,
        description: `
            <p>今天是你魔法之旅的第一天！</p>
            <ul>
                <li>早上第一件事情是，寫下生命中讓你感恩的<strong>十件事</strong></li>
                <li>寫下你<strong>為什麼</strong>對自己收到每一項恩典感恩</li>
                <li>回頭去讀你的清單，不管是在腦海中默念或是大聲念出來都行</li>
                <li>當你念到每項恩典的結尾時，要說出「<strong>感謝你、感謝你、感謝你</strong>」這個魔法句</li>
                <li>盡可能對那項恩典感受到感恩之情</li>
            </ul>
            <p>💫 接下來的27天，每天早上都要重複這個練習！</p>
        `,
        dailyPractice: null
    },
    {
        day: 2,
        title: "魔法石",
        icon: "🪨",
        isNew: true,
        hasMorningList: true,
        hasMagicStone: true,
        description: `
            <p>今天起，你將擁有一顆<strong>魔法石</strong>！</p>
            <ul>
                <li>找一顆魔法石，把它放在你的床頭</li>
                <li>選擇平滑、不要太重，握在手心感覺不錯的石頭</li>
                <li>在今晚入睡以前，手中握著你的魔法石</li>
                <li>想著今天所發生過<strong>最美好的一件事</strong></li>
                <li>對今天發生的那件美好的事說出魔法句：<strong>感謝你</strong></li>
            </ul>
            <p>💫 接下來每晚都要重複魔法石練習！</p>
        `,
        dailyPractice: null
    },
    {
        day: 3,
        title: "魔法般的關係",
        icon: "💕",
        isNew: true,
        hasMorningList: true,
        hasMagicStone: true,
        description: `
            <p>今天要為你最親近的人灑上魔法金粉！</p>
            <ul>
                <li>選擇你最親近的<strong>三段關係</strong>，找出他們每個人的一張相片</li>
                <li>把照片放在面前，寫下你感謝每一個人的<strong>五件事</strong></li>
                <li>用「感謝你」這個詞當作每個句子的開頭</li>
                <li>句子內容要包含對方的名字，以及你特別感謝的事情</li>
                <li>今天把這三張照片放在身上或常看到的地方</li>
                <li>至少在<strong>三個不同的時段</strong>看這些照片，說出「感謝你」加上對方的名字</li>
            </ul>
        `,
        dailyPractice: {
            type: "relationship",
            prompt: "寫下你對三位親近的人的感謝（每人五件事）",
            count: 3,
            itemsPerPerson: 5
        }
    },
    {
        day: 4,
        title: "魔法般的健康",
        icon: "💚",
        isNew: true,
        hasMorningList: true,
        hasMagicStone: true,
        description: `
            <p>感謝健康這份最珍貴的禮物！</p>
            <ul>
                <li>在一張紙或卡片上寫下這些字：<br><strong>「健康的禮物就是讓我可以活著」</strong></li>
                <li>把這張紙或卡片放在你今天會常看到的地方</li>
                <li>至少要在<strong>四個場合</strong>慢慢讀出這些字</li>
                <li>盡可能對健康給你的這份珍貴禮物表達感恩</li>
            </ul>
        `,
        dailyPractice: {
            type: "affirmation",
            text: "健康的禮物就是讓我可以活著",
            times: 4
        }
    },
    {
        day: 5,
        title: "魔法般的金錢",
        icon: "💰",
        isNew: true,
        hasMorningList: true,
        hasMagicStone: true,
        description: `
            <p>召喚金錢的魔法！</p>
            <ul>
                <li>坐下來，花幾分鐘回想你<strong>整個童年時期</strong>所有免費收到的事物</li>
                <li>回想有人替你付錢的每一個記憶時，說出「<strong>感謝你</strong>」</li>
                <li>拿出一張面額較小的鈔票，在便利貼上寫：<br><strong>「感謝你在我一生中給過我的所有金錢」</strong></li>
                <li>貼在鈔票上，今天隨身帶著這張「<strong>魔法鈔票</strong>」</li>
                <li>至少早上和下午各把鈔票拿出來一次</li>
                <li>今天過後，把魔法鈔票放在每天都看得見的地方</li>
            </ul>
        `,
        dailyPractice: {
            type: "memory",
            prompt: "回想童年時收到的免費禮物和別人為你付錢的記憶"
        }
    },
    {
        day: 6,
        title: "像魔法般工作",
        icon: "💼",
        isNew: true,
        hasMorningList: true,
        hasMagicStone: true,
        description: `
            <p>讓工作充滿魔法！</p>
            <ul>
                <li>今天工作時，想像有一個<strong>隱形的經理</strong>跟隨著你</li>
                <li>每當你找到可以感恩的事時，他就在一旁記錄下來</li>
                <li>你今天的工作就是<strong>盡可能找到許多</strong>你可以感恩的事</li>
                <li>當你找到某件值得感謝的事，請說：<br><strong>「我很感謝___________。」</strong></li>
                <li>盡可能感受到感恩之情</li>
            </ul>
        `,
        dailyPractice: {
            type: "list",
            prompt: "記錄今天工作中你感恩的事情",
            count: 10
        }
    },
    {
        day: 7,
        title: "擺脫負面情況的魔法",
        icon: "🌈",
        isNew: true,
        hasMorningList: true,
        hasMagicStone: true,
        description: `
            <p>轉化負面情況的魔法！</p>
            <ul>
                <li>選擇你生命中最想解決的<strong>一個問題或負面情況</strong></li>
                <li>針對那個負面情況，列出你可以感謝的<strong>十件事情</strong></li>
                <li>在清單結尾寫下：<br><strong>「感謝你、感謝你、感謝你提供了完美的解決之道」</strong></li>
                <li>從今天開始，看你是否能<strong>一整天都不說負面的話</strong></li>
                <li>如果注意到自己在想或說負面的事，馬上說：<br><strong>「但我必須說，我真的很感謝___________」</strong></li>
            </ul>
        `,
        dailyPractice: {
            type: "transform",
            prompt: "針對一個負面情況，寫下你可以感謝的十件事"
        }
    },
    {
        day: 8,
        title: "魔法的飲食",
        icon: "🍽️",
        isNew: true,
        hasMorningList: true,
        hasMagicStone: true,
        description: `
            <p>為食物灑上魔法金粉！</p>
            <ul>
                <li>今天在你吃飯或喝任何東西<strong>之前</strong></li>
                <li>花點時間看看你將要吃或喝的東西</li>
                <li>默念或是大聲地說出魔法句：<strong>「感謝你！」</strong></li>
                <li>如果你想要，可以在食物或飲品上灑<strong>魔法金粉</strong>（想像閃閃發光的感恩能量）</li>
            </ul>
            <p>💫 每一餐、每一杯飲料都是值得感謝的恩典！</p>
        `,
        dailyPractice: {
            type: "mindful",
            prompt: "記錄今天你對哪些食物和飲料說了感謝"
        }
    },
    {
        day: 9,
        title: "金錢磁鐵",
        icon: "🧲",
        isNew: true,
        hasMorningList: true,
        hasMagicStone: true,
        description: `
            <p>成為金錢磁鐵！</p>
            <ul>
                <li>拿出最近的任何一張帳單</li>
                <li>在每一張帳單上寫下：<strong>「感謝這筆錢」</strong></li>
                <li>不管你是否擁有這筆錢，都對自己有錢能支付帳單覺得感恩</li>
                <li>找出你過去的<strong>十張帳單</strong></li>
                <li>在每張帳單的正面寫下魔法句：<strong>「感謝你－付清！」</strong></li>
                <li>真正感覺到對自己能有錢支付帳單這件事感恩</li>
            </ul>
        `,
        dailyPractice: {
            type: "bills",
            prompt: "記錄你感謝的帳單（即使尚未付清）"
        }
    },
    {
        day: 10,
        title: "灑上魔法金粉",
        icon: "✨",
        isNew: true,
        hasMorningList: true,
        hasMagicStone: true,
        description: `
            <p>對服務你的人灑魔法金粉！</p>
            <ul>
                <li>今天透過直接感謝或是心裡面表達感謝</li>
                <li>在<strong>十位提供服務</strong>、你從他們那裡得到好處的人身上灑魔法金粉</li>
                <li>對他們所提供的服務表達感謝！</li>
                <li>可以是任何人：店員、司機、清潔人員、同事...</li>
                <li>對每一位服務你的人說<strong>「感謝你！」</strong>來灑魔法金粉</li>
            </ul>
            <p>⚠️ 今天先閱讀明天的練習，因為第十一天的練習在你一醒來就開始了！</p>
        `,
        dailyPractice: {
            type: "people",
            prompt: "記錄你今天感謝的十位服務人員",
            count: 10
        }
    },
    {
        day: 11,
        title: "魔法般的早晨",
        icon: "🌅",
        isNew: true,
        hasMorningList: true,
        hasMagicStone: true,
        description: `
            <p>⚠️ 注意！今天的步驟順序不一樣！</p>
            <ul>
                <li>當你醒來迎接新的一天、在你去做任何一件事情<strong>之前</strong></li>
                <li>說出魔法句「<strong>感謝你</strong>」</li>
                <li>從你眼睛睜開的那一刻，到你完全準備好為止</li>
                <li>在你心裡對你<strong>觸摸到及使用到的每件東西</strong>說出「感謝你」</li>
                <li>床、枕頭、牙刷、水、衣服... 一切一切！</li>
            </ul>
            <p>💫 然後再做晨間感恩清單練習</p>
        `,
        dailyPractice: {
            type: "morning",
            prompt: "記錄今天早上你感謝的物品"
        }
    },
    {
        day: 12,
        title: "曾影響你生命的神奇之人",
        icon: "🙏",
        isNew: true,
        hasMorningList: true,
        hasMagicStone: true,
        description: `
            <p>感謝那些改變你人生的人！</p>
            <ul>
                <li>今天找一個安靜的地方獨處一段時間</li>
                <li>列出<strong>三個</strong>讓你的人生有所不同的人</li>
                <li>一次針對一個人練習</li>
                <li><strong>大聲的告訴</strong>每一個人說為什麼你會感激他們</li>
                <li>以及他們如何影響你的人生軌道</li>
                <li>（如果不方便大聲說，可以把感恩之情寫下來，像是在寫信給他們）</li>
            </ul>
        `,
        dailyPractice: {
            type: "influencers",
            prompt: "寫下三位改變你人生的人，以及你對他們的感謝"
        }
    },
    {
        day: 13,
        title: "讓你的所有夢想成真",
        icon: "🌠",
        isNew: true,
        hasMorningList: true,
        hasMagicStone: true,
        description: `
            <p>創造你的夢想清單！</p>
            <ul>
                <li>列出你的<strong>前十項渴望</strong></li>
                <li>在每一項渴望前面寫三次的「感謝」：<br><strong>「感謝、感謝、感謝，___________（你的渴望）」</strong></li>
                <li>運用想像力，像是你已經實現了那十項渴望一樣地回答：<br>
                    (1) 得到渴望的事物時，你有什麼樣的感受？<br>
                    (2) 得到渴望的事物時，你第一個告訴誰？<br>
                    (3) 得到渴望的事物時，你第一件做的事情是什麼？</li>
                <li>如果你喜歡，可以創造一個「<strong>魔法板</strong>」</li>
            </ul>
        `,
        dailyPractice: {
            type: "desires",
            prompt: "寫下你的前十項渴望"
        }
    },
    {
        day: 14,
        title: "擁有魔法般的一天",
        icon: "🌞",
        isNew: true,
        hasMorningList: true,
        hasMagicStone: true,
        description: `
            <p>預先創造完美的一天！</p>
            <ul>
                <li>早上先在腦海中想一下白天、晚上直到睡前要做的<strong>計畫</strong></li>
                <li>因為每一個計畫或事件都進行得<strong>非常順利</strong>，所以對其說出「感謝」</li>
                <li>想像你在一天結束後說「感謝」</li>
                <li>因為一切都進行得非常完美，所以你非常地感恩</li>
                <li>用以下這句話來結束這個魔法練習：<br><strong>「感謝今天的這些好消息！」</strong></li>
            </ul>
        `,
        dailyPractice: {
            type: "day_plan",
            prompt: "列出今天的計畫，並預先感謝它們順利完成"
        }
    },
    {
        day: 15,
        title: "魔法般的療癒關係",
        icon: "💞",
        isNew: true,
        hasMorningList: true,
        hasMagicStone: true,
        description: `
            <p>療癒一段需要修復的關係！</p>
            <ul>
                <li>選擇你想要改善的<strong>一段關係</strong></li>
                <li>那段關係可能充滿困難、出現問題，或是破裂了</li>
                <li>坐下來列清單，用下面的方式寫下對方讓你感謝的<strong>十件事</strong>：<br>
                    <strong>「ＯＯ（人名），我感謝你___________（什麼事？）」</strong></li>
            </ul>
            <p>💫 如果有需要，你也許會選擇重複做這個練習幾天，直到你對那個人不再有任何不好的感覺為止</p>
        `,
        dailyPractice: {
            type: "heal_relationship",
            prompt: "選擇一段想改善的關係，寫下你感謝對方的十件事"
        }
    },
    {
        day: 16,
        title: "健康裡的魔法與奇蹟",
        icon: "🏃",
        isNew: true,
        hasMorningList: true,
        hasMagicStone: true,
        description: `
            <p>感謝你的健康與身體！</p>
            <ul>
                <li>回想一生中你覺得像是站在世界頂端的<strong>三段不同的時光</strong></li>
                <li>對那些時光表達真摯的感恩</li>
                <li>思考一下你身體中運作正常的<strong>五個功能</strong></li>
                <li>依序對每個功能表達感謝</li>
                <li>選擇你想在身體或健康方面改善的<strong>一件事情</strong></li>
                <li>花一分鐘想像自己擁有<strong>理想的身體或健康狀態</strong></li>
                <li>對這個理想的狀態表達感謝</li>
            </ul>
        `,
        dailyPractice: {
            type: "health",
            prompt: "記錄你感謝的三段巔峰時光和五個身體功能"
        }
    },
    {
        day: 17,
        title: "魔法支票",
        icon: "💵",
        isNew: true,
        hasMorningList: true,
        hasMagicStone: true,
        description: `
            <p>開一張魔法支票給自己！</p>
            <ul>
                <li>在你的魔法支票上填上<strong>你的名字</strong></li>
                <li>填上你想要得到的<strong>金錢數目</strong>和今天的日期</li>
                <li>手中拿著你的魔法支票，想像你正在買你希望用這筆錢去買的東西</li>
                <li>盡可能感受到你得到它之後的那種快樂和感恩的感覺</li>
                <li>今天請帶著這張支票出門，或是放在你可以經常看到它的地方</li>
                <li>至少要有<strong>兩次</strong>把支票放在手中，想像自己正在使用這筆錢</li>
                <li>一天結束後，將你的魔法支票放在每天都能看到的顯眼之處</li>
            </ul>
        `,
        dailyPractice: {
            type: "check",
            prompt: "寫下你的魔法支票金額和想用這筆錢做什麼"
        }
    },
    {
        day: 18,
        title: "魔法般的待辦清單",
        icon: "📋",
        isNew: true,
        hasMorningList: true,
        hasMagicStone: true,
        description: `
            <p>讓宇宙幫你完成待辦事項！</p>
            <ul>
                <li>列出一張清單，寫下你需要有人為你完成或解決的<strong>最重要的事情或問題</strong></li>
                <li>在你的清單上面寫下「<strong>魔法般的待辦清單</strong>」這個標題</li>
                <li>從你的清單中選出<strong>三件最重要</strong>的事情</li>
                <li>一次一件，想像每一件事情都已經為你完成了</li>
                <li>在每一件事情上面至少要花<strong>一分鐘</strong>的時間</li>
                <li>相信它已經被完成了，而且你感受到自己正報以<strong>莫大的感恩</strong></li>
            </ul>
        `,
        dailyPractice: {
            type: "todo",
            prompt: "列出你的魔法待辦清單，選出三件最重要的事"
        }
    },
    {
        day: 19,
        title: "魔法的腳步",
        icon: "👣",
        isNew: true,
        hasMorningList: true,
        hasMagicStone: true,
        description: `
            <p>用腳步傳遞感恩！</p>
            <ul>
                <li>在一天的任何時間內，帶著感恩走<strong>一百步</strong>「魔法的腳步」（大約九十秒）</li>
                <li>每踏出一步，就說出魔法句「<strong>感謝你</strong>」</li>
                <li>並感受到感恩之情</li>
            </ul>
            <p>💫 這是一個簡單但強大的練習！</p>
        `,
        dailyPractice: {
            type: "steps",
            prompt: "記錄你完成一百步魔法腳步的感受"
        }
    },
    {
        day: 20,
        title: "心的魔法",
        icon: "💜",
        isNew: true,
        hasMorningList: true,
        hasMagicStone: true,
        description: `
            <p>用心感受感恩的力量！</p>
            <ul>
                <li>把你的心思和注意力放在<strong>心的周圍</strong></li>
                <li>閉上眼睛，當你將注意力保持在心上的同時，在心裡說出「<strong>感謝你</strong>」</li>
                <li>拿出你的「<strong>前十項渴望清單</strong>」（第13天）</li>
                <li>透過唸出每一項渴望來練習「心的魔法」</li>
                <li>接下來閉上你的眼睛，將心思專注在心周圍的區域</li>
                <li>慢慢地再次說出「感謝你」</li>
            </ul>
        `,
        dailyPractice: {
            type: "heart",
            prompt: "重新閱讀你的渴望清單，用心感受每一項"
        }
    },
    {
        day: 21,
        title: "美好的結果",
        icon: "🎯",
        isNew: true,
        hasMorningList: true,
        hasMagicStone: true,
        description: `
            <p>預先感謝美好的結果！</p>
            <ul>
                <li>在一天開始時，選擇<strong>三件</strong>對你來說很重要、而且你想要擁有美好結果的事情或狀況</li>
                <li>寫下你選出來的三件事情，寫的時候要好像你是在它發生了之後才寫的：<br>
                    <strong>「感謝___________帶來美好的結果！」</strong></li>
                <li>在這一天當中選擇<strong>三件你沒料到</strong>的事情</li>
                <li>對其產生的美好結果表達感謝之意</li>
                <li>每一次練習時，都請閉上你的眼睛，在腦海裡說出並感受到：<br>
                    <strong>「感謝_______________帶來美好的結果！」</strong></li>
            </ul>
        `,
        dailyPractice: {
            type: "outcomes",
            prompt: "寫下三件你希望有美好結果的事情"
        }
    },
    {
        day: 22,
        title: "就在你的眼前",
        icon: "👀",
        isNew: true,
        hasMorningList: true,
        hasMagicStone: true,
        description: `
            <p>讓渴望活在眼前！</p>
            <ul>
                <li>一天開始時，拿出你列好的「<strong>前十項渴望清單</strong>」</li>
                <li>閱讀你清單上的每個句子、每個渴望</li>
                <li>花一分鐘的時間想像你<strong>已經實現</strong>了自己的渴望</li>
                <li>要盡可能感受到感恩之情（彷彿你現在就已經得到了）</li>
                <li>渴望清單放在口袋裡隨身帶著</li>
                <li>一天當中至少要在<strong>兩個時刻</strong>拿出你的清單閱讀一遍</li>
                <li>並且盡可能感受到感恩</li>
            </ul>
        `,
        dailyPractice: {
            type: "visualize",
            prompt: "記錄你今天閱讀渴望清單的感受"
        }
    },
    {
        day: 23,
        title: "魔法空氣",
        icon: "🌬️",
        isNew: true,
        hasMorningList: true,
        hasMagicStone: true,
        description: `
            <p>感謝生命之氣！</p>
            <ul>
                <li>今天請在<strong>五個不同的時刻</strong>停下來思考你呼吸的這神聖空氣</li>
                <li>刻意地<strong>深呼吸五次</strong></li>
                <li>感受空氣在你身體內的流動感覺</li>
                <li>並感受將它呼出去的喜悅</li>
                <li>完成每一次的呼吸後，請說魔法句：<br>
                    <strong>「感謝我所呼吸的魔法空氣」</strong></li>
                <li>盡你所能地對這賜予你生命的珍貴空氣表達感謝</li>
            </ul>
        `,
        dailyPractice: {
            type: "breathing",
            prompt: "記錄你今天五次深呼吸練習的時刻"
        }
    },
    {
        day: 24,
        title: "魔杖",
        icon: "🪄",
        isNew: true,
        hasMorningList: true,
        hasMagicStone: true,
        description: `
            <p>用魔杖祝福他人！</p>
            <ul>
                <li>選擇<strong>三個</strong>你很關心、很想協助他們得到更多健康、財富、快樂的人</li>
                <li>如果你有這三個人的照片，找出來放在你的面前</li>
                <li>一次針對一個人做練習，把他的照片放在手中</li>
                <li>閉上眼睛，花一分鐘的時間想像那個人<strong>已經重新得到</strong>健康、財富或快樂了</li>
                <li>而且你正聽到這個消息</li>
                <li>睜開眼睛，照片仍然放在手中，慢慢地說出魔法句：<br>
                    <strong>「感謝、感謝、感謝ＯＯ（人名）擁有的健康、財富、快樂」</strong></li>
            </ul>
        `,
        dailyPractice: {
            type: "wand",
            prompt: "寫下你用魔杖祝福的三個人"
        }
    },
    {
        day: 25,
        title: "召喚魔法",
        icon: "🔮",
        isNew: true,
        hasMorningList: true,
        hasMagicStone: true,
        description: `
            <p>從周遭接收感恩提示！</p>
            <ul>
                <li>今天請<strong>留心你周遭發生的事情</strong></li>
                <li>在這一天之中接收至少<strong>七個感恩提示</strong></li>
                <li>例如，如果你看到某人擁有你的理想體重，就說：<br>
                    <strong>「感謝我那理想的體重！」</strong></li>
                <li>如果你看到美麗的房子，就說：<br>
                    <strong>「感謝我那美麗的房子！」</strong></li>
                <li>把周遭看到的一切當作你的感恩提示</li>
            </ul>
        `,
        dailyPractice: {
            type: "cues",
            prompt: "記錄今天你接收到的七個感恩提示"
        }
    },
    {
        day: 26,
        title: "如魔法般將錯誤轉化成恩典",
        icon: "🦋",
        isNew: true,
        hasMorningList: true,
        hasMagicStone: true,
        description: `
            <p>從錯誤中發現恩典！</p>
            <ul>
                <li>選擇你曾犯過的<strong>一個錯誤</strong></li>
                <li>從這個錯誤中找出讓你感謝的<strong>十項恩典</strong>，並將它們寫下來</li>
                <li>為了幫助你找到恩典，你可以問自己這些問題：<br>
                    - 我從這個錯誤中學到了什麼？<br>
                    - 這個錯誤中有什麼美好的事情發生了？</li>
            </ul>
            <p>💫 每一個錯誤都是偽裝的恩典！</p>
        `,
        dailyPractice: {
            type: "mistake",
            prompt: "選擇一個錯誤，寫下從中發現的十項恩典"
        }
    },
    {
        day: 27,
        title: "魔鏡",
        icon: "🪞",
        isNew: true,
        hasMorningList: true,
        hasMagicStone: true,
        description: `
            <p>對鏡中的自己說感謝！</p>
            <ul>
                <li>今天每當你看著鏡中的自己時，都要說「<strong>感謝你</strong>」</li>
                <li>而且要比過去曾有過的感覺還要<strong>真誠</strong></li>
                <li>如果你真的勇敢，那麼在看著鏡子的時候</li>
                <li>說出你感謝自己的<strong>三件事</strong></li>
            </ul>
            <p>💫 你值得被感謝！</p>
        `,
        dailyPractice: {
            type: "mirror",
            prompt: "寫下你感謝自己的三件事"
        }
    },
    {
        day: 28,
        title: "記得魔法",
        icon: "📚",
        isNew: true,
        hasMorningList: true,
        hasMagicStone: true,
        description: `
            <p>🎉 恭喜你！這是28天旅程的最後一天！</p>
            <p>你在這本書的練習裡，已經寫下<strong>兩百八十項恩典</strong>了！</p>
            <ul>
                <li>透過數算<strong>昨天的恩典</strong>來記得魔法，並把它們寫下來</li>
                <li>問你自己這個問題：<strong>「昨天發生了哪些最美好的事情？」</strong></li>
                <li>快速回憶昨天的恩典</li>
                <li>直到你對於能記得並寫下當天所有的恩典感覺到滿意為止</li>
                <li>當你記起每一件事時，只要在你的腦海中說魔法句：「<strong>感謝你</strong>」即可</li>
            </ul>
            <p>💫 今天過後，你可以用寫的或用說的繼續這個練習。感恩之旅，永不結束！</p>
        `,
        dailyPractice: {
            type: "remember",
            prompt: "回憶昨天的恩典，寫下所有美好的事情"
        }
    }
];

// 導出供其他腳本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PRACTICES };
}
