let defaultSheet, rightSheet, jumpSheet, punchSheet, rushSheet, sleepSheet, dieSheet, wakeSheet, eatSheet;
let defaultFrames = [], rightFrames = [], jumpFrames = [], punchFrames = [], rushFrames = [], sleepFrames = [], dieFrames = [], wakeFrames = [], eatFrames = [];
// 新增第二個角色的變數
let newCharSheet, newCharTalkSheet, newCharWalkSheet, newCharAttackSheet, newCharDieSheet, newCharVictorySheet;
let newCharFrames = [], newCharTalkFrames = [], newCharWalkFrames = [], newCharAttackFrames = [], newCharDieFrames = [], newCharVictoryFrames = [];
let char1TalkFrames = []; // 角色1對話頭像
let char3TalkFrames = []; // 新增：角色3對話頭像
let bgImage; // 用於儲存背景圖片
let originalBgImage; // 新增：保存原始背景
let unnamedImage; // 新增：unnamed 背景
let bg3Image; // 新增：背景3圖片
let battleTransitionImage; // 轉場圖片
let dieFinalImage; // 角色1死亡後的最終圖片
let victoryTextImage; // 勝利文字圖片
let fallingItemImage; // 掉落的圖片
let fallingItemY = -300; // 掉落圖片的初始 Y 位置
let titleLogoSheet; // 新增：標題動畫圖片
let titleLogoFrames = []; // 新增：標題動畫幀
let coneImage; // 新增：交通錐圖片
let starImage; // 星星圖片
let appleImage; // 新增：蘋果圖片
let doorImage; // 新增：門圖片
let stars = []; // 儲存所有星星的陣列
const minStarDistance = 250; // 星星與玩家的最小距離
const maxStars = 1; // 畫面上最多存在的星星數量
let fallingItemVy = 0; // 掉落圖片的垂直速度
let fallingItemX = 0; // 掉落圖片的 X 位置 (世界座標)
let hasFallingItemDropped = false; // 是否已經初始化掉落位置
let isTransitioning = false; // 是否正在轉場
let transitionStartTime = 0; // 轉場開始時間
let isBattleMode = false; // 是否進入戰鬥模式 (畫面固定)
let isGameStarted = false; // 遊戲是否開始 (睡覺狀態)
let isWakingUp = false; // 是否正在起床
let victoryStartTime = 0; // 勝利動畫開始時間
let moveInstructionOpacity = 255; // 移動提示透明度
let hasPlayerMoved = false; // 玩家是否已經開始移動
let introStars = []; // 新增：初始畫面的星星陣列
let isTitleScreen = true; // 新增：是否在標題畫面
let meteors = []; // 新增：流星陣列
let titleFallImage; // 新增：標題轉場掉落圖片
let isTitleTransitioning = false; // 新增：標題轉場狀態
let titleFallY = 0; // 新增：標題轉場掉落Y
let titleFallX = 0; // 新增：標題轉場掉落X
let titleFallVelocity = 0; // 新增：標題轉場掉落速度
let isFallingEntrance = false; // 新增：掉落入場動畫狀態
let mysteryImage; // 新增：神秘圖片
let mysteryX, mysteryY; // 新增：神秘圖片位置

// 新增淡入淡出變數
let fadeAlpha = 0;
let isFadingOut = false;
let isFadingIn = false;
let isEatingStar = false; // 新增：是否正在吃星星
let showStarPowerupWindow = false; // 新增：是否顯示星星能力視窗
// 新增數學問題相關變數
let mathProblem = {};
let mathAnswerInput;
let showWrongAnswerEffect = 0;
let isCorrectAnswer = false; // 答對問題的動畫狀態
let mathWindowState = 'asking'; // 'asking', 'correct', 'incorrect', 'instruction'
let questionsAnsweredCount = 0; // 新增：已回答問題數量
let punchUnlocked = false; // 新增：拳擊攻擊是否解鎖
let hasLockedForHalfHP = false; // 新增：是否已經觸發半血鎖定
let holeX; // 地洞的 X 位置
const holeWidth = 200; // 地洞的寬度
let isFallingDownHole = false; // 新增：掉進洞裡的轉場狀態
let hasFallenTransitionDone = false; // 新增：防止重複觸發轉場
let fallCurtainHeight = 0; // 新增：掉落轉場黑幕的高度
let isRevealingNewBg = false; // 新增：新背景揭露動畫狀態
let revealCurtainY = 0; // 新增：新背景揭露動畫Y座標
let isWaitingOnBlackScreen = false; // 新增：黑幕等待狀態
let blackScreenStartTime = 0; // 新增：黑幕等待計時器
let explosionParticles = []; // 新增：爆炸粒子陣列
let char3JumpImage; // 新增：角色3跳躍圖片
let isMysteryExploded = false; // 新增：神秘圖片是否已爆炸
let isChar3Active = false; // 新增：角色3是否出現
let char3X, char3Y, char3Vy; // 新增：角色3物理變數
let char3SimpleSheet; // 新增：角色3落地動畫圖
let char3SimpleFrames = []; // 新增：角色3落地動畫幀
let char3CurrentFrame = 0; // 新增：角色3動畫幀索引
let char3WalkSheet; // 新增：角色3走路圖片
let char3WalkFrames = []; // 新增：角色3走路動畫幀
let char3AttackSheet; // 新增：角色3攻擊圖片
let char3AttackFrames = []; // 新增：角色3攻擊動畫幀
let char3DieSheet; // 新增：角色3死亡圖片
let char3DieFrames = []; // 新增：角色3死亡動畫幀
let char3DieFinalImage; // 新增：角色3死亡最終圖片
let char3DefeatImage; // 新增：角色3戰敗圖片
let isChar3Attacking = false; // 新增：角色3是否正在攻擊
let char5StandSheet; // 新增：角色5站立圖片
let char5StandFrames = []; // 新增：角色5站立動畫幀
let char5WalkSheet; // 新增：角色5走路圖片
let char5WalkFrames = []; // 新增：角色5走路動畫幀
let isCostumeChanged = false; // 新增：是否切換服裝
let char5WindowX = 0; // 新增：角色5在視窗中的X
let char5WindowY = 0; // 新增：角色5在視窗中的Y
let char5VelocityX = 0; // 新增：角色5 X速度
let char5VelocityY = 0; // 新增：角色5 Y速度
let char5State = 'walk'; // 新增：角色5狀態 (walk/idle)
let char5Timer = 0; // 新增：角色5狀態計時器
let char5Facing = 1; // 新增：角色5面向 (1:左, -1:右)
let isChar4QuizCompleted = false; // 新增：角色4戰鬥是否已完成問答
let isChar3QuizCompleted = false; // 新增：角色3戰鬥是否已完成問答
let isFallingToStage3 = false; // 新增：前往背景3的轉場狀態
let punch2Sheet; // 新增：場景2攻擊圖片
let punch2Frames = []; // 新增：場景2攻擊動畫幀
let isOnPipe = false; // 新增：判斷是否站在水管上
let bg3RightImage; // 新增：背景3右側圖片
let coinImage; // 新增：金幣圖片
let coins = []; // 新增：金幣陣列
let coinCount = 0; // 新增：金幣數量
let char4Image; // 新增：角色4圖片
let isChar4Active = false; // 新增：角色4是否出現
let char4X = 0, char4Y = 0; // 新增：角色4位置
let char4Vy = 0; // 新增：角色4垂直速度
let char4JumpSheet; // 新增：角色4跳躍圖片
let char4JumpFrames = []; // 新增：角色4跳躍動畫幀
let char4CurrentFrame = 0; // 新增：角色4當前幀
let char4StandSheet; // 新增：角色4站立圖片
let char4StandFrames = []; // 新增：角色4站立動畫幀
let char4WalkSheet; // 新增：角色4走路圖片
let char4WalkFrames = []; // 新增：角色4走路動畫幀
let isChar4Moving = false; // 新增：角色4是否正在移動
let char4AttackSheet; // 新增：角色4攻擊圖片
let char4AttackFrames = []; // 新增：角色4攻擊動畫幀
let isChar4Attacking = false; // 新增：角色4是否正在攻擊
let char4VictorySheet; // 新增：角色4勝利圖片
let char4VictoryFrames = []; // 新增：角色4勝利動畫幀
let char4DieSheet; // 新增：角色4死亡圖片
let char4DieFrames = []; // 新增：角色4死亡動畫幀
let char4DefeatItemImage; // 新增：角色4戰敗掉落物圖片
let openedChestImage; // 新增：開啟的寶箱圖片
let isChestOpened = false; // 新增：寶箱是否已開啟
let isChar4DefeatItemFalling = false; // 新增：角色4戰敗掉落物狀態
let char4DefeatItemX = 0, char4DefeatItemY = 0, char4DefeatItemVy = 0; // 新增：角色4戰敗掉落物物理變數
let musImage; // 新增：MUS 物件圖片
let musObject = null; // 新增：MUS 物件
let questionPool = []; // 新增：問題池，用於隨機不重複抽題

// 新增：遊戲統計變數
let playStartTime = 0;
let deathCount = 0;
let totalQuestions = 0;
let correctAnswers = 0;
let showEndGameStats = false;

// HP 變數
let p1MaxHP = 30;
let p1HP = 30;
let p2MaxHP = 10;
let p2HP = 10;
// 新增攻擊判定旗標，確保每次攻擊只扣一次血
let p1HasHit = false;
let p2HasHit = false;

// 建立物件來分別管理兩種動畫的屬性
const defaultAnim = {
  totalFrames: 7,
  sheetWidth: 198,
  sheetHeight: 24,
  frameWidth: 198 / 7
};

const rightAnim = {
  totalFrames: 8,
  sheetWidth: 251,
  sheetHeight: 24,
  frameWidth: 251 / 8
};

const jumpAnim = {
  totalFrames: 5,
  sheetWidth: 140,
  sheetHeight: 26,
  frameWidth: 140 / 5
};

const punchAnim = {
  totalFrames: 6,
  sheetWidth: 253,
  sheetHeight: 35,
  frameWidth: 253 / 6
};
// 新增場景2攻擊動畫的屬性
const punch2Anim = {
  totalFrames: 6,
  sheetWidth: 199,
  sheetHeight: 28,
  frameWidth: 199 / 6
};

// 新增衝刺動畫的屬性
const rushAnim = {
  totalFrames: 8,
  sheetWidth: 219,
  sheetHeight: 24,
  frameWidth: 219 / 8
};
// 新增吃星星動畫的屬性
const eatAnim = {
  totalFrames: 8,
  sheetWidth: 347,
  sheetHeight: 33,
  frameWidth: 347 / 8
};
// 新增睡覺動畫的屬性
const sleepAnim = {
  totalFrames: 6,
  sheetWidth: 169,
  sheetHeight: 18,
  frameWidth: 169 / 6
};
// 新增起床動畫的屬性
const wakeAnim = {
  totalFrames: 7,
  sheetWidth: 212,
  sheetHeight: 31,
  frameWidth: 212 / 7
};
// 新增角色1死亡動畫的屬性
const dieAnim = {
  totalFrames: 6,
  sheetWidth: 221,
  sheetHeight: 28,
  frameWidth: 221 / 6
};
// 新增第二個角色的動畫屬性
const newCharAnim = {
  totalFrames: 2,
  sheetWidth: 53,
  sheetHeight: 24,
  frameWidth: 53 / 2
};
// 新增角色二說話的動畫屬性
const newCharTalkAnim = {
  totalFrames: 4,
  sheetWidth: 119,
  sheetHeight: 29,
  frameWidth: 119 / 4
};
// 新增角色二走路的動畫屬性
const newCharWalkAnim = {
  totalFrames: 6,
  sheetWidth: 169,
  sheetHeight: 24,
  frameWidth: 169 / 6
};
// 新增角色二攻擊的動畫屬性
const newCharAttackAnim = {
  totalFrames: 8,
  sheetWidth: 459,
  sheetHeight: 33,
  frameWidth: 459 / 8
};
// 新增角色二死亡的動畫屬性
const newCharDieAnim = {
  totalFrames: 6,
  sheetWidth: 181,
  sheetHeight: 24,
  frameWidth: 181 / 6
};
// 新增角色二勝利的動畫屬性
const newCharVictoryAnim = {
  totalFrames: 5,
  sheetWidth: 140,
  sheetHeight: 29,
  frameWidth: 140 / 5
};
// 新增標題動畫的屬性
const titleLogoAnim = {
  totalFrames: 8,
  sheetWidth: 355,
  sheetHeight: 47,
  frameWidth: 355 / 8
};
// 新增角色3落地動畫的屬性
const char3SimpleAnim = {
  totalFrames: 6,
  sheetWidth: 271,
  sheetHeight: 41,
  frameWidth: 271 / 6
};
// 新增角色3走路動畫的屬性
const char3WalkAnim = {
  totalFrames: 5,
  sheetWidth: 235,
  sheetHeight: 46,
  frameWidth: 235 / 5
};
// 新增角色3攻擊動畫的屬性
const char3AttackAnim = {
  totalFrames: 6,
  sheetWidth: 277,
  sheetHeight: 42,
  frameWidth: 277 / 6
};
// 新增角色3死亡動畫的屬性
const char3DieAnim = {
  totalFrames: 5,
  sheetWidth: 375,
  sheetHeight: 36,
  frameWidth: 375 / 5
};
// 新增角色5站立動畫的屬性
const char5StandAnim = {
  totalFrames: 5,
  sheetWidth: 220,
  sheetHeight: 34,
  frameWidth: 220 / 5
};
// 新增角色5走路動畫的屬性
const char5WalkAnim = {
  totalFrames: 2,
  sheetWidth: 79,
  sheetHeight: 33,
  frameWidth: 79 / 2
};
// 新增角色4跳躍動畫的屬性
const char4JumpAnim = {
  totalFrames: 5,
  sheetWidth: 205,
  sheetHeight: 36,
  frameWidth: 205 / 5
};
// 新增角色4站立動畫的屬性
const char4StandAnim = {
  totalFrames: 4,
  sheetWidth: 111,
  sheetHeight: 33,
  frameWidth: 111 / 4
};
// 新增角色4走路動畫的屬性
const char4WalkAnim = {
  totalFrames: 8,
  sheetWidth: 315,
  sheetHeight: 35,
  frameWidth: 315 / 8
};
// 新增角色4攻擊動畫的屬性
const char4AttackAnim = {
  totalFrames: 4,
  sheetWidth: 219,
  sheetHeight: 45,
  frameWidth: 219 / 4
};
// 新增角色4勝利動畫的屬性
const char4VictoryAnim = {
  totalFrames: 2,
  sheetWidth: 53,
  sheetHeight: 33,
  frameWidth: 53 / 2
};
// 新增角色4死亡動畫的屬性
const char4DieAnim = {
  totalFrames: 5,
  sheetWidth: 210,
  sheetHeight: 33,
  frameWidth: 210 / 5
};



let currentFrame = 0;
let animationSpeed = 0.2; // 動畫播放速度，數值越小越慢
let newCharAnimationSpeed = 0.15; // 角色2的動畫播放速度

// 新增一個縮放因子來調整角色大小，您可以修改這個數值
const scaleFactor = 3;
const newCharScaleFactor = scaleFactor; // 讓角色二和角色一一樣大

let lastAnimType = 'default'; // 用於追蹤上一個動畫類型

// 角色位置變數
let characterX; // 這將代表角色在 "世界" 中的位置
let characterY;
const moveSpeed = 3; // 角色一般移動速度
let facingDirection = 1; // 1 代表向右 (預設), -1 代表向左。移到 draw 外以保持狀態。

// 新增第二個角色的位置與動畫幀數變數
let newCharX;
let newCharY;
let newCharCurrentFrame = 0;
let isNewCharAttacking = false; // 新增攻擊狀態變數

// 新增一個變數來定義地面高度
let groundLevel;

// 新增鏡頭位移變數
let cameraOffsetX = 0;

// 用於邊界碰撞，取所有動畫中最大的寬度，防止角色在切換動畫時被切邊
let maxFrameWidth;
let maxFrameHeight;

// 跳躍相關的物理變數
let velocityY = 0;
const gravity = 0.6;
const jumpPower = -15; // 負數代表向上
let isJumping = false;

// 攻擊狀態變數
let isPunching = false;
let isRushing = false; // 新增：是否正在衝刺


// 對話框狀態變數
let showDialog = false;
let isPlayerInRange = false; // 新增變數，判斷玩家是否在互動範圍內

// 對話內容
const char2Dialogues = [
  { speaker: 'char2', text: '你好！我是瓦豆魯迪！' },
  { speaker: 'char2', text: '你叫什麼名字？' },
  { type: 'input', speaker: 'char1', prompt: '我是 ' },
  { speaker: 'char2', text: '你好，{playerName}！' },
  { speaker: 'char2', text: '但很抱歉 不能再往前走了 前面路段修整中禁止通行' },
  { speaker: 'char1', text: '!' },
  { speaker: 'char1', text: '可是我現在就要過去!!!' },
  { speaker: 'char2', text: '那你先打贏我在說!!!!!!!!!' },
];
const char3Dialogues = [
  { speaker: 'char3', text: '找我有什麼事嗎' },
  { speaker: 'char1', text: '我只是路過' },
  { speaker: 'char3', text: '你瞎了嗎？沒看到這有人？' },
  { speaker: 'char1', text: '不是，我只是不小心的...' },
  { speaker: 'char3', text: '哼！那就來試試看我的拳頭吧！' },
  
];
const char4Dialogues = [
  { speaker: 'char4', text: '是你召喚我的嗎?' },
  { speaker: 'char1', text: '應該是吧?' },
  { speaker: 'char4', text: '你有什麼願望嗎' },
  { speaker: 'char1', text: '我只是路過...' },
  { speaker: 'char4', text: '那就讓我幫你吧!' },
  { speaker: 'char1', text: '不用沒關西...' },
  { speaker: 'char4', text: '居然拒絕我的好意!!!' },
  { speaker: 'char4', text: '那來打一架吧!!!!!' },
  { speaker: 'char1', text: '!!!' },

];
const englishQuestions = [
  { q: "1. 選擇正確的動詞 (文法)\nI ________ to the gym every morning.\n\n(A) goes\n(B) go\n(C) going", a: "B" },
  { q: "2. 填入適當的介系詞 (地點)\nThe book is ________ the table.\n\n(A) on\n(B) in\n(C) at", a: "A" },
  { q: "3. 日常對話連連看\nA: \"How are you doing?\"\nB: \"________\"\n\n(A) I’m a student.\n(B) I’m twenty years old.\n(C) I’m doing great, thanks!", a: "C" },
  { q: "4. 單字選擇 (職業)\nMy father works in a hospital. He is a ________.\n\n(A) teacher\n(B) doctor\n(C) cook", a: "B" },
  { q: "5. 否定句改寫 (文法)\n請將這句話改為否定句：\"She likes apples.\"\n\n(A) She not like apples.\n(B) She doesn't like apples.\n(C) She don't like apples.", a: "B" }
];
const chineseQuestions = [
  { q: "1. 【成語辨析】 當角色 2 正在睡覺卻被角色 1 吵醒時，他怒不可遏的樣子，最適合用下列哪個成語形容？\n\n(A) 興高采烈 (B) 怒髮衝冠 (C) 眉開眼笑 (D) 虛懷若谷", a: "B" },
  { q: "2. 【動詞運用】 「阿強見狀不妙，隨手抓起一旁的垃圾桶蓋（ ）了過去，試圖擋住老黑的拳頭。」括號中最適合填入哪個字？\n\n(A) 揮 (B) 摸 (C) 擋 (D) 拋", a: "C" },
  { q: "3. 【修辭練習】 「老黑的呼嚕聲像雷鳴一樣，震得長椅都在發抖。」這句話運用了哪種修辭法？\n\n(A) 擬人 (B) 譬喻 (C) 排比 (D) 設問", a: "B" },
  { q: "4. 【詞語解釋】 阿強「漫不經心」地坐到了老黑的腿上。請問「漫不經心」的意思為何？\n\n(A) 描述一個人心地善良 (B) 形容走路速度很快 (C) 隨隨便便，不放在心上 (D) 心情非常緊張", a: "C" },
  { q: "5. 【情境判斷】 如果角色 1 想要避免這場打鬥，在吵醒對方後最應該說哪一句話？\n\n(A) 「是你自己要睡這裡的，怪我囉？」 (B) 「你的腿有點硬，坐起來不舒服。」 (C) 「非常抱歉，我剛才分心沒看到您，真的不好意思！」 (D) 「喂，起來，這位置我也要坐。」", a: "C" }
];
let dialogueTexts = char2Dialogues; // 預設對話內容
let dialogueIndex = 0; // 目前對話的索引

// 玩家輸入相關變數
let isWaitingForInput = false;
let nameInput;
let playerName = "卡比"; // 預設名字

// 對話框頭像動畫變數
let dialogIconFrame = 0;
let lastIconSwitchTime = 0;
const iconSwitchInterval = 500; // 頭像切換間隔 (毫秒)，500ms = 0.5秒

// p5.js 會在 setup() 之前執行 preload()，確保圖片資源都載入完成
function preload() {
  // 載入預設的圖片 (spriteSheet)
  defaultSheet = loadImage('1/123/1223.png');
  // 載入按下右鍵時要顯示的圖片 (walk.png)
  rightSheet = loadImage('1/walk/walk.png');
  // 載入跳躍動畫圖片
  jumpSheet = loadImage('1/jump/j.png');
  // 載入攻擊動畫圖片
  punchSheet = loadImage('1/pounch/p.png');
  // 載入衝刺動畫圖片
  rushSheet = loadImage('1/rush/r.png');
  // 載入吃星星動畫圖片
  eatSheet = loadImage('1/eat/e.png');
  // 載入睡覺動畫圖片
  sleepSheet = loadImage('1/sleep/s.png');
  // 載入起床動畫圖片
  wakeSheet = loadImage('1/wake/w.png');
  // 載入死亡動畫圖片
  dieSheet = loadImage('1/die/d.png');
  // 載入死亡後的靜態圖片
  dieFinalImage = loadImage('1/die/5.png');
  // 載入第二個角色的圖片
  newCharSheet = loadImage('2/1/100.png');
  // 載入角色二說話的圖片
  newCharTalkSheet = loadImage('2/2/02.png');
  // 載入角色二走路的圖片
  newCharWalkSheet = loadImage('2/walk/w.png');
  // 載入角色二攻擊的圖片
  newCharAttackSheet = loadImage('2/attack/a.png');
  // 載入角色二死亡的圖片
  newCharDieSheet = loadImage('2/die/d.png');
  // 載入角色二勝利的圖片
  newCharVictorySheet = loadImage('2/victory/v.png');
  // 載入角色1對話頭像 (0.png 和 1.png)
  char1TalkFrames[0] = loadImage('1/0.png');
  char1TalkFrames[1] = loadImage('1/1.png');
  // 載入背景圖片
  originalBgImage = loadImage('rikka-momo-kirby-world.jpg');
  // 載入 unnamed 背景圖片
  unnamedImage = loadImage('unnamed.jpg');
  // 載入背景3圖片
  bg3Image = loadImage('360_F_573475624_7Un3lS2nBRW12XEeb2dVlpfhfa8KXjVU.jpg');
  // 載入轉場圖片
  battleTransitionImage = loadImage('971578e10b1d7cadd3889670529384db.png');
  // 載入勝利文字圖片
  victoryTextImage = loadImage('victory-speech-poster-text-art-design-png.png');
  // 載入掉落的圖片
  fallingItemImage = loadImage('wooden.png');
  // 載入交通錐圖片
  coneImage = loadImage('插圖.png');
  // 載入標題動畫圖片
  titleLogoSheet = loadImage('0/f0009.png');
  // 載入標題轉場掉落圖片
  titleFallImage = loadImage('1/0.png');
  // 載入星星圖片
  starImage = loadImage('1/star/0.png');
  // 載入神秘圖片
  mysteryImage = loadImage('385707.png');
  // 載入角色3跳躍圖片
  char3JumpImage = loadImage('3/jump/0.png');
  // 載入角色3落地動畫圖片
  char3SimpleSheet = loadImage('3/simple/s.png');
  // 新增：載入角色3走路圖片
  char3WalkSheet = loadImage('3/walk/w.png');
  // 新增：載入角色3攻擊圖片
  char3AttackSheet = loadImage('3/att/a.png');
  // 新增：載入場景2攻擊圖片
  punch2Sheet = loadImage('1/pounch2/p.png');
  // 新增：載入角色3死亡圖片
  char3DieSheet = loadImage('3/die/d.png');
  // 新增：載入角色3死亡最終圖片
  char3DieFinalImage = loadImage('3/die/4.png');
  // 新增：載入角色3戰敗圖片
  char3DefeatImage = loadImage('4/0.png');
  // 新增：載入角色3對話頭像
  char3TalkFrames[0] = loadImage('3/1/0.png');
  char3TalkFrames[1] = loadImage('3/1/1.png');
  // 新增：載入門圖片
  doorImage = loadImage('DOOR.jpg');
  // 新增：載入角色5站立圖片
  char5StandSheet = loadImage('5/stand/s.png');
  // 新增：載入角色5走路圖片
  char5WalkSheet = loadImage('5/walk/w.png');
  // 新增：載入背景3右側圖片
  bg3RightImage = loadImage('Gemini_Generated_Image_s95b9us95b9us95b.png');
  // 新增：程式化生成金幣圖片
  coinImage = createPixelCoin();
  // 新增：載入角色4圖片 (使用資料夾4的圖片)
  char4Image = loadImage('4/0.png');
  // 新增：載入角色4跳躍圖片
  char4JumpSheet = loadImage('4/jump/j.png');
  // 新增：載入角色4站立圖片
  char4StandSheet = loadImage('4/2/s.png');
  // 新增：載入角色4走路圖片
  char4WalkSheet = loadImage('4/walk/w.png');
  // 新增：載入角色4攻擊圖片
  char4AttackSheet = loadImage('4/attack/a.png');
  // 新增：載入角色4勝利圖片
  char4VictorySheet = loadImage('4/victory/v.png');
  // 新增：載入角色4死亡圖片
  char4DieSheet = loadImage('4/die/d.png');
  // 新增：載入角色4戰敗掉落物圖片
  char4DefeatItemImage = loadImage('Gemini_Generated_Image_qy5zulqy5zulqy5z.png');
  // 新增：載入開啟的寶箱圖片
  openedChestImage = loadImage('Gemini_Generated_Image_x4e5vhx4e5vhx4e5.png');
  // 新增：載入 MUS 圖片
  musImage = loadImage('4/mus/0.png');
}

function setup() {
  // 建立一個填滿整個瀏覽器視窗的畫布
  createCanvas(windowWidth, windowHeight);

  bgImage = originalBgImage; // 初始化背景

  // 設定全域字體為可愛的 "Baloo 2"
  textFont('Baloo 2');

  // 設定地面高度為畫布的 80%
  groundLevel = height * 0.8;

  // 初始化角色位置在畫布偏左
  characterX = width / 4;
  characterY = groundLevel; // 將角色放在地面上

  // 初始化第二個角色的位置在地圖右邊外側
  newCharX = width * 0.8;
  newCharY = groundLevel; // 將角色放在地面上

  // 初始化地洞位置 (在畫面右側較遠處)
  holeX = width * 1.2;

  // 初始化神秘圖片位置 (在第二個背景)
  mysteryX = width * 1.5;
  mysteryY = groundLevel - 130; // 第二關的地面高度

  // 新增：初始化初始畫面的星星
  const starColors = [
    color(255, 255, 200), // 淡黃
    color(200, 240, 255), // 淡藍
    color(255, 220, 240), // 淡粉
    color(255, 255, 255)  // 白
  ];
  for (let i = 0; i < 200; i++) {
    introStars.push({
      x: random(width),
      y: random(height), // 星星分布在整個畫面
      size: random() < 0.1 ? random(8, 12) : random(2, 6), // 10% 機率生成大星星
      alpha: random(100, 255),
      blinkSpeed: random(2, 5) * (random() > 0.5 ? 1 : -1),
      color: random(starColors) // 新增：隨機顏色
    });
  }

  // 計算出所有動畫幀中最寬的尺寸
  maxFrameWidth = Math.max(defaultAnim.frameWidth, rightAnim.frameWidth, jumpAnim.frameWidth, rushAnim.frameWidth, eatAnim.frameWidth);
  
  // 計算出所有動畫幀中最高的尺寸
  maxFrameHeight = Math.max(defaultAnim.sheetHeight, rightAnim.sheetHeight, jumpAnim.sheetHeight, punchAnim.sheetHeight, rushAnim.sheetHeight, eatAnim.sheetHeight);

  // 從 defaultSheet 中擷取預設動畫的每一幀
  for (let i = 0; i < defaultAnim.totalFrames; i++) {
    let frame = defaultSheet.get(i * defaultAnim.frameWidth, 0, defaultAnim.frameWidth, defaultAnim.sheetHeight);
    defaultFrames.push(frame);
  }

  // 從 rightSheet 中擷取向右走動畫的每一幀
  for (let i = 0; i < rightAnim.totalFrames; i++) {
    let frame = rightSheet.get(i * rightAnim.frameWidth, 0, rightAnim.frameWidth, rightAnim.sheetHeight);
    rightFrames.push(frame);
  }

  // 從 jumpSheet 中擷取跳躍動畫的每一幀
  for (let i = 0; i < jumpAnim.totalFrames; i++) {
    let frame = jumpSheet.get(i * jumpAnim.frameWidth, 0, jumpAnim.frameWidth, jumpAnim.sheetHeight);
    jumpFrames.push(frame);
  }

  // 從 punchSheet 中擷取攻擊動畫的每一幀
  for (let i = 0; i < punchAnim.totalFrames; i++) {
    let frame = punchSheet.get(i * punchAnim.frameWidth, 0, punchAnim.frameWidth, punchAnim.sheetHeight);
    punchFrames.push(frame);
  }

  // 從 rushSheet 中擷取衝刺動畫的每一幀
  for (let i = 0; i < rushAnim.totalFrames; i++) {
    let frame = rushSheet.get(i * rushAnim.frameWidth, 0, rushAnim.frameWidth, rushAnim.sheetHeight);
    rushFrames.push(frame);
  }

  // 從 eatSheet 中擷取吃星星動畫的每一幀
  for (let i = 0; i < eatAnim.totalFrames; i++) {
    let frame = eatSheet.get(i * eatAnim.frameWidth, 0, eatAnim.frameWidth, eatAnim.sheetHeight);
    eatFrames.push(frame);
  }

  // 從 sleepSheet 中擷取睡覺動畫的每一幀
  for (let i = 0; i < sleepAnim.totalFrames; i++) {
    let frame = sleepSheet.get(i * sleepAnim.frameWidth, 0, sleepAnim.frameWidth, sleepAnim.sheetHeight);
    sleepFrames.push(frame);
  }

  // 從 wakeSheet 中擷取起床動畫的每一幀
  for (let i = 0; i < wakeAnim.totalFrames; i++) {
    let frame = wakeSheet.get(i * wakeAnim.frameWidth, 0, wakeAnim.frameWidth, wakeAnim.sheetHeight);
    wakeFrames.push(frame);
  }

  // 從 dieSheet 中擷取死亡動畫的每一幀
  for (let i = 0; i < dieAnim.totalFrames; i++) {
    let frame = dieSheet.get(i * dieAnim.frameWidth, 0, dieAnim.frameWidth, dieAnim.sheetHeight);
    dieFrames.push(frame);
  }

  // 從 newCharSheet 中擷取第二個角色動畫的每一幀
  for (let i = 0; i < newCharAnim.totalFrames; i++) {
    let frame = newCharSheet.get(i * newCharAnim.frameWidth, 0, newCharAnim.frameWidth, newCharAnim.sheetHeight);
    newCharFrames.push(frame);
  }

  // 從 newCharTalkSheet 中擷取第二個角色說話動畫的每一幀
  for (let i = 0; i < newCharTalkAnim.totalFrames; i++) {
    let frame = newCharTalkSheet.get(i * newCharTalkAnim.frameWidth, 0, newCharTalkAnim.frameWidth, newCharTalkAnim.sheetHeight);
    newCharTalkFrames.push(frame);
  }

  // 從 newCharWalkSheet 中擷取第二個角色走路動畫的每一幀
  for (let i = 0; i < newCharWalkAnim.totalFrames; i++) {
    let frame = newCharWalkSheet.get(i * newCharWalkAnim.frameWidth, 0, newCharWalkAnim.frameWidth, newCharWalkAnim.sheetHeight);
    newCharWalkFrames.push(frame);
  }

  // 從 newCharAttackSheet 中擷取第二個角色攻擊動畫的每一幀
  for (let i = 0; i < newCharAttackAnim.totalFrames; i++) {
    let frame = newCharAttackSheet.get(i * newCharAttackAnim.frameWidth, 0, newCharAttackAnim.frameWidth, newCharAttackAnim.sheetHeight);
    newCharAttackFrames.push(frame);
  }

  // 從 newCharDieSheet 中擷取第二個角色死亡動畫的每一幀
  for (let i = 0; i < newCharDieAnim.totalFrames; i++) {
    let frame = newCharDieSheet.get(i * newCharDieAnim.frameWidth, 0, newCharDieAnim.frameWidth, newCharDieAnim.sheetHeight);
    newCharDieFrames.push(frame);
  }

  // 從 newCharVictorySheet 中擷取第二個角色勝利動畫的每一幀
  for (let i = 0; i < newCharVictoryAnim.totalFrames; i++) {
    let frame = newCharVictorySheet.get(i * newCharVictoryAnim.frameWidth, 0, newCharVictoryAnim.frameWidth, newCharVictoryAnim.sheetHeight);
    newCharVictoryFrames.push(frame);
  }

  // 從 titleLogoSheet 中擷取標題動畫的每一幀
  for (let i = 0; i < titleLogoAnim.totalFrames; i++) {
    let frame = titleLogoSheet.get(i * titleLogoAnim.frameWidth, 0, titleLogoAnim.frameWidth, titleLogoAnim.sheetHeight);
    titleLogoFrames.push(frame);
  }

  // 從 char3SimpleSheet 中擷取角色3落地動畫的每一幀
  for (let i = 0; i < char3SimpleAnim.totalFrames; i++) {
    let frame = char3SimpleSheet.get(i * char3SimpleAnim.frameWidth, 0, char3SimpleAnim.frameWidth, char3SimpleAnim.sheetHeight);
    char3SimpleFrames.push(frame);
  }

  // 從 char3WalkSheet 中擷取角色3走路動畫的每一幀
  for (let i = 0; i < char3WalkAnim.totalFrames; i++) {
    let frame = char3WalkSheet.get(i * char3WalkAnim.frameWidth, 0, char3WalkAnim.frameWidth, char3WalkAnim.sheetHeight);
    char3WalkFrames.push(frame);
  }

  // 從 char3AttackSheet 中擷取角色3攻擊動畫的每一幀
  for (let i = 0; i < char3AttackAnim.totalFrames; i++) {
    let frame = char3AttackSheet.get(i * char3AttackAnim.frameWidth, 0, char3AttackAnim.frameWidth, char3AttackAnim.sheetHeight);
    char3AttackFrames.push(frame);
  }

  // 從 punch2Sheet 中擷取場景2攻擊動畫的每一幀
  for (let i = 0; i < punch2Anim.totalFrames; i++) {
    let frame = punch2Sheet.get(i * punch2Anim.frameWidth, 0, punch2Anim.frameWidth, punch2Anim.sheetHeight);
    punch2Frames.push(frame);
  }

  // 從 char3DieSheet 中擷取角色3死亡動畫的每一幀
  for (let i = 0; i < char3DieAnim.totalFrames; i++) {
    let frame = char3DieSheet.get(i * char3DieAnim.frameWidth, 0, char3DieAnim.frameWidth, char3DieAnim.sheetHeight);
    char3DieFrames.push(frame);
  }

  // 從 char5StandSheet 中擷取角色5站立動畫的每一幀
  for (let i = 0; i < char5StandAnim.totalFrames; i++) {
    let frame = char5StandSheet.get(i * char5StandAnim.frameWidth, 0, char5StandAnim.frameWidth, char5StandAnim.sheetHeight);
    char5StandFrames.push(frame);
  }

  // 從 char5WalkSheet 中擷取角色5走路動畫的每一幀
  for (let i = 0; i < char5WalkAnim.totalFrames; i++) {
    let frame = char5WalkSheet.get(i * char5WalkAnim.frameWidth, 0, char5WalkAnim.frameWidth, char5WalkAnim.sheetHeight);
    char5WalkFrames.push(frame);
  }

  // 從 char4JumpSheet 中擷取角色4跳躍動畫的每一幀
  for (let i = 0; i < char4JumpAnim.totalFrames; i++) {
    let frame = char4JumpSheet.get(i * char4JumpAnim.frameWidth, 0, char4JumpAnim.frameWidth, char4JumpAnim.sheetHeight);
    char4JumpFrames.push(frame);
  }

  // 從 char4StandSheet 中擷取角色4站立動畫的每一幀
  for (let i = 0; i < char4StandAnim.totalFrames; i++) {
    let frame = char4StandSheet.get(i * char4StandAnim.frameWidth, 0, char4StandAnim.frameWidth, char4StandAnim.sheetHeight);
    char4StandFrames.push(frame);
  }

  // 從 char4WalkSheet 中擷取角色4走路動畫的每一幀
  for (let i = 0; i < char4WalkAnim.totalFrames; i++) {
    let frame = char4WalkSheet.get(i * char4WalkAnim.frameWidth, 0, char4WalkAnim.frameWidth, char4WalkAnim.sheetHeight);
    char4WalkFrames.push(frame);
  }

  // 從 char4AttackSheet 中擷取角色4攻擊動畫的每一幀
  for (let i = 0; i < char4AttackAnim.totalFrames; i++) {
    let frame = char4AttackSheet.get(i * char4AttackAnim.frameWidth, 0, char4AttackAnim.frameWidth, char4AttackAnim.sheetHeight);
    char4AttackFrames.push(frame);
  }

  // 從 char4VictorySheet 中擷取角色4勝利動畫的每一幀
  for (let i = 0; i < char4VictoryAnim.totalFrames; i++) {
    let frame = char4VictorySheet.get(i * char4VictoryAnim.frameWidth, 0, char4VictoryAnim.frameWidth, char4VictoryAnim.sheetHeight);
    char4VictoryFrames.push(frame);
  }

  // 從 char4DieSheet 中擷取角色4死亡動畫的每一幀
  for (let i = 0; i < char4DieAnim.totalFrames; i++) {
    let frame = char4DieSheet.get(i * char4DieAnim.frameWidth, 0, char4DieAnim.frameWidth, char4DieAnim.sheetHeight);
    char4DieFrames.push(frame);
  }

  // 新增：程式化生成蘋果圖片 (不需要外部檔案)
  appleImage = createPixelApple();
}

function keyPressed() {
  if (isTitleScreen) {
    // 新增：在標題畫面按下空白鍵也能開始遊戲
    if (keyCode === 32) {
      isTitleTransitioning = true; // 觸發轉場動畫
      // 計算當前擺動的位置
      let swingX = -sin(frameCount * 0.05) * 30;
      titleFallX = width / 2 + swingX;
      titleFallY = height / 2 - 50; // 從原本角色的位置開始掉落
      titleFallVelocity = 0;
      fadeAlpha = 0; // 確保從透明開始漸黑
    }
    return; 
  }

  // 如果遊戲還沒開始 (睡覺中)
  if (!isGameStarted) {
    if (!isWakingUp && keyCode === 32) { // 按下空白鍵且沒在起床
      // 重置統計數據
      playStartTime = millis();
      deathCount = 0;
      totalQuestions = 0;
      correctAnswers = 0;
      showEndGameStats = false;

      isWakingUp = true; // 開始起床
      currentFrame = 0; // 重置動畫幀以播放起床動畫
      velocityY = jumpPower; // 讓角色跳起來
    }
    return; // 忽略其他按鍵
  }

  // 如果正在轉場，按下 Enter 結束轉場並重置位置
  if (isTransitioning) {
    if (keyCode === ENTER) {
      isTransitioning = false;
      isBattleMode = true; // 進入戰鬥模式，鎖定鏡頭
      characterX = width * 0.25; // 角色1 站左邊
      
      // 根據對話內容判斷對手
      if (dialogueTexts === char3Dialogues) {
        char3X = width * 0.75; // 角色3 站右邊
        char3Y = groundLevel - 130; // 確保角色3在地面
        char3Vy = 0;
        p2HP = p2MaxHP; // 新增：重置血量，確保戰鬥開始時鏡頭固定 (且敵人活著)
        isChar3QuizCompleted = false; // 重置問答狀態
      } else if (dialogueTexts === char4Dialogues) {
        char4X = width * 0.75; // 角色4 站右邊
        char4Y = groundLevel - 50;
        char4Vy = 0;
        p2HP = p2MaxHP;
      } else {
        newCharX = width * 0.75;   // 角色2 站右邊
      }
      
      stars = []; // 進入戰鬥時清空星星
    }
    return; // 轉場時鎖定其他操作
  }

  // 當按下空白鍵
  if (keyCode === 32) {
    let hasInteracted = false;

    // 優先檢查互動
    if (bgImage === unnamedImage && !isMysteryExploded && dist(characterX, characterY, mysteryX, mysteryY) < 300) {
      // 觸發爆炸特效
      createExplosion(mysteryX, mysteryY);
      hasInteracted = true;
    } else if (isOnPipe && bgImage === unnamedImage) {
      // 新增：站在水管上按下空白鍵，觸發前往背景3的轉場
      isFallingToStage3 = true;
      fallCurtainHeight = 0;
      isOnPipe = false; // 避免重複觸發
      return;
      } else if (isChar4DefeatItemFalling && !isChestOpened && dist(characterX, characterY, char4DefeatItemX, char4DefeatItemY) < 150) {
        isChestOpened = true;
        hasInteracted = true;
        showEndGameStats = true; // 顯示結束畫面
    } else if (isPlayerInRange) {
      // 判斷靠近哪個角色並載入對應對話
      if (isChar3Active && dist(characterX, characterY, char3X, char3Y) < 250) {
        dialogueTexts = char3Dialogues;
      } else if (isChar4Active && dist(characterX, characterY, char4X, char4Y) < 250) {
        dialogueTexts = char4Dialogues;
      } else {
        dialogueTexts = char2Dialogues;
      }
      showDialog = true; // 打開對話框
      dialogueIndex = 0; // 從第一句開始
      hasInteracted = true;
    }

    // 如果沒有觸發互動，且符合攻擊條件，則進行攻擊
    if (!hasInteracted && punchUnlocked && !isJumping && !isPunching && !isWaitingForInput && p1HP > 0) {
      isPunching = true; // 進入攻擊狀態
      currentFrame = 0; // 從第一幀開始播放
      p1HasHit = false; // 重置攻擊判定
    }

    return false; // 防止瀏覽器預設行為
  }

  // 新增：當按下 SHIFT 且不在空中或攻擊或衝刺時
  if (keyCode === SHIFT && !isJumping && !isPunching && !isRushing && p1HP > 0) {
    isRushing = true;
    currentFrame = 0;
  }

  // 當在等待輸入時按下 Enter
  if (isWaitingForInput && keyCode === ENTER) {
    playerName = nameInput.value(); // 儲存玩家名稱
    if (playerName.trim() === "") {
      playerName = "訪客"; // 如果玩家沒輸入名字，就給一個預設值
    }
    nameInput.remove(); // 移除輸入框
    isWaitingForInput = false; // 結束輸入狀態
    dialogueIndex++; // 繼續下一句對話
  } else if (keyCode === ENTER && showDialog) {
    // 當按下 Enter 鍵，且對話框正在顯示 (但不是在輸入狀態)
    if (dialogueIndex < dialogueTexts.length - 1) {
      dialogueIndex++; // 進入下一句對話
    } else {
      showDialog = false; // 如果對話結束，就關閉對話框
      // 觸發轉場動畫
      isTransitioning = true;
      transitionStartTime = millis();
    }
  }

}

function draw() {
  if (showEndGameStats) {
    // 1. 先畫一個半透明的黑色背景，讓遊戲畫面變暗
    push();
    fill(0, 0, 0, 80); // 黑色，更透明
    noStroke();
    rect(0, 0, width, height);
    pop();

    // --- 繪製結束視窗 ---
    let winW = 800;
    let winH = 600;
    let winX = width / 2 - winW / 2;
    let winY = height / 2 - winH / 2;
    let cornerRadius = 20;

    // 2. 設定剪裁區域，並在其中繪製星空
    push();
    drawingContext.save(); // 保存當前的繪圖上下文

    // 建立圓角矩形的剪裁路徑
    drawingContext.beginPath();
    drawingContext.moveTo(winX + cornerRadius, winY);
    drawingContext.lineTo(winX + winW - cornerRadius, winY);
    drawingContext.quadraticCurveTo(winX + winW, winY, winX + winW, winY + cornerRadius);
    drawingContext.lineTo(winX + winW, winY + winH - cornerRadius);
    drawingContext.quadraticCurveTo(winX + winW, winY + winH, winX + winW - cornerRadius, winY + winH);
    drawingContext.lineTo(winX + cornerRadius, winY + winH);
    drawingContext.quadraticCurveTo(winX, winY + winH, winX, winY + winH - cornerRadius);
    drawingContext.lineTo(winX, winY + cornerRadius);
    drawingContext.quadraticCurveTo(winX, winY, winX + cornerRadius, winY);
    drawingContext.closePath();
    drawingContext.clip();

    // --- 在剪裁區內繪製星空背景 ---
    // 建立漸層背景：從深藍色到帶有粉紫色的夜空
    let topColorBg = color(20, 24, 82); // 上方：原本的深藍色
    let bottomColorBg = color(100, 50, 90); // 下方：帶有粉色感的紫夜
    for (let y = winY; y < winY + winH; y++) {
      let n = map(y, winY, winY + winH, 0, 1);
      let newc = lerpColor(topColorBg, bottomColorBg, n);
      stroke(newc);
      line(winX, y, winX + winW, y);
    }
    noStroke();
    
    // 繪製星星 (使用 introStars 陣列)
    for (let star of introStars) {
      let c = star.color;
      fill(red(c), green(c), blue(c), star.alpha);
      if (star.size > 7) {
        push();
        drawingContext.shadowBlur = 25;
        drawingContext.shadowColor = color(red(c), green(c), blue(c), star.alpha).toString();
        drawStar(star.x, star.y, star.size * 0.4, star.size, 5);
        pop();
      } else {
        rect(star.x, star.y, star.size, star.size);
      }
      star.alpha += star.blinkSpeed;
      if (star.alpha > 255 || star.alpha < 50) {
        star.blinkSpeed *= -1;
      }
    }

    // --- 流星效果 ---
    if (random() < 0.015) {
      meteors.push({
        x: random(width * 0.3, width + 100),
        y: random(-50, height * 0.4),
        size: random(2, 4),
        speedX: random(-15, -25),
        speedY: random(10, 18),
        alpha: 255
      });
    }
    for (let i = meteors.length - 1; i >= 0; i--) {
      let m = meteors[i];
      stroke(255, 255, 220, m.alpha);
      strokeWeight(m.size);
      line(m.x, m.y, m.x - m.speedX * 3, m.y - m.speedY * 3);
      m.x += m.speedX;
      m.y += m.speedY;
      m.alpha -= 4;
      if (m.x < -100 || m.y > height + 100 || m.alpha <= 0) {
        meteors.splice(i, 1);
      }
    }

    drawingContext.restore(); // 移除剪裁
    pop();

    // 3. 繪製視窗邊框
    push();
    noFill();
    stroke(255, 215, 0); // 金色邊框
    strokeWeight(5);
    rect(winX, winY, winW, winH, cornerRadius);
    pop();

    // 標題
    push();
    fill(255, 215, 0);
    stroke(0);
    strokeWeight(6);
    textAlign(CENTER, TOP);
    textSize(60);
    text("感謝遊玩！", winX + winW / 2, winY + 40);
    pop();

    // 統計數據
    push();
    fill(255);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(32);
    
    // 遊玩時長
    let elapsedTime = (millis() - playStartTime) / 1000; // 秒
    let minutes = floor(elapsedTime / 60);
    let seconds = floor(elapsedTime % 60);
    text(`遊玩時長: ${nf(minutes, 2)}:${nf(seconds, 2)}`, winX + 80, winY + 150);

    // 死亡次數
    text(`死亡次數: ${deathCount} 次`, winX + 80, winY + 220);

    // 答對率
    let rate = (totalQuestions > 0) ? (correctAnswers / totalQuestions) * 100 : 0;
    text(`答對率: ${rate.toFixed(1)}% (${correctAnswers}/${totalQuestions})`, winX + 80, winY + 290);
    pop();

    // --- 新增：重新開始按鈕 ---
    let restartBtnW = 300;
    let restartBtnH = 70;
    let restartBtnX = winX + winW / 2 - restartBtnW / 2;
    let restartBtnY = winY + winH - restartBtnH - 40;

    push();
    // 懸停效果
    if (mouseX > restartBtnX && mouseX < restartBtnX + restartBtnW &&
        mouseY > restartBtnY && mouseY < restartBtnY + restartBtnH) {
      fill(255, 255, 150, 220); // 亮黃色
    } else {
      fill(255, 255, 255, 180); // 白色
    }
    noStroke();
    rect(restartBtnX, restartBtnY, restartBtnW, restartBtnH, 15);

    fill(0);
    textSize(36);
    textAlign(CENTER, CENTER);
    text("重新開始遊戲", restartBtnX + restartBtnW / 2, restartBtnY + restartBtnH / 2);
    pop();

    return; // 暫停遊戲其他部分的繪製
  }
  isChar4Moving = false; // 每個 frame 重置移動狀態
  // 如果顯示星星能力視窗，暫停遊戲並繪製視窗
  if (showStarPowerupWindow) {
    // 繪製視窗
    let winW = 950; // 再加寬視窗，確保選項不換行
    let winH = 500; // 加高視窗
    let winX = width / 2 - winW / 2;
    let winY = height / 2 - winH / 2;

    // 答錯時的晃動特效
    if (showWrongAnswerEffect > 0) {
      winX += random(-5, 5);
      winY += random(-5, 5);
      showWrongAnswerEffect--;
    }

    push();
    fill(255);
    stroke(0);
    strokeWeight(4);
    rect(winX, winY, winW, winH, 20);
    pop();

    // 根據視窗狀態繪製不同內容
    if (mathWindowState === 'asking') {
      push();
      // 新增：顯示答對計分
      fill(100); // 深灰色
      noStroke();
      textAlign(CENTER, TOP);
      textSize(28);
      text(`已答對: ${questionsAnsweredCount} / 2`, winX + winW / 2, winY + 30);

      // 新增：在右下角繪製 DOOR.jpg
      if (doorImage) {
        let dH = 100; // 設定圖片高度
        let dW = (doorImage.width / doorImage.height) * dH; // 等比例計算寬度
        let dX = winX + winW - dW - 20;
        let dY = winY + winH - dH - 20;
        image(doorImage, dX, dY, dW, dH);

        // 如果已切換服裝，讓角色沿著邊邊走走停停
        if (isCostumeChanged) {
          // 根據狀態決定使用哪個動畫
          let currentAnimObj, currentFrames;
          if (char5State === 'walk') {
            currentAnimObj = char5WalkAnim;
            currentFrames = char5WalkFrames;
          } else {
            currentAnimObj = char5StandAnim;
            currentFrames = char5StandFrames;
          }

          let animFrame = floor((frameCount * animationSpeed) % currentAnimObj.totalFrames);
          let animImg = currentFrames[animFrame];
          let charScale = 2.5; // 調整大小以適應門的尺寸
          let cW = currentAnimObj.frameWidth * charScale;
          let cH = currentAnimObj.sheetHeight * charScale;
          
          // 定義地面高度
          let cGroundY = winY + winH - cH - 20;
          // 定義按鈕平台參數
          let btnX = winX + winW / 2 - 50;
          let btnY = winY + winH - 80;
          let btnW = 100;
          
          // 套用重力與更新 Y 軸 (讓角色可以跳躍)
          char5VelocityY += 0.8;
          char5WindowY += char5VelocityY;
          
          // 平台碰撞偵測 (讓角色可以站在按鈕上)
          let charCenterX = char5WindowX + cW / 2;
          // 如果正在下落，且角色中心點在按鈕範圍內
          if (char5VelocityY >= 0 && charCenterX > btnX && charCenterX < btnX + btnW) {
             // 檢查腳部是否剛好落在平台高度附近
             if (char5WindowY + cH >= btnY && char5WindowY + cH <= btnY + 20) {
                char5WindowY = btnY - cH; // 修正位置到按鈕上方
                char5VelocityY = 0;       // 停止下落
             }
          }

          // 地面碰撞偵測
          if (char5WindowY > cGroundY) {
            char5WindowY = cGroundY;
            char5VelocityY = 0;
          }
          
          // --- 狀態機邏輯 (走走停停) ---
          if (char5Timer > 0) {
            char5Timer--;
          } else {
            // 切換狀態
            if (char5State === 'walk') {
               char5State = 'idle';
               char5Timer = floor(random(20, 120)); // 不規律的休息時間 (約 0.3 ~ 2 秒)
            } else {
               char5State = 'walk';
               char5Timer = floor(random(40, 200)); // 不規律的行走時間 (約 0.6 ~ 3.3 秒)
               // 每次開始走動時，隨機決定方向
               if (random() > 0.5) char5VelocityX *= -1;
            }
          }

          if (char5State === 'walk') {
             // 更新位置 (只更新 X 軸)
             char5WindowX += char5VelocityX;
             
             // --- 跳躍邏輯 (遇到中間的按鈕障礙物) ---
             // 往右走遇到按鈕左邊
             if (char5VelocityX > 0 && char5WindowX + cW > btnX - 10 && char5WindowX < btnX) {
               if (char5WindowY >= cGroundY) char5VelocityY = -12;
             }
             // 往左走遇到按鈕右邊
             else if (char5VelocityX < 0 && char5WindowX < btnX + btnW + 10 && char5WindowX + cW > btnX + btnW) {
               if (char5WindowY >= cGroundY) char5VelocityY = -12;
             }
             
             // --- 左右來回走動邏輯 ---
             if (char5WindowX <= winX) {
                char5WindowX = winX;
                char5VelocityX = abs(char5VelocityX); // 碰到左邊往右
             } else if (char5WindowX >= winX + winW - cW) {
                char5WindowX = winX + winW - cW;
                char5VelocityX = -abs(char5VelocityX); // 碰到右邊往左
             }
          } else if (char5State === 'idle') {
             // 新增：停下時顯示答案氣泡
             push();
             let bubbleX = char5WindowX + cW / 2;
             let bubbleY = char5WindowY - 30;
             
             stroke(0);
             strokeWeight(2);
             fill(255);
             
             // 氣泡尾巴
             triangle(bubbleX - 8, bubbleY + 15, bubbleX + 8, bubbleY + 15, bubbleX, bubbleY + 30);
             
             // 氣泡本體
             rectMode(CENTER);
             rect(bubbleX, bubbleY, 60, 40, 10);
             
             // 遮蓋接縫線條
             noStroke();
             rect(bubbleX, bubbleY + 18, 14, 6);

             // 答案文字
             fill(255, 0, 0); // 紅色字體
             textAlign(CENTER, CENTER);
             textSize(24);
             textStyle(BOLD);
             text(mathProblem.answer, bubbleX, bubbleY);
             pop();
          }

          push();
          translate(char5WindowX + cW / 2, char5WindowY + cH / 2); // 移動到中心點以便翻轉
          
          // 更新面向 (只在有水平移動時改變)
          if (char5VelocityX > 0) char5Facing = 1; // 面向右
          if (char5VelocityX < 0) char5Facing = -1;  // 面向左
          
          scale(char5Facing, 1);
          imageMode(CENTER);
          image(animImg, 0, 0, cW, cH);
          pop();
        }
      }

      // 視窗內容 - 數學問題
      fill(0);
      noStroke();
      
      // 根據題目類型調整顯示方式
      if (mathProblem.type === 'chinese') {
        textAlign(LEFT, TOP);
        textSize(22); // 稍微縮小字體以容納單行選項
        text(mathProblem.question, winX + 40, winY + 60, winW - 80, winH - 200); // 調整文字區域，預留底部空間給輸入框和按鈕
      } else {
        textAlign(CENTER, CENTER);
        textSize(48);
        text(mathProblem.question, winX + winW / 2, winY + winH / 3);
      }

      // 建立或定位輸入框
      if (!mathAnswerInput) {
        // 如果是國文題，不限制輸入類型；數學題限制為數字
        mathAnswerInput = createInput('', mathProblem.type === 'chinese' ? 'text' : 'number');
        mathAnswerInput.style('font-size', '24px');
        mathAnswerInput.style('background', 'rgba(0,0,0,0.1)');
        mathAnswerInput.style('border', '2px solid black');
        mathAnswerInput.style('text-align', 'center');
        mathAnswerInput.elt.focus();
      }
      // 調整輸入框位置
      let inputY = (mathProblem.type === 'chinese') ? winY + winH - 140 : winY + winH / 2;
      mathAnswerInput.position(winX + winW / 2 - 75, inputY);
      mathAnswerInput.size(150, 40);

      // 確定按鈕
      let btnX = winX + winW / 2 - 50;
      let btnY = winY + winH - 80; // 按鈕固定在視窗底部
      let btnW = 100;
      let btnH = 40;
      fill(100);
      rect(btnX, btnY, btnW, btnH, 10);
      fill(255);
      textSize(20);
      text("確定", winX + winW / 2, btnY + btnH / 2);
      pop();
    } else if (mathWindowState === 'correct') {
      push();
      // 答對畫面
      fill(0, 150, 0); // 綠色
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(48);
      text("答對了!", winX + winW / 2, winY + winH / 2 - 20);

      // 繼續按鈕
      let btnX = winX + winW / 2 - 50;
      let btnY = winY + winH - 80;
      let btnW = 100;
      let btnH = 40;
      fill(100);
      rect(btnX, btnY, btnW, btnH, 10);
      fill(255);
      textSize(20);
      text("繼續", winX + winW / 2, btnY + btnH / 2);
      pop();
    } else if (mathWindowState === 'instruction') {
      push();
      // 指示畫面
      fill(0);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(48);
      text("按下空白鍵攻擊", winX + winW / 2, winY + winH / 2 - 60); // 向上移動文字

      // --- 新增：繪製攻擊循環動畫 ---
      let animFrame = floor((frameCount * animationSpeed) % punchAnim.totalFrames);
      let animImage = punchFrames[animFrame];
      let animW = punchAnim.frameWidth * scaleFactor;
      let animH = punchAnim.sheetHeight * scaleFactor;
      imageMode(CENTER);
      image(animImage, winX + winW / 2, winY + winH / 2 + 20, animW, animH);
      // --- 動畫結束 ---

      // 確定按鈕
      let btnX = winX + winW / 2 - 50;
      let btnY = winY + winH - 80;
      let btnW = 100;
      let btnH = 40;
      fill(100);
      rect(btnX, btnY, btnW, btnH, 10);
      fill(255);
      textSize(20);
      text("確定", winX + winW / 2, btnY + btnH / 2);
      pop();
    } else if (mathWindowState === 'incorrect') {
      push();
      // 答錯畫面
      fill(200, 0, 0); // 紅色
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(48);
      text("答錯了!", winX + winW / 2, winY + winH / 2 - 20);

      // 再試一次按鈕
      let btnX = winX + winW / 2 - 60;
      let btnY = winY + winH - 80;
      let btnW = 120;
      let btnH = 40;
      fill(100);
      rect(btnX, btnY, btnW, btnH, 10);
      fill(255);
      textSize(20);
      text("確定", winX + winW / 2, btnY + btnH / 2);
      pop();
    } else if (mathWindowState === 'retry_instruction') {
      push();
      // 提示畫面
      fill(0);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(30);
      // 顯示提示文字
      text("繼續吃星星\n來攻擊瓦豆魯迪", winX + winW / 2, winY + winH / 2 - 30);

      // 確定按鈕
      let btnX = winX + winW / 2 - 50;
      let btnY = winY + winH - 80;
      let btnW = 100;
      let btnH = 40;
      fill(100);
      rect(btnX, btnY, btnW, btnH, 10);
      fill(255);
      textSize(20);
      text("確定", winX + winW / 2, btnY + btnH / 2);
      pop();
    }

    return; // 暫停遊戲
  }

  // --- 頭像與轉場動畫計時 (全域) ---
  if (millis() - lastIconSwitchTime > iconSwitchInterval) {
    dialogIconFrame = (dialogIconFrame + 1) % 2; // 0 與 1 之間切換
    lastIconSwitchTime = millis();
  }

  // --- 鏡頭與背景更新 ---
  // 讓鏡頭跟隨角色，並保持角色在畫面中央
  if (!isBattleMode || p2HP <= 0) {
    cameraOffsetX = width / 2 - characterX;
  } else {
    // 戰鬥模式下，背景微幅跟隨角色 (例如 0.2 倍)
    cameraOffsetX = (width / 2 - characterX) * 0.2;
  }

  // --- 無縫背景繪製 ---
  // 計算起始繪製位置，使用 modulo 運算子達成無限循環
  
  // 修改：針對背景3進行等比例縮放，避免變形
  let bgDrawWidth = bgImage.width;
  let bgDrawHeight = height;
  
  if (bgImage === bg3Image) {
    // 計算縮放比例，讓高度填滿畫面，寬度等比例調整
    let scaleRatio = height / bgImage.height;
    bgDrawWidth = bgImage.width * scaleRatio;
  }

  // 我們的圖案現在是由一張正常和一張翻轉的圖片組成，所以寬度是兩倍
  const patternWidth = bgDrawWidth * 2;
  const startX = cameraOffsetX % patternWidth;

  // 使用迴圈確保背景圖片能填滿整個畫面
  for (let i = -2; (i * bgDrawWidth) + startX < width; i++) {
    const currentX = i * bgDrawWidth + startX;
    if (Math.abs(i) % 2 === 0) { // 偶數索引的圖片 (..., -2, 0, 2, ...) 正常繪製
      image(bgImage, currentX, 0, bgDrawWidth, bgDrawHeight);
    } else { // 奇數索引的圖片 (..., -1, 1, 3, ...) 水平翻轉繪製
      push();
      scale(-1, 1); // 水平翻轉畫布
      image(bgImage, -currentX - bgDrawWidth, 0, bgDrawWidth, bgDrawHeight);
      pop();
    }
  }

  // 新增：在背景3顯示右側圖片
  if (bgImage === bg3Image) {
    push();
    let imgX = width * 0.8; // 設定在畫面右側
    let imgY = groundLevel - 200; // 修改：再降低高度
    translate(cameraOffsetX, 0); // 跟隨鏡頭移動
    image(bg3RightImage, imgX, imgY);
    pop();
  }

  // --- 繪製地洞 (僅在勝利後顯示) ---
  if (p2HP <= 0 && bgImage !== unnamedImage && bgImage !== bg3Image) {
    // 繪製交通錐
    const coneWidth = 200;
    const coneHeight = (coneImage.height / coneImage.width) * coneWidth;
    const coneYOffset = 80; // 往下移動的距離
    image(coneImage, holeX + cameraOffsetX - coneWidth, groundLevel - coneHeight + coneYOffset, coneWidth, coneHeight);
    image(coneImage, holeX + cameraOffsetX + holeWidth, groundLevel - coneHeight + coneYOffset, coneWidth, coneHeight);


    push();
    noStroke();
    // 洞的深度 (黑色)
    fill(0);
    rect(holeX + cameraOffsetX, groundLevel, holeWidth, height - groundLevel);
    // 洞口的邊緣 (深灰色)
    fill(50);
    ellipse(holeX + cameraOffsetX + holeWidth / 2, groundLevel, holeWidth, 40);
    // 洞口的內部 (黑色，蓋在邊緣上，形成環狀)
    fill(0);
    ellipse(holeX + cameraOffsetX + holeWidth / 2, groundLevel, holeWidth - 10, 30);
    pop();
  }

  // --- 標題畫面 ---
  if (isTitleScreen) {
    // 繪製像素風動態星空與夜色遮罩
    push();
    // 建立漸層背景：從深藍色到帶有粉紫色的夜空
    let topColor = color(20, 24, 82); // 上方：原本的深藍色
    let bottomColor = color(100, 50, 90); // 下方：帶有粉色感的紫夜
    
    for (let y = 0; y < height; y++) {
      let n = map(y, 0, height, 0, 1);
      let newc = lerpColor(topColor, bottomColor, n);
      stroke(newc);
      line(0, y, width, y);
    }
    noStroke(); // 關閉邊框以繪製星星
    
    // 繪製星星
    for (let star of introStars) {
      let c = star.color;
      fill(red(c), green(c), blue(c), star.alpha);
      if (star.size > 7) {
        push();
        // 新增：為大星星添加光暈效果
        drawingContext.shadowBlur = 25; // 設定光暈的模糊程度
        drawingContext.shadowColor = color(red(c), green(c), blue(c), star.alpha).toString(); // 光暈顏色跟隨星星顏色與透明度
        drawStar(star.x, star.y, star.size * 0.4, star.size, 5);
        pop();
      } else {
        rect(star.x, star.y, star.size, star.size);
      }
      
      // 星星閃爍邏輯
      star.alpha += star.blinkSpeed;
      if (star.alpha > 255 || star.alpha < 50) {
        star.blinkSpeed *= -1;
      }
    }

    // --- 流星效果 ---
    if (random() < 0.015) { // 約 1.5% 機率生成流星
      meteors.push({
        x: random(width * 0.3, width + 100), // 主要從畫面右側或中間生成
        y: random(-50, height * 0.4), // 從上方生成
        size: random(2, 4),
        speedX: random(-15, -25), // 快速向左
        speedY: random(10, 18),   // 快速向下
        alpha: 255
      });
    }

    for (let i = meteors.length - 1; i >= 0; i--) {
      let m = meteors[i];
      stroke(255, 255, 220, m.alpha); // 微黃白色
      strokeWeight(m.size);
      // 繪製流星軌跡 (尾巴)
      line(m.x, m.y, m.x - m.speedX * 3, m.y - m.speedY * 3);
      
      m.x += m.speedX;
      m.y += m.speedY;
      m.alpha -= 4; // 漸漸消失

      if (m.x < -100 || m.y > height + 100 || m.alpha <= 0) {
        meteors.splice(i, 1);
      }
    }
    pop();

    // --- 標題轉場動畫 (點擊開始後) ---
    if (isTitleTransitioning) {
      // 1. 角色掉落邏輯
      titleFallVelocity += 0.5; // 重力
      titleFallY += titleFallVelocity;

      // 繪製掉落的角色
      push();
      imageMode(CENTER);
      // 假設圖片是像素風，放大顯示以保持風格一致
      let fallScale = 2; 
      image(titleFallImage, titleFallX, titleFallY, titleFallImage.width * fallScale, titleFallImage.height * fallScale);
      pop();

      // 2. 螢幕漸暗邏輯
      fadeAlpha += 4; // 漸暗速度
      fill(0, fadeAlpha);
      rect(0, 0, width, height);

      // 3. 轉場結束判定
      if (fadeAlpha >= 255) {
        isTitleScreen = false;
        isTitleTransitioning = false;
        isFadingIn = true; // 設定為 true，讓下一幕 (睡覺畫面) 從全黑漸亮顯示
        
        // 新增：設定掉落入場參數
        isFallingEntrance = true;
        titleFallX = characterX; // 設定掉落 X 為角色位置
        titleFallY = -100; // 從畫面外上方開始掉落
        titleFallVelocity = 0;
      }
      return; // 轉場時不繪製按鈕與 LOGO
    }

    // --- 繪製標題動畫 (LOGO) ---
    let logoFrameIndex = floor(frameCount * 0.08) % titleLogoAnim.totalFrames;
    let logoImg = titleLogoFrames[logoFrameIndex];
    // 放大顯示
    let logoScale = 2; 
    let logoW = titleLogoAnim.frameWidth * logoScale;
    let logoH = titleLogoAnim.sheetHeight * logoScale;
    
    // 新增：前後擺動效果 (旋轉) 與 左右搖擺 (位移)
    let swingAngle = -sin(frameCount * 0.05) * 0.15; // 改為負數，起始往左
    let swingX = -sin(frameCount * 0.05) * 30; // 改為負數，起始往左

    push();
    imageMode(CENTER);
    translate(width / 2 + swingX, height / 2 - 50); // 設定旋轉中心並加入左右位移
    rotate(swingAngle); // 執行旋轉
    image(logoImg, 0, 0, logoW, logoH); // 繪製在中心點
    pop();

    // --- 繪製開始遊戲按鈕 ---
    const startBtnW = 450; // 加寬以容納文字
    const startBtnH = 80;  // 增加點擊範圍高度
    const startBtnX = width / 2 - startBtnW / 2;
    const startBtnY = height - 150; // 改到下面

    push();
    textSize(60); // 字體變大
    textStyle(BOLD);
    textAlign(CENTER, CENTER);

    if (mouseX > startBtnX && mouseX < startBtnX + startBtnW && 
        mouseY > startBtnY && mouseY < startBtnY + startBtnH) {
      fill(255, 255, 200); // 懸停時變亮黃色
    } else {
      fill(255); // 平常是白色
    }
    
    noStroke(); // 移除字的邊框
    
    text("按下空白鍵開始", width / 2, startBtnY + startBtnH / 2);
    pop();

    // --- 繪製跳過戰鬥按鈕 ---
    const btnW = 60;
    const btnH = 60;
    const btnX = 50; // 改到左下角
    const btnY = height - 100;
    const bobOffset = sin(frameCount * 0.1) * 5;
    push();
    fill(255, 220);
    stroke(0);
    strokeWeight(3);
    textSize(60);
    textAlign(CENTER, CENTER);
    text("⬇", btnX + btnW / 2, btnY + btnH / 2 + bobOffset);
    pop();

    drawFadeEffect();
    return;
  }

  // --- 遊戲開始前的睡覺狀態 ---
  if (!isGameStarted) {
    // 新增：掉落入場動畫 (0.png 落到定位)
    if (isFallingEntrance) {
      titleFallVelocity += 1.5; // 重力加速度
      titleFallY += titleFallVelocity;
      
      // 地面碰撞偵測
      if (titleFallY >= groundLevel) {
        titleFallY = groundLevel;
        isFallingEntrance = false; // 落地後結束掉落狀態，顯示角色1
      }

      push();
      // 計算畫面位置 (需考慮鏡頭位移)
      let screenX = titleFallX + cameraOffsetX;
      translate(screenX, titleFallY);
      imageMode(CENTER);
      let fallScale = scaleFactor; // 使用遊戲中的縮放比例 (3倍)
      image(titleFallImage, 0, 0, titleFallImage.width * fallScale, titleFallImage.height * fallScale);
      pop();
      
      drawFadeEffect();
      return; // 掉落時不執行後續的睡覺/起床邏輯
    }

    // 如果正在起床
    if (isWakingUp) {
      // 增加跳躍物理效果
      velocityY += gravity;
      characterY += velocityY;

      // 地面碰撞
      if (characterY >= groundLevel) {
        characterY = groundLevel;
        velocityY = 0;
      }

      currentFrame += animationSpeed;
      
      // 檢查起床動畫是否播放完畢
      if (currentFrame >= wakeAnim.totalFrames) {
        isWakingUp = false;
        isGameStarted = true; // 正式開始遊戲
        currentFrame = 0;
        return;
      }

      const displayWidth = wakeAnim.frameWidth * scaleFactor;
      const displayHeight = wakeAnim.sheetHeight * scaleFactor;
      push();
      translate(characterX + cameraOffsetX, characterY);
      image(wakeFrames[floor(currentFrame)], -displayWidth / 2, -displayHeight / 2, displayWidth, displayHeight);
      pop();
      return;
    }

    // 播放睡覺動畫
    currentFrame = (currentFrame + animationSpeed * 0.5) % sleepAnim.totalFrames; // 讓睡覺動畫慢一點
    
    const displayWidth = sleepAnim.frameWidth * scaleFactor;
    const displayHeight = sleepAnim.sheetHeight * scaleFactor;
    
    push();
    const characterScreenX = characterX + cameraOffsetX;
    translate(characterScreenX, characterY);
    image(sleepFrames[floor(currentFrame)], -displayWidth / 2, -displayHeight / 2, displayWidth, displayHeight);
    pop();

    // 顯示開始提示文字
    // 只有當漸亮動畫結束後 (isFadingIn 為 false) 才顯示文字
    if (!isFadingIn) {
      push();
      textAlign(CENTER, TOP);
      textSize(48);
      textStyle(BOLD);
      fill(255);
      stroke(0);
      strokeWeight(5);
      text("按下空格鍵開始", width / 2, 100);
      pop();
    }

    drawFadeEffect();
    return; // 暫停後續的遊戲邏輯
  }

  let anim, frames, currentAnimType;

  // --- 定義實體障礙物 (水管) ---
  let pipeObstacle = null;
  isOnPipe = false; // 新增：判斷是否站在水管上
  // 只有在角色3被打敗且圖片存在時才計算碰撞
  if (p2HP <= 0 && dialogueTexts === char3Dialogues && char3DefeatImage && bgImage === unnamedImage) {
     let dScale = scaleFactor;
     let dW = char3DefeatImage.width * dScale;
     let dH = char3DefeatImage.height * dScale;
     let groundY = groundLevel - 90; // 與繪製時的地面高度一致
     let pipeX = char3X + 800; // 與繪製時的 X 座標一致
     
     pipeObstacle = {
       left: pipeX - dW / 2,
       right: pipeX + dW / 2,
       top: groundY - dH,
       bottom: groundY
     };
  }
  
  // 新增：背景3的實體障礙物 (Gemini圖片)
  if (bgImage === bg3Image && bg3RightImage) {
    let imgX = width * 0.8; 
    let imgY = groundLevel - 200; // 修改：與繪製位置同步
    
    pipeObstacle = {
       left: imgX + 10, // 碰撞框稍微內縮，避免卡在邊緣
       right: imgX + bg3RightImage.width - 10,
       top: imgY + 20, // 碰撞面稍微降低，讓角色看起來自然地站在物體上
       bottom: imgY + bg3RightImage.height - 20 // 修改：底部碰撞範圍微調，讓視覺更貼近圖片底部
    };
  }

  // 處理跳躍邏輯
  // 1. 套用重力
  velocityY += gravity;
  characterY += velocityY;

  // 新增：實體障礙物底部碰撞 (頂頭)
  if (pipeObstacle) {
    let charHalfW = 20; // 判定寬度
    if (characterX + charHalfW > pipeObstacle.left && characterX - charHalfW < pipeObstacle.right) {
      let headY = characterY - 60; // 修改：頭部判定點微調，對應角色視覺上的頭頂
      // 如果正在上升 且 頭部碰到底部 且 頭部還在頂部下方 (避免誤判站在上面的情況)
      if (velocityY < 0 && headY <= pipeObstacle.bottom && headY > pipeObstacle.top) {
        velocityY = 5; // 修改：撞到頭，給予明顯的向下速度 (反彈感)
        characterY = pipeObstacle.bottom + 60; // 修正位置，讓頭頂剛好切齊障礙物底部
        
        // 新增：頂到障礙物冒出金幣
        coins.push({
          x: pipeObstacle.left + (pipeObstacle.right - pipeObstacle.left) / 2,
          y: pipeObstacle.top - 30,
          vx: random(-2, 2), // 隨機左右噴出
          vy: -12, // 向上彈出
          state: 'active'
        });
      }
    }
  }

  // 2. 簡易的地面碰撞偵測
  let currentGroundLevel = groundLevel;
  // 在 unnamed.jpg 場景中，讓角色站的位置高一點
  if (bgImage === unnamedImage) {
    currentGroundLevel = groundLevel - 130;
  }

  // 檢查是否在地洞上方 (僅在勝利後生效)
  let isOverHole = false;
  if (p2HP <= 0 && bgImage !== unnamedImage && bgImage !== bg3Image) {
    isOverHole = (characterX > holeX && characterX < holeX + holeWidth);
  }
  
  if (characterY >= currentGroundLevel && !isOverHole) {
    characterY = currentGroundLevel; // 將角色放回地面
    velocityY = 0;
    isJumping = false;
  }

  // --- 實體障礙物垂直碰撞 (站在水管上) ---
  if (pipeObstacle) {
    // 判斷角色是否在水管的水平範圍內 (稍微寬容一點)
    if (characterX > pipeObstacle.left + 10 && characterX < pipeObstacle.right - 10) {
      // 判斷是否從上方落下並接觸到頂部
      if (velocityY >= 0 && characterY >= pipeObstacle.top && characterY <= pipeObstacle.top + 20) {
        characterY = pipeObstacle.top;
        velocityY = 0;
        isJumping = false;
      }
      
      // 新增：檢查是否穩定站在水管上
      if (abs(characterY - pipeObstacle.top) < 1) {
        isOnPipe = true;
      }
    }
  }
  
  // 新增：掉進洞裡觸發轉場
  if (characterY > height + 100 && !hasFallenTransitionDone) { // 角色完全掉出畫面下方
    isFallingDownHole = true;
  }

  // 3. 檢查跳躍鍵
  if (keyIsDown(UP_ARROW) && !isJumping && !isWaitingForInput && p1HP > 0) {
    velocityY = jumpPower;
    isJumping = true;
  }

  // 根據角色狀態決定動畫和移動
  if (p1HP <= 0) {
    anim = dieAnim;
    frames = dieFrames;
    currentAnimType = 'die';
    
    // 讓死亡動畫只播放一次並停在最後一幀
    if (currentFrame < dieAnim.totalFrames - 1) {
      currentFrame += animationSpeed;
    } else {
      currentFrame = dieAnim.totalFrames - 1;
    }
  } else if (isCorrectAnswer) {
    anim = wakeAnim; // 借用起床動畫示意開心
    frames = wakeFrames;
    currentAnimType = 'correct';

    currentFrame += animationSpeed;
    if (currentFrame >= wakeAnim.totalFrames) {
      isCorrectAnswer = false;
      currentFrame = 0;
      // 動畫結束後造成傷害
      p2HP -= 2.5; // 造成 2.5 傷害
      if (p2HP < 0) p2HP = 0;
      punchUnlocked = true; // 解鎖拳擊攻擊
      
      // 新增：如果是角色3戰鬥，標記問答已完成
      if (dialogueTexts === char3Dialogues) {
        isChar3QuizCompleted = true;
      }
      // 新增：如果是角色4戰鬥，標記問答已完成
      if (dialogueTexts === char4Dialogues) {
        isChar4QuizCompleted = true;
      }
    }
  } else if (isEatingStar) {
    anim = eatAnim;
    frames = eatFrames;
    currentAnimType = 'eat';

    // 播放一次的動畫邏輯
    currentFrame += animationSpeed;
    if (currentFrame >= eatAnim.totalFrames) {
      isEatingStar = false; // 結束吃星星狀態
      totalQuestions++; // 增加總問題數
      questionsAnsweredCount = 0; // 重置回答計數
      isCostumeChanged = false; // 重置角色5狀態，確保每次開始答題時都需要點擊
      
      // 判斷對手是誰來決定題目
      if (dialogueTexts === char3Dialogues) {
        // const q = random(chineseQuestions);
        // mathProblem = { question: q.q, answer: q.a, type: 'chinese' };
        questionPool = [...chineseQuestions]; // 複製一份題庫
        shuffle(questionPool, true); // 打亂順序
        const q = questionPool.pop(); // 取出一個問題
        mathProblem = { question: q.q, answer: q.a, type: 'chinese' };
      } else if (dialogueTexts === char4Dialogues) {
        // const q = random(englishQuestions);
        // mathProblem = { question: q.q, answer: q.a, type: 'chinese' };
        questionPool = [...englishQuestions]; // 複製一份題庫
        shuffle(questionPool, true); // 打亂順序
        const q = questionPool.pop(); // 取出一個問題
        mathProblem = { question: q.q, answer: q.a, type: 'chinese' };
      } else {
        const num1 = floor(random(1, 10));
        const num2 = floor(random(1, 10));
        mathProblem = { question: `${num1} + ${num2} = ?`, answer: num1 + num2, type: 'math' };
      }
      mathWindowState = 'asking'; // 設定視窗狀態為提問
      showStarPowerupWindow = true; // 顯示數學問題視窗
      currentFrame = 0;
    }
  } else if (isPunching) {
    // 判斷場景，如果是場景2 (unnamedImage)，使用新的攻擊動畫
    if (bgImage === unnamedImage) {
      anim = punch2Anim;
      frames = punch2Frames;
    } else {
      anim = punchAnim;
      frames = punchFrames;
    }
    currentAnimType = 'punch';

    // 播放一次的動畫邏輯
    currentFrame += animationSpeed;
    if (currentFrame >= anim.totalFrames) {
      // 動畫播放完畢
      isPunching = false; // 結束攻擊狀態
      currentFrame = 0;
    }

  } else if (isRushing) {
    anim = rushAnim;
    frames = rushFrames;
    currentAnimType = 'rush';

    // 衝刺時移動，速度加快
    const rushSpeed = moveSpeed * 3.5; // 速度是平常的 3.5 倍
    characterX += rushSpeed * facingDirection;

    // 播放一次的動畫邏輯
    currentFrame += animationSpeed; // 恢復正常動畫播放速度
    if (currentFrame >= rushAnim.totalFrames) {
      isRushing = false; // 結束衝刺狀態
      currentFrame = 0;
    }

  } else if (isJumping) {
    anim = jumpAnim;
    frames = jumpFrames;
    currentAnimType = 'jump';
    // 在空中時，左右移動速度可以減慢一些（可選）
    if (keyIsDown(RIGHT_ARROW)) {
      let nextX = characterX + moveSpeed * 0.8;
      // 新增：空中水平碰撞偵測 (向右)
      if (pipeObstacle) {
        let charHalfW = (anim.frameWidth * scaleFactor) / 3;
        if (characterY > pipeObstacle.top && characterY - 60 < pipeObstacle.bottom && characterX + charHalfW <= pipeObstacle.left && nextX + charHalfW > pipeObstacle.left) {
           nextX = pipeObstacle.left - charHalfW;
        }
      }
      characterX = nextX;
      facingDirection = 1; // 在空中時也要更新方向
    }
    if (keyIsDown(LEFT_ARROW)) {
      let nextX = characterX - moveSpeed * 0.8;
      // 新增：空中水平碰撞偵測 (向左)
      if (pipeObstacle) {
        let charHalfW = (anim.frameWidth * scaleFactor) / 3;
        if (characterY > pipeObstacle.top && characterY - 60 < pipeObstacle.bottom && characterX - charHalfW >= pipeObstacle.right && nextX - charHalfW < pipeObstacle.right) {
           nextX = pipeObstacle.right + charHalfW;
        }
      }
      characterX = nextX;
      facingDirection = -1; // 在空中時也要更新方向
    }
  } else {
    // --- 地面移動邏輯 (僅走路) ---
    let currentMoveSpeed = moveSpeed;
    let isMoving = false;

    anim = rightAnim; // 預設為走路動畫
    frames = rightFrames;

    if (keyIsDown(RIGHT_ARROW)) { // 按下右鍵
      let nextX = characterX + currentMoveSpeed;
      // --- 實體障礙物水平碰撞 (向右) ---
      if (pipeObstacle) {
        let charHalfW = (anim.frameWidth * scaleFactor) / 3; // 新增：考慮角色寬度
        // 如果角色高度低於水管頂部 (即會撞到側面)，且嘗試進入水管範圍
        if (characterY > pipeObstacle.top && characterY - 60 < pipeObstacle.bottom && characterX + charHalfW <= pipeObstacle.left && nextX + charHalfW > pipeObstacle.left) {
          nextX = pipeObstacle.left - charHalfW; // 擋在左側
        }
      }
      characterX = nextX;
      facingDirection = 1;
      isMoving = true;
      currentAnimType = 'right';
    } else if (keyIsDown(LEFT_ARROW)) { // 按下左鍵
      let nextX = characterX - currentMoveSpeed;
      // --- 實體障礙物水平碰撞 (向左) ---
      if (pipeObstacle) {
        let charHalfW = (anim.frameWidth * scaleFactor) / 3; // 新增：考慮角色寬度
        if (characterY > pipeObstacle.top && characterY - 60 < pipeObstacle.bottom && characterX - charHalfW >= pipeObstacle.right && nextX - charHalfW < pipeObstacle.right) {
          nextX = pipeObstacle.right + charHalfW; // 擋在右側
        }
      }
      characterX = nextX;
      facingDirection = -1;
      isMoving = true;
      currentAnimType = 'left';
    } else {
      anim = defaultAnim;
      frames = defaultFrames;
      currentAnimType = 'default';
    }
  }

  // 如果動畫類型發生了變化，就重置 currentFrame
  if (currentAnimType !== lastAnimType) {
    // 這確保了切換動畫時，新的動畫會從第一幀開始播放
    currentFrame = 0;
  }
  lastAnimType = currentAnimType;

  // 只有在不是攻擊動畫時，才使用循環播放的邏輯
  if (!isPunching && !isRushing && !isEatingStar && !isCorrectAnswer && p1HP > 0) { // 走路動畫是循環的，其他為一次性動畫
    currentFrame = (currentFrame + animationSpeed) % anim.totalFrames;
  }

  // 限制角色在戰鬥模式下的移動範圍
  if (isBattleMode && p2HP > 0) {
    const boundaryMargin = 50; // 允許超出邊界一點點
    characterX = constrain(characterX, -boundaryMargin, width + boundaryMargin);
  }

  // 計算放大後的寬度和高度
  let currentScale = scaleFactor;
  if (currentAnimType === 'die') {
    currentScale = scaleFactor * 0.8; // 死亡時縮小一點，避免被裁切
  }
  
  // 預設寬高
  let displayWidth = anim.frameWidth * currentScale;
  let displayHeight = anim.sheetHeight * currentScale;
  
  // 判斷是否要顯示死亡最終圖，如果是，使用該圖片的尺寸
  const showDieFinal = (currentAnimType === 'die' && currentFrame >= dieAnim.totalFrames - 1);

  // --- 新增：繪製角色4戰敗後的掉落物 ---
  if (isChar4DefeatItemFalling && char4DefeatItemImage) {
    // 物理邏輯
    char4DefeatItemVy += gravity;
    char4DefeatItemY += char4DefeatItemVy;

    // 地面碰撞
    let groundY = currentGroundLevel;
    const itemScale = 0.3; // 寶箱縮放比例
    const imageToDraw = isChestOpened ? openedChestImage : char4DefeatItemImage;
    const itemHeight = imageToDraw.height * itemScale;
    const finalY = groundY - itemHeight / 2 + 80; // 寶箱最終Y座標

    if (char4DefeatItemY > finalY) {
      char4DefeatItemY = finalY;
      char4DefeatItemVy = 0;
    }

    // 繪製
    const itemWidth = imageToDraw.width * itemScale;
    push();
    let itemScreenX = char4DefeatItemX + cameraOffsetX;
    imageMode(CENTER);
    image(imageToDraw, itemScreenX, char4DefeatItemY, itemWidth, itemHeight);
    pop();

    // 新增：靠近寶箱時顯示驚嘆號
    if (!isChestOpened && dist(characterX, characterY, char4DefeatItemX, char4DefeatItemY) < 150) {
      const pulse = sin(frameCount * 0.1) * 5;
      const markY = char4DefeatItemY - itemHeight / 2 - 40 + pulse;

      push();
      stroke(255);
      strokeWeight(4 + abs(pulse) / 2);
      fill(255, 255, 0); // 黃色驚嘆號
      textSize(50);
      textAlign(CENTER, CENTER);
      text("!", itemScreenX, markY);
      pop();
    }

  }

  // 繪製角色
  push(); // 儲存當前繪圖狀態，以便進行局部變換
  // 將角色的 "世界位置" 轉換為 "畫面位置"
  const characterScreenX = characterX + cameraOffsetX;
  translate(characterScreenX, characterY); // 將原點移動到角色的畫面位置

  if (facingDirection === -1) {
    scale(-1, 1); // 水平翻轉圖片
  }
  
  if (showDieFinal) {
    // 繪製死亡後的靜態圖片 (5.png)
    // 使用圖片原始比例並套用縮放
    image(dieFinalImage, -dieFinalImage.width * currentScale / 2, -dieFinalImage.height * currentScale / 2, dieFinalImage.width * currentScale, dieFinalImage.height * currentScale);
  } else {
    // 繪製當前幀的圖片，因為原點已移動到角色中心，所以繪製位置為 (-displayWidth/2, -displayHeight/2)
    image(frames[floor(currentFrame)], -displayWidth / 2, -displayHeight / 2, displayWidth, displayHeight);
  }
  pop(); // 恢復之前的繪圖狀態

  // --- 繪製第二個角色 ---
  let newCharCurrentAnim, newCharCurrentFrames;

  if (showDialog) {
    // 如果正在對話，使用說話動畫
    newCharCurrentAnim = newCharTalkAnim;
    newCharCurrentFrames = newCharTalkFrames;
    newCharCurrentFrame = (newCharCurrentFrame + newCharAnimationSpeed) % newCharCurrentAnim.totalFrames;
  } else if (isBattleMode) {
    // 如果在戰鬥模式，角色2會追擊玩家
    
    // 新增：判斷敵人是誰，如果是角色3 (神秘人物)
    if (dialogueTexts === char3Dialogues) {
      // 為了防止後面計算 newCharDisplayWidth 出錯，先給定預設值
      newCharCurrentAnim = newCharAnim;
      newCharCurrentFrames = newCharFrames;

      if (p2HP > 0 && p1HP > 0) {
        if (!isEatingStar) {
          const enemySpeed = 3;
          const attackRange = 60;
          
          // 如果正在攻擊，等待動畫結束，不移動也不重複攻擊
          if (isChar3Attacking) {
            // Do nothing
          } else if (dist(char3X, char3Y, characterX, characterY) > attackRange) {
            // 移動邏輯
            if (char3X > characterX) char3X -= enemySpeed;
            else char3X += enemySpeed;
          } else {
            // 攻擊邏輯：原地攻擊，不跳躍
            isChar3Attacking = true;
            p2HasHit = false; // 重置攻擊判定
            char3CurrentFrame = 0; // 重置動畫幀以播放攻擊動畫
          }
        }
      }
    } else if (dialogueTexts === char4Dialogues) {
      // 為了防止後面計算 newCharDisplayWidth 出錯，先給定預設值
      newCharCurrentAnim = newCharAnim;
      newCharCurrentFrames = newCharFrames;

      // 新增：角色4 AI 邏輯
      if (p2HP > 0 && p1HP > 0) {
        if (!isEatingStar) {
          const enemySpeed = 3;
          const attackRange = 60;
          
          // 簡單的追蹤邏輯
          if (isChar4Attacking) {
            // 如果正在攻擊，等待動畫結束
          } else if (dist(char4X, char4Y, characterX, characterY) > attackRange) {
            if (char4X > characterX) char4X -= enemySpeed;
            else char4X += enemySpeed;
            isChar4Moving = true; // 設定為正在移動
          } else {
             // 進入攻擊範圍，觸發攻擊
             isChar4Attacking = true;
             char4CurrentFrame = 0;
             p2HasHit = false; // 重置攻擊判定
          }
        }
      }
    } else {
      // 原有的角色2 AI 邏輯
    
    // 檢查是否死亡
    if (p2HP <= 0) {
      newCharCurrentAnim = newCharDieAnim;
      newCharCurrentFrames = newCharDieFrames;
      // 讓死亡動畫只播放一次並停在最後一幀
      if (newCharCurrentFrame < newCharCurrentAnim.totalFrames - 1) {
        newCharCurrentFrame += newCharAnimationSpeed;
      } else {
        newCharCurrentFrame = newCharCurrentAnim.totalFrames - 1;
      }
    } else if (p1HP <= 0) {
      newCharCurrentAnim = newCharVictoryAnim;
      newCharCurrentFrames = newCharVictoryFrames;
      newCharCurrentFrame = (newCharCurrentFrame + newCharAnimationSpeed) % newCharCurrentAnim.totalFrames;
    } else {
      // 如果角色1正在吃星星，角色2停止行動
      if (isEatingStar) {
        newCharCurrentAnim = newCharAnim;
        newCharCurrentFrames = newCharFrames;
        newCharCurrentFrame = 0;
      } else {
      const enemySpeed = 3; // 敵人移動速度
      const attackRange = 80; // 攻擊距離

      // 如果正在攻擊，優先處理攻擊動畫直到播放完畢
      if (isNewCharAttacking) {
        newCharCurrentAnim = newCharAttackAnim;
        newCharCurrentFrames = newCharAttackFrames;
        newCharCurrentFrame += newCharAnimationSpeed;
        
        // 檢查動畫是否結束
        if (newCharCurrentFrame >= newCharCurrentAnim.totalFrames) {
          isNewCharAttacking = false;
          newCharCurrentFrame = 0;
        }
      } else {
        // 如果距離大於攻擊範圍，就移動
        if (dist(newCharX, newCharY, characterX, characterY) > attackRange) {
          newCharCurrentAnim = newCharWalkAnim;
          newCharCurrentFrames = newCharWalkFrames;

          if (newCharX > characterX) newCharX -= enemySpeed;
          else newCharX += enemySpeed;
          // 移動時播放動畫
          newCharCurrentFrame = (newCharCurrentFrame + newCharAnimationSpeed) % newCharCurrentAnim.totalFrames;
        } else {
          // 進入攻擊範圍，觸發攻擊
          isNewCharAttacking = true;
          newCharCurrentFrame = 0;
          newCharCurrentAnim = newCharAttackAnim;
          newCharCurrentFrames = newCharAttackFrames;
          p2HasHit = false; // 重置攻擊判定
        }
      }
      }
    }
    } // 結束 else (角色2 AI)
  } else {
    // 否則，使用預設的靜止動畫
    newCharCurrentAnim = newCharAnim;
    newCharCurrentFrames = newCharFrames;
    newCharCurrentFrame = 0; // 保持在第一幀
  }

  // 計算第二個角色放大後的寬度和高度
  const newCharDisplayWidth = newCharCurrentAnim.frameWidth * newCharScaleFactor;
  const newCharDisplayHeight = newCharCurrentAnim.sheetHeight * newCharScaleFactor;

  // 將角色二的 "世界位置" 轉換為 "畫面位置"
  const newCharScreenX = newCharX + cameraOffsetX;

  // 如果在戰鬥模式且玩家死亡 (角色2勝利)，在角色2後面繪製勝利文字
  if (isBattleMode && p1HP <= 0 && bgImage !== unnamedImage) {
    if (victoryStartTime === 0) {
      victoryStartTime = millis();
    }
    
    let elapsed = millis() - victoryStartTime;
    
    // 1. 初始放大動畫 (0 -> 1)，持續 1 秒
    let t = constrain(elapsed / 1000, 0, 1);
    let grow = 1 - Math.pow(1 - t, 3); // Cubic Ease Out 效果
    
    // 2. 持續呼吸效果 (變大變小) & 上下浮動
    let pulse = 1 + sin(elapsed * 0.005) * 0.05;
    let floatY = sin(elapsed * 0.002) * 10;

    push();
    imageMode(CENTER);
    // 計算最終尺寸
    const vW = 400 * grow * pulse;
    const vH = (victoryTextImage.height / victoryTextImage.width) * vW;
    // 繪製在角色上方/後方，並加上浮動效果
    image(victoryTextImage, newCharScreenX, newCharY - 150 + floatY, vW, vH);
    pop();
  } else {
    victoryStartTime = 0; // 重置計時器
  }

  // 繪製第二個角色
  if (bgImage === originalBgImage) {
    push();
    translate(newCharScreenX, newCharY);
    
    // 根據與玩家的相對位置決定面向
    if (newCharX > characterX) {
      scale(-1, 1); // 角色在玩家右邊，面向左
    } else {
      scale(1, 1); // 角色在玩家左邊，面向右
    }
    
    image(newCharCurrentFrames[floor(newCharCurrentFrame)], -newCharDisplayWidth / 2, -newCharDisplayHeight / 2, newCharDisplayWidth, newCharDisplayHeight);
    pop();
  }

  // --- 繪製神秘圖片 (僅在第二個背景顯示) ---
  if (bgImage === unnamedImage && !isMysteryExploded) {
    let mDisplayW = mysteryImage.width * (scaleFactor * 0.2); // 縮小一點，比角色小
    let mDisplayH = mysteryImage.height * (scaleFactor * 0.2)
    let mScreenX = mysteryX + cameraOffsetX;
    
    push();
    translate(mScreenX, mysteryY);
    image(mysteryImage, -mDisplayW / 2, -mDisplayH / 2, mDisplayW, mDisplayH);
    pop();

    // 靠近時顯示驚嘆號
    if (dist(characterX, characterY, mysteryX, mysteryY) < 300) {
      const pulse = sin(frameCount * 0.1) * 5;
      const markY = mysteryY - mDisplayH / 2 - 50 + pulse;
      
      push();
      stroke(255);
      strokeWeight(4 + abs(pulse) / 2);
      fill(255, 0, 0);
      textSize(50);
      textAlign(CENTER, CENTER);
      text("!", mScreenX, markY);
      pop();

      // 新增：右下角提示文字
      push();
      textSize(24);
      textAlign(RIGHT, BOTTOM);
      stroke(255);
      strokeWeight(4);
      fill(0);
      text("按空白鍵觸發", width - 20, height - 20);
      pop();
    }
  }

  // --- 繪製角色3 (神秘圖片爆炸後出現) ---
  if (isChar3Active) {
    // 物理邏輯
    char3Vy += gravity;
    char3Y += char3Vy;
    
    let isOnGround = false;
    // 地面碰撞 (與神秘圖片同一層)
    let groundY = groundLevel - 130;
    if (char3Y >= groundY) {
      char3Y = groundY;
      char3Vy = 0;
      isOnGround = true;
    }

    push();
    translate(char3X + cameraOffsetX, char3Y);
    
    // 讓角色3面向角色1
    if (char3X > characterX) {
      scale(1, 1); // 面向左
    } else {
      scale(-1, 1); // 面向右
    }

    // 優先檢查是否死亡
    if (p2HP <= 0) {
      // 播放死亡動畫 (一次性)
      char3CurrentFrame += animationSpeed;
      let showFinalImage = false;
      if (char3CurrentFrame >= char3DieAnim.totalFrames - 1) {
        char3CurrentFrame = char3DieAnim.totalFrames - 1; // 停在最後一幀
        showFinalImage = true;
      }
      
      let char3Scale = scaleFactor;
      
      // 假設死亡動畫也需要翻轉 (與攻擊/走路一致)
      push();
      scale(-1, 1);
      if (showFinalImage) {
        let finalW = char3DieFinalImage.width * char3Scale;
        let finalH = char3DieFinalImage.height * char3Scale;
        image(char3DieFinalImage, -finalW / 2, -finalH / 2, finalW, finalH);
      } else {
        let c3DisplayW = char3DieAnim.frameWidth * char3Scale;
        let c3DisplayH = char3DieAnim.sheetHeight * char3Scale;
        image(char3DieFrames[floor(char3CurrentFrame)], -c3DisplayW / 2, -c3DisplayH / 2, c3DisplayW, c3DisplayH);
      }
      pop();
    } else if (isChar3Attacking) {
      // 播放攻擊動畫 (一次性)
      char3CurrentFrame += animationSpeed * 1.2;
      if (char3CurrentFrame >= char3AttackAnim.totalFrames) {
        isChar3Attacking = false;
        char3CurrentFrame = 0;
      }
      
      let char3Scale = scaleFactor;
      let c3DisplayW = char3AttackAnim.frameWidth * char3Scale;
      let c3DisplayH = char3AttackAnim.sheetHeight * char3Scale;
      // 確保不讀取超出範圍的幀
      let frameIdx = floor(char3CurrentFrame);
      if (frameIdx >= char3AttackAnim.totalFrames) frameIdx = char3AttackAnim.totalFrames - 1;
      
      // 因為攻擊動畫原本面向右，但這裡的邏輯是預設面向左，所以要翻轉
      push();
      scale(-1, 1);
      image(char3AttackFrames[frameIdx], -c3DisplayW / 2, -c3DisplayH / 2, c3DisplayW, c3DisplayH);
      pop();
    } else if (isOnGround) {
      // 判斷是否在移動 (戰鬥模式且距離大於攻擊範圍 60)
      let isWalking = false;
      if (isBattleMode && dialogueTexts === char3Dialogues && dist(char3X, char3Y, characterX, characterY) > 60) {
        isWalking = true;
      }

      if (isWalking) {
        char3CurrentFrame = (char3CurrentFrame + animationSpeed) % char3WalkAnim.totalFrames;
        let char3Scale = scaleFactor;
        let c3DisplayW = char3WalkAnim.frameWidth * char3Scale;
        let c3DisplayH = char3WalkAnim.sheetHeight * char3Scale;
        
        // 因為走路動畫原本面向右，但這裡的邏輯是預設面向左，所以要翻轉
        push();
        scale(-1, 1);
        image(char3WalkFrames[floor(char3CurrentFrame)], -c3DisplayW / 2, -c3DisplayH / 2, c3DisplayW, c3DisplayH);
        pop();
      } else {
        // 落地後播放 simple 動畫 (速度減慢)
        char3CurrentFrame = (char3CurrentFrame + animationSpeed * 0.4) % char3SimpleAnim.totalFrames;
        let char3Scale = scaleFactor;
        let c3DisplayW = char3SimpleAnim.frameWidth * char3Scale;
        let c3DisplayH = char3SimpleAnim.sheetHeight * char3Scale;
        image(char3SimpleFrames[floor(char3CurrentFrame)], -c3DisplayW / 2, -c3DisplayH / 2, c3DisplayW, c3DisplayH);
      }
    } else {
      // 空中時顯示跳躍圖 (換回原本的跳躍圖片)
      let char3Scale = scaleFactor;
      let c3DisplayW = char3JumpImage.width * char3Scale;
      let c3DisplayH = char3JumpImage.height * char3Scale;
      image(char3JumpImage, -c3DisplayW / 2, -c3DisplayH / 2, c3DisplayW, c3DisplayH);
    }
    pop();

    // 新增：落下時顯示驚嘆號 (戰鬥中不顯示)
    if (!isBattleMode && !isOnGround && dist(characterX, characterY, char3X, char3Y) < 250) {
      let char3Scale = scaleFactor;
      let c3DisplayH = char3JumpImage.height * char3Scale;
      push();
      stroke(255);
      strokeWeight(4);
      fill(255, 0, 0);
      textSize(50);
      textAlign(CENTER, CENTER);
      text("!", char3X + cameraOffsetX, char3Y - c3DisplayH / 2 - 40);
      pop();
    }
  }

  // --- 碰撞偵測與對話框 ---
  // 計算兩個角色之間的碰撞距離
  // 改用 newCharCurrentAnim 來計算，這樣攻擊時變寬的判定框也會被考慮進去
  let enemyWidth = 0;
  if (dialogueTexts === char3Dialogues) {
      enemyWidth = char3SimpleAnim.frameWidth * scaleFactor;
  } else if (dialogueTexts === char4Dialogues) {
      enemyWidth = char4StandAnim.frameWidth * scaleFactor;
  } else {
      enemyWidth = newCharCurrentAnim.frameWidth * newCharScaleFactor;
  }
  const collisionDistance = (anim.frameWidth * scaleFactor / 2) + (enemyWidth / 2);
  const interactionDist = 250; // 設定互動距離，超過此距離驚嘆號會消失
  let isNearChar2 = false;
  let isNearChar3 = false;
  let isNearChar4 = false; // 新增：角色4靠近判定
  
  // 檢查是否碰撞
  if (!isBattleMode) {
    if (bgImage === originalBgImage) {
      isNearChar2 = abs(characterX - newCharX) < collisionDistance;
    }
  }

  if (isChar3Active) {
    // 只有當角色3落地後才算在範圍內 (顯示驚嘆號/可對話)
    let groundY = groundLevel - 130;
    if (char3Y >= groundY - 1) {
      isNearChar3 = dist(characterX, characterY, char3X, char3Y) < interactionDist;
    }
  }

  // 新增：角色4靠近判定
  if (isChar4Active) {
    if (dist(characterX, characterY, char4X, char4Y) < interactionDist) {
      isNearChar4 = true;
    }
  }

  if (!isBattleMode) {
    isPlayerInRange = isNearChar2 || isNearChar3 || isNearChar4;
  } else {
    isPlayerInRange = false;

    // --- 戰鬥傷害判定 ---
    // 1. 角色1 攻擊 角色2
    if (isPunching && !p1HasHit) {
      let canAttack = false;
      let targetX;

      if (dialogueTexts === char4Dialogues) {
        // 對於角色4，只有在問答完成後才能用拳頭攻擊
        if (isChar4QuizCompleted) {
          canAttack = true;
        }
        targetX = char4X;
      } else if (dialogueTexts === char3Dialogues) {
        canAttack = true;
        targetX = char3X;
      } else { // 角色2
        canAttack = true;
        targetX = newCharX;
      }

      // 如果可以攻擊且在攻擊範圍內
      if (canAttack && abs(characterX - targetX) < collisionDistance) {
        p2HP -= 2; // 造成 2 點傷害
        if (p2HP <= 0) {
          p2HP = 0; // 確保血量不為負
          if (dialogueTexts === char3Dialogues) {
             char3CurrentFrame = 0; // 重置角色3動畫幀
             isChar3Attacking = false; // 停止攻擊狀態
          } else if (dialogueTexts === char4Dialogues) {
             isChar4Attacking = false; // 停止角色4攻擊
             char4CurrentFrame = 0;
             // 新增：觸發角色4戰敗掉落物
             if (!isChar4DefeatItemFalling) {
               isChar4DefeatItemFalling = true;
               char4DefeatItemX = characterX + 150; // 在角色1右邊生成
               char4DefeatItemY = characterY - 10;
               char4DefeatItemVy = 0;
             }
          } else {
             newCharCurrentFrame = 0; // 重置角色2動畫幀
          }
        }
        p1HasHit = true; // 標記本次攻擊已造成傷害
      }
    }

    // 2. 角色2 攻擊 角色1
    if (isNewCharAttacking && !p2HasHit) {
      if (abs(characterX - newCharX) < collisionDistance) {
        p1HP -= p1MaxHP / 10; // 扣除 1/10 血量
        if (p1HP < 0) p1HP = 0;
        p2HasHit = true; // 標記本次攻擊已造成傷害
      }
    }
    
    // 3. 角色3 攻擊 角色1 (新增)
    if (dialogueTexts === char3Dialogues && !p2HasHit) {
        // 當角色3正在攻擊且距離夠近
        if (isChar3Attacking && dist(characterX, characterY, char3X, char3Y) < collisionDistance) {
            p1HP -= p1MaxHP / 10;
            if (p1HP < 0) p1HP = 0;
            p2HasHit = true;
        }
    }
    
    // 4. 角色4 攻擊 角色1 (新增)
    if (dialogueTexts === char4Dialogues && !p2HasHit) {
        if (isChar4Attacking && dist(characterX, characterY, char4X, char4Y) < collisionDistance) {
            p1HP -= p1MaxHP / 10;
            if (p1HP < 0) p1HP = 0;
            p2HasHit = true;
        }
    }

  }

  // 如果玩家離開範圍，就關閉對話框
  if (!isPlayerInRange) {
    showDialog = false;
    dialogueIndex = 0; // 重置對話
  }

  // 如果玩家在範圍內，但尚未觸發對話，就顯示驚嘆號
  if (isPlayerInRange && !showDialog) {
    let targetX, targetY, targetH;
    if (isNearChar3) {
      targetX = char3X + cameraOffsetX;
      targetY = char3Y;
      targetH = char3SimpleAnim.sheetHeight * scaleFactor;
    } else if (isNearChar4) { // 新增：角色4驚嘆號位置
      targetX = char4X + cameraOffsetX;
      targetY = char4Y;
      targetH = char4StandAnim.sheetHeight * scaleFactor;
    } else {
      targetX = newCharScreenX;
      targetY = newCharY;
      targetH = newCharDisplayHeight;
    }

    const exclamationMark = "!";
    // 讓驚嘆號產生上下浮動的脈動效果，使其更顯眼
    const pulse = sin(frameCount * 0.1) * 5; // 上下浮動 5 個像素
    const exclamationMarkY = targetY - targetH / 2 - 30 + pulse; // 基礎高度再往上一點
    
    push();
    // 加上黃色外光暈效果，並讓光暈跟著脈動
    stroke(255); // 將外框改為白色
    strokeWeight(4 + abs(pulse) / 2); // 將外框改細一點，脈動效果也減半
    fill(255, 0, 0); // 保持原本的紅色
    textSize(50); // 將字體加大
    textAlign(CENTER, CENTER);
    text(exclamationMark, targetX, exclamationMarkY);
    pop();

    // 在右下角顯示提示文字
    const promptText = "按空白鍵觸發對話";
    push();
    textSize(24);
    textAlign(RIGHT, BOTTOM);
    // 為了讓文字在任何背景下都清晰，先畫一層白色外框
    stroke(255);
    strokeWeight(4);
    fill(0);
    text(promptText, width - 20, height - 20);
    pop();

  }
  // 如果需要顯示對話框，就繪製它
  if (showDialog) {
    const dialogWidth = width * 0.6;
    const dialogHeight = 120; // 稍微增加對話框高度
    const dialogX = (width - dialogWidth) / 2;
    const dialogY = 30;
    const currentDialogue = dialogueTexts[dialogueIndex];

    // --- 決定說話者 ---
    let speakerX, speakerIconFrames, speakerIconFrame;
    if (currentDialogue.speaker === 'char1') {
      speakerX = characterScreenX;
      speakerIconFrames = char1TalkFrames; // 使用角色1的新頭像
      speakerIconFrame = dialogIconFrame; // 使用動態幀
    } else if (currentDialogue.speaker === 'char3') {
      speakerX = char3X + cameraOffsetX;
      speakerIconFrames = char3TalkFrames; // 使用角色3的新頭像
      speakerIconFrame = dialogIconFrame; // 使用動態幀 (每0.5秒切換)
    } else if (currentDialogue.speaker === 'char4') {
      speakerX = char4X + cameraOffsetX;
      speakerIconFrames = char4StandFrames; // 使用角色4站立動畫作為頭像
      speakerIconFrame = floor(frameCount * 0.1) % char4StandFrames.length;
    } else { // 'char2'
      speakerX = newCharScreenX;
      speakerIconFrames = newCharFrames;
      speakerIconFrame = dialogIconFrame; // 角色2頭像使用動態幀
    }
    // --- 繪製對話框 ---
    if (currentDialogue.speaker === 'char1') {
      fill(255, 255, 255, 128); // 背景改回跟角色2一樣 (半透明)
      stroke(255, 105, 180); // 粉色邊框
    } else if (currentDialogue.speaker === 'char3') {
      fill(255, 255, 255, 128);
      stroke(255, 215, 0); // 黃色邊框
    } else if (currentDialogue.speaker === 'char4') {
      fill(255, 255, 255, 128);
      stroke(0, 0, 255); // 藍色邊框
    } else {
      fill(255, 255, 255, 128); // 半透明白色背景 (約50%透明度)
      stroke(139, 0, 0); // 深紅色邊框
    }
    strokeWeight(3);
    // 1. 繪製主體
    rect(dialogX, dialogY, dialogWidth, dialogHeight, 15); // 圓角矩形

    // 2. 繪製指向說話者的 "尾巴" (三角形)
    const tailWidth = 30;
    const tailHeight = 20;
    // 確保尾巴的尖端對準角色，但底部不會超出對話框範圍
    const tailTipX = constrain(speakerX, dialogX + tailWidth, dialogX + dialogWidth - tailWidth);
    const tailBaseX = tailTipX - tailWidth / 2;
    
    beginShape();
    vertex(tailBaseX, dialogY + dialogHeight - 1); // -1 是為了稍微重疊，避免縫隙
    vertex(tailTipX, dialogY + dialogHeight + tailHeight);
    vertex(tailBaseX + tailWidth, dialogY + dialogHeight - 1);
    endShape(CLOSE);

    // 3. 在對話框左側繪製說話者的頭像
    const iconSize = 60; // 將頭像尺寸縮小
    const iconPadding = 10;
    image(speakerIconFrames[speakerIconFrame], dialogX + iconPadding, dialogY + (dialogHeight - iconSize) / 2, iconSize, iconSize);

    // 4. 繪製文字
    if (currentDialogue.type === 'input') {
      // 計算提示文字的寬度
      push();
      textSize(32);
      textStyle(BOLD);
      const promptText = currentDialogue.prompt;
      const promptWidth = textWidth(promptText);
      pop();

      const textPadding = 20;
      const promptStartX = dialogX + iconSize + iconPadding * 2 + textPadding;

      drawDialogueText(currentDialogue.prompt, dialogX, dialogY, iconSize, iconPadding, dialogHeight);

      // 繪製輸入框背景 (與對話框風格一致)
      const inputBoxX = promptStartX + promptWidth + 10;
      const inputBoxWidth = 200;
      const inputBoxHeight = 50;
      const inputBoxY = dialogY + (dialogHeight - inputBoxHeight) / 2;

      push();
      fill(255, 255, 255, 200);
      stroke(139, 0, 0);
      strokeWeight(3);
      rect(inputBoxX, inputBoxY, inputBoxWidth, inputBoxHeight, 10);
      pop();

      if (!isWaitingForInput) {
        isWaitingForInput = true;
        nameInput = createInput('');
        nameInput.style('font-size', '24px');
        nameInput.style('background', 'transparent');
        nameInput.style('border', 'none');
        nameInput.style('color', '#f4a261');
        nameInput.style('font-family', 'Baloo 2');
        nameInput.style('outline', 'none');
        nameInput.elt.focus();
      }
      
      // 持續更新輸入框位置以確保對齊
      if (nameInput) {
        nameInput.position(inputBoxX + 10, inputBoxY + 5);
        nameInput.size(inputBoxWidth - 20, inputBoxHeight - 10);
      }
    } else {
      const dialogText = currentDialogue.text.replace('{playerName}', playerName);
      drawDialogueText(dialogText, dialogX, dialogY, iconSize, iconPadding, dialogHeight);
    }

    // 5. 在對話框右下角加上繼續提示
    push();
    fill('#335c67'); // 設定為指定的深藍綠色
    stroke(255); // 加上白色外框
    strokeWeight(2);
    textSize(18);
    textAlign(RIGHT, BOTTOM);
    if (dialogueIndex < dialogueTexts.length - 1) { // 只在還有下一句時顯示
      text("繼續 Enter", dialogX + dialogWidth - 15, dialogY + dialogHeight - 10);
    }
    pop();
  }

  // --- 顯示移動提示 (遊戲開始後) ---
  if (!isBattleMode && !showDialog) {
    if (keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW) || keyIsDown(UP_ARROW)) {
      hasPlayerMoved = true;
    }

    if (hasPlayerMoved) {
      moveInstructionOpacity -= 5;
    }

    if (moveInstructionOpacity > 0) {
      push();
      textAlign(CENTER, TOP);
      textSize(32);
      textStyle(BOLD);
      fill(255, 255, 255, moveInstructionOpacity);
      noStroke(); // 不需要黑框
      text("按下⭠⭡⭢⭣移動", width / 2, 160);
      pop();
    }
  }

  // --- 繪製血條 (戰鬥模式) ---
  if (isBattleMode) { // 修改：移除 bgImage 限制，讓角色3戰鬥時也能顯示血條
    // --- 星星生成與繪製 (僅在戰鬥中且雙方都活著時) ---
    if (p1HP > 0 && p2HP > 0) { // 雙方都活著
      // --- 新增：顯示提示文字 ---
      if (dialogueTexts !== char3Dialogues) {
        push();
        textAlign(CENTER, TOP);
        textSize(28);
        textStyle(BOLD);
        fill(255, 220, 0); // 星星的黃色
        stroke(0);
        strokeWeight(4);
        text("摸到星星對瓦豆魯迪造成傷害", width / 2, 10);
        pop();
      }

      // 判斷是否為角色3的戰鬥
      let isChar3Battle = (dialogueTexts === char3Dialogues);

      // 如果星星數量小於最大值 (1)，且沒有正在吃星星或顯示視窗，且拳擊尚未解鎖，就生成一個星星
      // 修改：如果是角色3的戰鬥，即使拳擊已解鎖也要生成蘋果，直到問答完成
      if (stars.length < maxStars && !isEatingStar && !showStarPowerupWindow && !isCorrectAnswer && (!punchUnlocked || (isChar3Battle && !isChar3QuizCompleted))) {
        let validPosition = false;
        let randomX, randomY;
        let attempts = 0; // 防止無限迴圈

        // 不斷嘗試，直到找到一個離玩家夠遠的位置
        while (!validPosition && attempts < 50) {
          if (isChar3Battle) {
            // 蘋果：在角色附近生成，並從上方掉落
            // 讓蘋果掉在離角色有一點距離的地方 (左右 200~500 像素)，讓玩家需要移動去接
            let offset = random(200, 500) * (random() > 0.5 ? 1 : -1);
            randomX = constrain(characterX + offset, 50, width - 50);
            randomY = -50; // 從畫面外上方開始
            validPosition = true; // 蘋果不需要檢查最小距離
          } else {
            // 星星：原本的邏輯
            randomX = random(50, width - 50);
            randomY = random(groundLevel - 160, groundLevel - 40);
            // 檢查與角色1的距離
            if (dist(randomX, randomY, characterX, characterY) > minStarDistance) {
              validPosition = true;
            }
          }
          attempts++;
        }

        if (validPosition) {
          // 加入物品，新增 type 和 vy (垂直速度) 屬性
          let itemType = isChar3Battle ? 'apple' : 'star';
          stars.push({ x: randomX, y: randomY, scale: 0, rotation: 0, state: 'spawning', type: itemType, vy: 0 });
        }
      }

      // 繪製所有星星
      for (let i = stars.length - 1; i >= 0; i--) {
        let star = stars[i];
        let itemImg = (star.type === 'apple') ? appleImage : starImage;
        
        // --- 動畫狀態更新 (出現特效) ---
        if (star.state === 'spawning') {
          star.scale += 0.1; // 快速變大
          star.rotation += 0.5; // 快速旋轉
          if (star.scale >= 1.3) { // 變大到 1.3 倍 (回彈效果)
            star.state = 'shrinking';
          }
        } else if (star.state === 'shrinking') {
          star.scale -= 0.05; // 慢慢縮回
          star.rotation += 0.1; // 減速旋轉
          if (star.scale <= 1) {
            star.scale = 1;
            star.rotation = 0;
            star.state = 'idle';
          }
        }

        // --- 蘋果的物理邏輯 (掉落) ---
        if (star.type === 'apple') {
          star.vy += 0.5; // 重力
          star.y += star.vy;
          
          // 根據場景判斷地面高度，確保蘋果落在角色站立的平面上
          let currentGroundY = groundLevel;
          if (bgImage === unnamedImage) {
            currentGroundY = groundLevel - 130;
          }
          let groundY = currentGroundY - 40; // 蘋果停在地面的高度

          if (star.y > groundY) {
            star.y = groundY;
            star.vy = -star.vy * 0.4; // 輕微反彈
            if (abs(star.vy) < 1) star.vy = 0;
          }
        }

        // --- 上下擺動效果 ---
        let bobOffset = (star.type === 'apple') ? 0 : sin(frameCount * 0.1) * 10; // 蘋果不浮動

        // 計算繪製參數
        let sW = itemImg.width * scaleFactor * star.scale;
        let sH = itemImg.height * scaleFactor * star.scale;
        let finalW = itemImg.width * scaleFactor;
        let finalH = itemImg.height * scaleFactor;
        
        // 計算中心點 (修正座標以支援旋轉)
        let centerX = star.x + cameraOffsetX + finalW / 2;
        let centerY = star.y + finalH / 2 + bobOffset;

        push();
        translate(centerX, centerY);
        rotate(star.rotation);
        
        // 顯眼的特效：在生成期間繪製發光背景
        if (star.state !== 'idle') {
          noStroke();
          fill(255, 255, 0, 150); // 黃色光暈
          ellipse(0, 0, sW * 1.2, sH * 1.2);
        }

        imageMode(CENTER);
        image(itemImg, 0, 0, sW, sH);
        pop();

        // --- 碰撞偵測 ---
        // 使用簡單的距離判斷
        let playerCenterY = characterY - displayHeight / 2;
        if (!isEatingStar && dist(characterX, playerCenterY, star.x, star.y) < (displayWidth / 2 + finalW / 2)) {
          isEatingStar = true;
          currentFrame = 0;
          stars.splice(i, 1); // 移除星星
          break; // 碰到一個就夠了
        }
      }
    } else {
      stars = []; // 戰鬥結束，清空星星
    }

    // --- 繪製 MUS 物件 (僅在場景3戰鬥中，用於觸發問題) ---
    if (dialogueTexts === char4Dialogues && p1HP > 0 && p2HP > 0) {
      // 只有在需要時 (沒有星星/蘋果、沒在問問題) 才創建
      if (musObject === null && !isEatingStar && !showStarPowerupWindow && !isChar4QuizCompleted && !isCorrectAnswer) {
          musObject = {
              x: width - 100, // 從右邊開始
              y: currentGroundLevel, // 在地面上
              vx: -2, // 修改：初始為漫遊速度
              vy: 0, // 新增：垂直速度
              width: 0,
              height: 0,
              scale: 2
          };
          if (musImage && musImage.width > 0) {
              musObject.width = musImage.width * musObject.scale;
              musObject.height = musImage.height * musObject.scale;
          }
      }

      if (musObject && musObject.width > 0) {
          // --- 新增：物理與跳躍邏輯 ---
          musObject.vy += gravity; // 套用重力
          musObject.y += musObject.vy;

          // 地面碰撞
          let musGroundY = currentGroundLevel;
          let isOnMusGround = false;
          if (musObject.y >= musGroundY) {
              musObject.y = musGroundY;
              musObject.vy = 0;
              isOnMusGround = true;
          }
          // 隨機跳躍
          if (isOnMusGround && random() < 0.015) { // 約 1.5% 的機率跳躍
              musObject.vy = -12; // 跳躍力道
          }

          // --- 修改：新的移動邏輯 ---
          const fleeRadius = 250; // 玩家靠近此距離時，蘑菇會逃跑
          const distanceToPlayer = abs(characterX - (musObject.x + musObject.width / 2));
          const wanderSpeed = 2;
          const runAwaySpeed = 4;

          if (distanceToPlayer < fleeRadius) {
            // 狀態：逃跑
            if (musObject.x + musObject.width / 2 > characterX) {
              musObject.vx = runAwaySpeed; // 往右跑
            } else {
              musObject.vx = -runAwaySpeed; // 往左跑
            }
          } else {
            // 狀態：到處走動 (巡邏)
            if (abs(musObject.vx) !== wanderSpeed) musObject.vx = (musObject.vx > 0 ? 1 : -1) * wanderSpeed;
            if ((musObject.x <= 0 && musObject.vx < 0) || (musObject.x >= width - musObject.width && musObject.vx > 0)) {
                musObject.vx *= -1; // 碰到邊界時反轉
            }
          }
          musObject.x += musObject.vx;

          // 限制在畫面邊界內
          musObject.x = constrain(musObject.x, 0, width - musObject.width);

          push();
          let musScreenX = musObject.x + cameraOffsetX;
          let musDirection = musObject.vx > 0 ? 1 : -1; // 根據速度決定圖片方向
          translate(musScreenX + musObject.width / 2, musObject.y - musObject.height / 2);
          scale(musDirection, 1); // 翻轉圖片
          imageMode(CENTER);
          image(musImage, 0, 0, musObject.width, musObject.height);
          pop();

          // 碰撞偵測：角色1碰到物件
          if (dist(characterX, characterY - 40, musObject.x + musObject.width / 2, musObject.y - musObject.height / 2) < 60) {
              isEatingStar = true; // 觸發問答機制
              currentFrame = 0;
              musObject = null; // 物件消失
          }
      }
    }

    drawHealthBars();

    // 如果角色2死亡 (玩家勝利)，顯示掉落圖片動畫
    if (p2HP <= 0 && dialogueTexts !== char3Dialogues) {
      // --- 新增：角色2死亡對話框 ---
      const dialogText = "好吧 你繼續往前吧";
      push();
      textSize(24);
      const dialogWidth = textWidth(dialogText) + 40;
      const dialogHeight = 60;
      // 對話框位置在角色2頭頂
      const dialogX = newCharScreenX - dialogWidth / 2;
      const dialogY = newCharY - newCharDisplayHeight - dialogHeight - 20;

      // 繪製對話框背景
      fill(255, 255, 255, 220); // 半透明白色
      stroke(0);
      strokeWeight(2);
      rect(dialogX, dialogY, dialogWidth, dialogHeight, 10); // 圓角矩形

      // 繪製文字
      fill(0);
      noStroke();
      textAlign(CENTER, CENTER);
      text(dialogText, dialogX + dialogWidth / 2, dialogY + dialogHeight / 2);
      pop();
    }

    // 新增：角色3死亡對話框
    if (p2HP <= 0 && dialogueTexts === char3Dialogues && bgImage === unnamedImage) {
      const dialogText = "我還會再回來的!";
      push();
      textSize(24);
      const dialogWidth = textWidth(dialogText) + 40;
      const dialogHeight = 60;
      const char3ScreenX = char3X + cameraOffsetX;
      const char3Height = char3DieAnim.sheetHeight * scaleFactor;
      // 對話框位置在角色3頭頂
      const dialogX = char3ScreenX - dialogWidth / 2;
      const dialogY = char3Y - char3Height - dialogHeight - 20;

      // 繪製對話框背景
      fill(255, 255, 255, 220); // 半透明白色
      stroke(0);
      strokeWeight(2);
      rect(dialogX, dialogY, dialogWidth, dialogHeight, 10); // 圓角矩形

      // 繪製文字
      fill(0);
      noStroke();
      textAlign(CENTER, CENTER);
      text(dialogText, dialogX + dialogWidth / 2, dialogY + dialogHeight / 2);
      pop();

      // 新增：顯示指定圖片 (4/0.png) 在右手邊
      if (char3DefeatImage) {
        push();
        imageMode(CENTER);
        let dScale = scaleFactor; 
        let dW = char3DefeatImage.width * dScale;
        let dH = char3DefeatImage.height * dScale;
        
        // 計算地面高度 (場景2)
        let groundY = groundLevel - 90;

        // 修改：使用世界座標 (char3X) 加上鏡頭位移，使其固定在場景中
        // 加上 800 的偏移量，讓圖片出現在更右邊，並調整Y軸使其貼地
        image(char3DefeatImage, char3X + 800 + cameraOffsetX, groundY - dH / 2, dW, dH);
        pop();
      }
    }
  }

  // --- 繪製金幣 ---
  for (let i = coins.length - 1; i >= 0; i--) {
    let coin = coins[i];
    
    // 物理邏輯
    coin.vy += 0.6; // 重力
    coin.x += coin.vx;
    coin.y += coin.vy;
    
    // 地面碰撞 (簡單判定)
    let groundY = currentGroundLevel; // 修改：設定為 currentGroundLevel，讓金幣中心對齊地面 (與角色1一致)
    
    if (coin.y > groundY) {
      coin.y = groundY;
      coin.vy = -coin.vy * 0.5; // 地面反彈
    }
    
    // 新增：角色收集判定
    // 判斷角色是否碰到金幣 (距離小於 50)
    if (dist(characterX, characterY - 40, coin.x, coin.y) < 50) {
      // 新增：在場景3戰鬥中撿金幣回血
      if (isBattleMode && bgImage === bg3Image) {
        p1HP += 3; // 每撿一個金幣回 3 HP
        if (p1HP > p1MaxHP) {
          p1HP = p1MaxHP; // 不超過最大血量
        }
      }

      coinCount++; // 增加金幣數量
      coins.splice(i, 1); // 移除該金幣
      
      // 當收集到 10 枚金幣時，角色4跳出
      if (coinCount === 10 && !isChar4Active) {
        isChar4Active = true;
        char4X = characterX + 300; // 在角色右方出現
        char4Y = groundLevel - 50; // 從地面上方一點點
        char4Vy = -20; // 向上跳出的力道
      }
      continue; // 跳過繪製
    }
    
    // 繪製
    push();
    translate(coin.x + cameraOffsetX, coin.y);
    // 簡單的旋轉動畫
    if (floor(frameCount / 5) % 2 === 0) {
      scale(1, 1);
    } else {
      scale(-1, 1); 
    }
    imageMode(CENTER);
    image(coinImage, 0, 0, 32, 32);
    pop();
  }

  // --- 繪製金幣數量 UI (右上角) ---
  if ((coinCount > 0 || bgImage === bg3Image) && !isBattleMode) {
    push();
    imageMode(CENTER);
    // 繪製一個小金幣圖示
    image(coinImage, width - 130, 50, 32, 32);
    
    textAlign(RIGHT, CENTER);
    textSize(32);
    fill(255, 215, 0); // 金色
    stroke(0);
    strokeWeight(4);
    text(`x ${coinCount}`, width - 40, 50);
    pop();
  }

  // --- 繪製角色4 (收集10枚金幣後出現) ---
  if (isChar4Active) {
    // 物理邏輯
    char4Vy += gravity;
    char4Y += char4Vy;
    
    // 地面碰撞
    let gY = currentGroundLevel - 15; // 修改：往上一點
    let isOnGround = false;

    if (char4Y >= gY) {
      char4Y = gY;
      char4Vy = 0;
      isOnGround = true;
    }

    // 決定使用哪個動畫
    let c4Anim, c4Frames;
    
    if (isBattleMode && p2HP <= 0 && dialogueTexts === char4Dialogues) {
      // 角色4死亡動畫
      c4Anim = char4DieAnim;
      c4Frames = char4DieFrames;
      if (char4CurrentFrame < c4Anim.totalFrames - 1) {
        char4CurrentFrame += animationSpeed;
      }
    } else if (isBattleMode && p1HP <= 0 && dialogueTexts === char4Dialogues) {
      // 角色4勝利動畫
      c4Anim = char4VictoryAnim;
      c4Frames = char4VictoryFrames;
      char4CurrentFrame = (char4CurrentFrame + animationSpeed) % c4Anim.totalFrames;
    } else if (isChar4Attacking) {
      c4Anim = char4AttackAnim;
      c4Frames = char4AttackFrames;
      // 攻擊動畫播放邏輯 (一次性)
      char4CurrentFrame += animationSpeed;
      if (char4CurrentFrame >= c4Anim.totalFrames) {
        isChar4Attacking = false;
        char4CurrentFrame = 0;
      }
    } else if (isOnGround) {
      if (isChar4Moving) {
        c4Anim = char4WalkAnim;
        c4Frames = char4WalkFrames;
      } else {
        c4Anim = char4StandAnim;
        c4Frames = char4StandFrames;
      }
      // 循環動畫更新
      char4CurrentFrame = (char4CurrentFrame + animationSpeed) % c4Anim.totalFrames;
    } else {
      c4Anim = char4JumpAnim;
      c4Frames = char4JumpFrames;
      // 循環動畫更新
      char4CurrentFrame = (char4CurrentFrame + animationSpeed) % c4Anim.totalFrames;
    }

    push();
    translate(char4X + cameraOffsetX, char4Y);
    // 修改：根據與玩家的相對位置決定面向
    if (char4X > characterX) {
      scale(-1, 1); // 角色在玩家右邊，面向左
    } else {
      scale(1, 1); // 角色在玩家左邊，面向右
    }
    imageMode(CENTER);
    let c4Scale = scaleFactor;
    let c4W = c4Anim.frameWidth * c4Scale;
    let c4H = c4Anim.sheetHeight * c4Scale;
    // 繪製角色4動畫
    image(c4Frames[floor(char4CurrentFrame) % c4Frames.length], 0, 0, c4W, c4H); // 修改：Y軸設為0，讓角色中心對齊地面 (與角色1一致)
    pop();
  }

  // --- 轉場動畫 ---
  if (isTransitioning) {
    let elapsedTime = millis() - transitionStartTime;
    let duration = 1000; // 動畫持續 1 秒
    
    // 使用 easeOutQuad 讓滑入效果更平滑
    let t = constrain(elapsedTime / duration, 0, 1);
    let easeT = 1 - (1 - t) * (1 - t);
    let transX = map(easeT, 0, 1, width, 0);
    
    image(battleTransitionImage, transX, 0, width, height);

    // --- 繪製轉場時的角色 ---
    const vsScale = 5; // 轉場時角色放大倍率，讓他們看起來更有氣勢

    // 角色1：放置在左下角
    let c1X = transX + width * 0.25; 
    let c1Y = height * 0.65;
    
    push();
    translate(c1X, c1Y);
    // 使用對話框的圖片 (char1TalkFrames) 並進行動畫切換
    let c1Img = char1TalkFrames[dialogIconFrame];
    // 保持原本的放大比例邏輯，這裡假設圖片大小適中，直接放大
    image(c1Img, -c1Img.width * vsScale / 2, -c1Img.height * vsScale / 2, c1Img.width * vsScale, c1Img.height * vsScale);
    pop();

    // 角色2：放置在右上角圈內
    let c2X = transX + width * 0.75; 
    let c2Y = height * 0.4; // 往下一點點 (從 0.3 改為 0.4)
    
    // 判斷是否為角色3 (根據對話內容)
    let isChar3Battle = (dialogueTexts === char3Dialogues);
    let isChar4Battle = (dialogueTexts === char4Dialogues); // 新增：判斷是否為角色4

    push();
    translate(c2X, c2Y);
    if (isChar3Battle) {
      // 角色3 (原本面向左，所以不需要翻轉)
      scale(1, 1);
      let c3W = char3SimpleAnim.frameWidth * vsScale;
      let c3H = char3SimpleAnim.sheetHeight * vsScale;
      image(char3SimpleFrames[dialogIconFrame], -c3W / 2, -c3H / 2, c3W, c3H);
    } else if (isChar4Battle) {
      // 角色4 (原本面向右，需要翻轉面向左)
      scale(-1, 1);
      let c4W = char4StandAnim.frameWidth * vsScale;
      let c4H = char4StandAnim.sheetHeight * vsScale;
      // 使用 dialogIconFrame (0或1) 播放前兩幀
      image(char4StandFrames[dialogIconFrame], -c4W / 2, -c4H / 2, c4W, c4H);
    } else {
      // 角色2 (原本面向右，需要翻轉面向左)
      scale(-1, 1); 
      let c2W = newCharAnim.frameWidth * vsScale;
      let c2H = newCharAnim.sheetHeight * vsScale;
      image(newCharFrames[dialogIconFrame], -c2W / 2, -c2H / 2, c2W, c2H);
    }
    pop();

    // --- 繪製戰鬥發起文字 ---
    push();
    textSize(48);
    textStyle(BOLD);
    stroke(255); // 白色外框
    strokeWeight(6);
    
    let nameTxt = "瓦豆魯迪";
    if (isChar3Battle) nameTxt = "神秘人物";
    else if (isChar4Battle) nameTxt = "馬力歐";
    let actionTxt = "發起了戰鬥!";
    let nameW = textWidth(nameTxt);
    let actionW = textWidth(actionTxt);
    let totalW = nameW + actionW;
    
    // 讓文字置中於轉場畫面，並隨之移動
    let startX = transX + width * 0.05; // 改為靠左 (距離左邊 20%)
    let textY = height - 80; // 距離底部 80px

    textAlign(LEFT, BOTTOM);
    fill('#f4a261'); // 名字顏色
    text(nameTxt, startX, textY);
    
    fill('#335c67'); // 其他文字顏色
    text(actionTxt, startX + nameW, textY);
    pop();

    // --- 新增：左上角玩家名字 ---
    push();
    textSize(40);
    textStyle(BOLD);
    stroke(255);
    strokeWeight(5);
    textAlign(LEFT, TOP);
    fill('#4ecdc4'); // 玩家顏色 (對應血條)
    text(playerName, transX + 60, 100); // 加上 transX 跟隨移動 (再往下)
    pop();

    // --- 新增：右下角角色2名字 ---
    push();
    textSize(40);
    textStyle(BOLD);
    stroke(255);
    strokeWeight(5);
    textAlign(RIGHT, BOTTOM);
    fill('#f4a261'); // 角色2顏色 (對應血條)
    let p2Name = "瓦豆魯迪";
    if (isChar3Battle) p2Name = "神秘人物";
    else if (isChar4Battle) p2Name = "馬力歐";
    text(p2Name, transX + width - 450, height - 280); // 加上 transX 跟隨移動 (再往上)
    pop();

    // --- 繪製 Enter 繼續 ---
    push();
    fill(255);
    textSize(24);
    textAlign(RIGHT, BOTTOM);
    text("Enter 繼續", width - 60, height - 20);
    pop();
  }

  // 如果角色1血量歸零，顯示重新開始文字
  if (p1HP <= 0) {
    push();
    textAlign(CENTER, CENTER);
    textSize(50);
    textStyle(BOLD);
    fill(255);
    stroke(0);
    strokeWeight(5);
    text("重新開始遊戲", width / 2, height * 0.3);
    textSize(30);
    text("按下遊戲重新開始", width / 2, height * 0.3 + 60);
    pop();
  }

  // --- 新增：掉落轉場動畫 ---
  if (isFallingDownHole) {
    fallCurtainHeight += 40; // 黑幕下降速度加快
    if (fallCurtainHeight > height) {
      fallCurtainHeight = height;
      bgImage = unnamedImage; // 切換背景
      isFallingDownHole = false; // 結束下降動畫
      isWaitingOnBlackScreen = true; // 開始黑幕等待
      blackScreenStartTime = millis(); // 啟動計時器
      hasFallenTransitionDone = true; // 標記轉場完成
      
      // 新增：切換場景後退出戰鬥模式並清除物件
      isBattleMode = false;
      stars = [];
      p2HP = p2MaxHP; // 新增：重置敵人血量，避免角色3一出現就顯示倒地圖
    }
    push();
    fill(0);
    noStroke();
    rect(0, 0, width, fallCurtainHeight);
    pop();
  } else if (isFallingToStage3) {
    // 新增：前往背景3的轉場動畫
    fallCurtainHeight += 40;
    if (fallCurtainHeight > height) {
      fallCurtainHeight = height;
      bgImage = bg3Image; // 切換到背景3
      isFallingToStage3 = false;
      isWaitingOnBlackScreen = true; // 開始黑幕等待
      blackScreenStartTime = millis();
      
      // 重置狀態
      isBattleMode = false;
      stars = [];
      characterX = width / 2;
      characterY = -100; // 從上方落下
      velocityY = 0;
      dialogueTexts = char2Dialogues; // 重置對話，避免顯示上一關的物件
      p2HP = p2MaxHP; // 重置敵人血量
      
      revealCurtainY = 0; // 重置揭露動畫位置，確保轉場動畫能正常播放
      
      // 重置第二關的狀態
      isMysteryExploded = false;
      isChar3Active = false;
      char3CurrentFrame = 0;
      isChar3Attacking = false;
      isChar3QuizCompleted = false;
      explosionParticles = []; // 清除爆炸特效
      isChar4QuizCompleted = false; // 新增：重置角色4問答狀態
      isOnPipe = false; // 重置水管狀態
      coins = []; // 清除金幣
      coinCount = 0; // 重置金幣數量
      isChar4Active = false; // 重置角色4狀態
      char4CurrentFrame = 0; // 重置角色4動畫
      isChar4Attacking = false; // 重置角色4攻擊狀態
      isChestOpened = false; // 新增：重置寶箱狀態
      isChar4DefeatItemFalling = false; // 新增：重置角色4戰敗掉落物狀態
      musObject = null; // 新增：重置 MUS 物件
    }
    push();
    fill(0);
    noStroke();
    rect(0, 0, width, fallCurtainHeight);
    pop();
  } else if (isWaitingOnBlackScreen) {
    // 黑幕維持階段
    fill(0);
    noStroke();
    rect(0, 0, width, height);
    // 維持1秒
    if (millis() - blackScreenStartTime > 1000) {
      isWaitingOnBlackScreen = false;
      isRevealingNewBg = true;
      
      // 重置角色位置，讓角色從新場景上方落下 (移到這裡，確保在第二段動畫開始時才掉落)
      characterY = -100;
      characterX = width / 2;
      velocityY = 0;
    }
  } else if (isRevealingNewBg) {
    // 當 isRevealingNewBg 為 true 時，背景已經切換 (unnamed.jpg 或 背景3)
    // 我們需要畫一個從上往下退場的黑幕
    revealCurtainY += 40; // 退場速度
    if (revealCurtainY > height) {
      isRevealingNewBg = false;
    }
    push();
    fill(0);
    noStroke();
    // 繪製一個黑幕，其頂部 (y) 從 0 開始往下移，直到移出畫面
    rect(0, revealCurtainY, width, height);
    pop();
  }

  // --- 繪製爆炸特效 ---
  for (let i = explosionParticles.length - 1; i >= 0; i--) {
    let p = explosionParticles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 2;
    p.size *= 0.96;
    
    if (p.alpha <= 0) {
      explosionParticles.splice(i, 1);
    } else {
      push();
      noStroke();
      fill(red(p.color), green(p.color), blue(p.color), p.alpha);
      ellipse(p.x + cameraOffsetX, p.y, p.size);
      pop();
    }
  }

  // 新增：站在水管上時顯示提示
  if (isOnPipe && bgImage === unnamedImage) {
    push();
    textSize(24);
    textAlign(RIGHT, BOTTOM);
    stroke(255);
    strokeWeight(4);
    fill(0);
    text("按空白鍵互動", width - 20, height - 20);
    pop();
  }

  drawFadeEffect();
}

function drawDialogueText(txt, dialogX, dialogY, iconSize, iconPadding, dialogHeight) {
  const textPadding = 20;
  let currentX = dialogX + iconSize + iconPadding * 2 + textPadding;
  const centerY = dialogY + dialogHeight / 2;

  push();
  stroke(255); // 加上白色外框
  strokeWeight(4); // 外框粗細
  textSize(32);
  textStyle(BOLD); // 將文字設為粗體
  textAlign(LEFT, CENTER);

  // 定義要變色的關鍵字
  const keywords = ['瓦豆魯迪'];
  if (playerName && playerName.trim() !== '') {
    keywords.push(playerName);
  }

  // 建立正則表達式來分割文字，保留分隔符
  const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = keywords.map(escapeRegExp).join('|');
  
  let parts = [txt];
  if (pattern) {
    const regex = new RegExp(`(${pattern})`, 'g');
    parts = txt.split(regex);
  }

  for (let part of parts) {
    if (keywords.includes(part)) {
      fill('#f4a261'); // 名字顏色
    } else {
      fill('#335c67'); // 其他文字顏色
    }
    text(part, currentX, centerY);
    currentX += textWidth(part);
  }
  
  pop();
}

function drawHealthBars() {
  const barWidth = 300;
  const barHeight = 25;
  const padding = 40;

  // --- 角色1 (左上) ---
  push();
  let x1 = padding;
  let y1 = padding;

  // 名字
  fill(255);
  stroke(0);
  strokeWeight(4);
  textSize(24);
  textStyle(BOLD);
  textAlign(LEFT, BOTTOM);
  text(playerName, x1, y1);

  // 血條外框
  stroke(255);
  strokeWeight(3);
  noFill();
  rect(x1, y1 + 5, barWidth, barHeight);

  // 血條內部
  noStroke();
  fill(50, 150); // 背景灰
  rect(x1 + 2, y1 + 7, barWidth - 4, barHeight - 4);
  fill('#4ecdc4'); // 血量顏色
  let w1 = map(p1HP, 0, p1MaxHP, 0, barWidth - 4);
  rect(x1 + 2, y1 + 7, w1, barHeight - 4);
  pop();

  // --- 角色2 (右上) ---
  push();
  let x2 = width - padding - barWidth;
  let y2 = padding;

  // 名字
  fill('#f4a261'); // 瓦豆魯迪顏色
  stroke(255);
  strokeWeight(4);
  textSize(24);
  textStyle(BOLD);
  textAlign(RIGHT, BOTTOM);
  // 根據對話內容顯示對應名字
  let p2NameBar = "瓦豆魯迪";
  if (dialogueTexts === char3Dialogues) p2NameBar = "神秘人物";
  else if (dialogueTexts === char4Dialogues) p2NameBar = "馬力歐";
  text(p2NameBar, x2 + barWidth, y2);

  // 血條外框
  stroke(255);
  strokeWeight(3);
  noFill();
  rect(x2, y2 + 5, barWidth, barHeight);

  // 血條內部
  noStroke();
  fill(50, 150); // 背景灰
  rect(x2 + 2, y2 + 7, barWidth - 4, barHeight - 4);
  fill('#f4a261'); // 血量顏色
  let w2 = map(p2HP, 0, p2MaxHP, 0, barWidth - 4);
  rect(x2 + 2, y2 + 7, w2, barHeight - 4);
  pop();
}

function mousePressed() {
  if (showEndGameStats) {
    let winW = 800;
    let winH = 600;
    let winX = width / 2 - winW / 2;
    let winY = height / 2 - winH / 2;
    let restartBtnW = 300;
    let restartBtnH = 70;
    let restartBtnX = winX + winW / 2 - restartBtnW / 2;
    let restartBtnY = winY + winH - restartBtnH - 40;

    if (mouseX > restartBtnX && mouseX < restartBtnX + restartBtnW &&
        mouseY > restartBtnY && mouseY < restartBtnY + restartBtnH) {
        
        // --- 完全重置遊戲，回到標題畫面 ---
        isTitleScreen = true;
        isGameStarted = false;
        showEndGameStats = false;
        
        p1HP = p1MaxHP;
        p2HP = p2MaxHP;
        isBattleMode = false;
        isTransitioning = false;
        showDialog = false;
        dialogueIndex = 0;
        currentFrame = 0;
        bgImage = originalBgImage;
        dialogueTexts = char2Dialogues;
        
        characterX = width / 4;
        characterY = groundLevel;
        newCharX = width * 0.8;
        
        punchUnlocked = false;
        hasLockedForHalfHP = false;
        
        moveInstructionOpacity = 255;
        hasPlayerMoved = false;
        
        isMysteryExploded = false;
        isChar3Active = false;
        isChar4Active = false;
        isChestOpened = false;
        isChar4DefeatItemFalling = false;
        musObject = null;
        coins = [];
        coinCount = 0;
        
        isFadingIn = false;
        isFadingOut = false;
        fadeAlpha = 0;

        isWakingUp = false;
        isFallingEntrance = false;
        hasFallenTransitionDone = false;
        return;
    }
  }
  // 新增：標題畫面的點擊偵測
  if (isTitleScreen) {
    // 1. 偵測「開始遊戲」按鈕點擊
    const startBtnW = 450; // 更新點擊範圍寬度
    const startBtnH = 80;  // 更新點擊範圍高度
    const startBtnX = width / 2 - startBtnW / 2;
    const startBtnY = height - 150; // 改到下面

    if (mouseX > startBtnX && mouseX < startBtnX + startBtnW && 
        mouseY > startBtnY && mouseY < startBtnY + startBtnH) {
      isTitleTransitioning = true; // 觸發轉場動畫
      // 計算當前擺動的位置
      let swingX = -sin(frameCount * 0.05) * 30;
      titleFallX = width / 2 + swingX;
      titleFallY = height / 2 - 50; // 從原本角色的位置開始掉落
      titleFallVelocity = 0;
      fadeAlpha = 0; // 確保從透明開始漸黑
      return;
    }

    // 2. 偵測「跳過戰鬥」按鈕 (向下箭頭) 點擊
    const btnW = 60;
    const btnH = 60;
    const btnX = 50; // 改到左下角
    const btnY = height - 100;
    
    if (mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY && mouseY < btnY + btnH) {
      // 重置統計數據
      playStartTime = millis();
      deathCount = 0;
      totalQuestions = 0;
      correctAnswers = 0;
      showEndGameStats = false;

      // 修改：直接跳到戰鬥3結束
      isTitleScreen = false;
      isGameStarted = true;
      
      // 設定場景為第三關
      bgImage = bg3Image;
      hasFallenTransitionDone = true;
      
      // 解鎖攻擊能力
      punchUnlocked = true;
      
      // 設定血量狀態 (玩家滿血，敵人0血)
      p1HP = p1MaxHP;
      p2HP = 0;
      
      // 結束戰鬥模式
      isBattleMode = false;
      stars = [];
      
      // 設定對手為角色4
      dialogueTexts = char4Dialogues;
      isChar4Active = true;
      
      // 設定位置
      characterX = width * 0.2;
      characterY = groundLevel;
      velocityY = 0;
      
      char4X = width * 0.6; // 角色4在右邊
      char4Y = groundLevel - 15;
      char4Vy = 0;
      
      // 重置相關狀態
      isChar4QuizCompleted = true; // 問答已完成
      isChar3QuizCompleted = false;
      musObject = null; // 新增：重置 MUS 物件
      isChar4Attacking = false;
      char4CurrentFrame = 0;
      
      // 觸發寶箱掉落
      isChar4DefeatItemFalling = true;
      isChestOpened = false; // 新增：確保寶箱是關閉的
      char4DefeatItemX = characterX + 250; // 在角色1右邊生成
      char4DefeatItemY = -100;
      char4DefeatItemVy = 0;

      // 重置其他狀態
      isFallingDownHole = false;
      isFallingToStage3 = false;
      isWakingUp = false;
      isFallingEntrance = false;
      isCostumeChanged = false;
      isMysteryExploded = false;
      isChar3Active = false;
      isOnPipe = false;
      
      return;
    }
  }

  // 只有當角色1死亡時才偵測點擊
  if (p1HP <= 0 && !isFadingOut && !isFadingIn) {
    // 點擊畫面任何位置開始淡出動畫
    deathCount++; // 增加死亡次數
    isFadingOut = true;
  }

  // 如果星星能力視窗顯示中，偵測按鈕點擊
  if (showStarPowerupWindow) {
    // 重新定義視窗參數以進行點擊偵測
    let winW = 950;
    let winH = 500;
    let winX = width / 2 - winW / 2;
    let winY = height / 2 - winH / 2;

    if (mathWindowState === 'asking') {
      let btnX = winX + winW / 2 - 50;
      let btnY = winY + winH - 80;
      let btnW = 100;
      let btnH = 40;
      if (mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY && mouseY < btnY + btnH) {
        let isCorrect = false;
        if (mathProblem.type === 'chinese') {
          // 國文題：轉大寫並去除空白
          const userAnswer = mathAnswerInput.value().trim().toUpperCase();
          if (userAnswer === mathProblem.answer) isCorrect = true;
        } else {
          // 數學題：轉數字
          const userAnswer = parseInt(mathAnswerInput.value());
          if (userAnswer === mathProblem.answer) isCorrect = true;
        }
        mathAnswerInput.remove(); // 移除輸入框
        mathAnswerInput = null;
        if (isCorrect) {
          correctAnswers++; // 增加答對題數
          mathWindowState = 'correct'; // 切換到答對畫面
        } else {
          mathWindowState = 'incorrect'; // 切換到答錯畫面
          showWrongAnswerEffect = 30; // 觸發晃動特效
        }
      }

      // 新增：偵測門圖片點擊
      if (doorImage) {
        let dH = 100;
        let dW = (doorImage.width / doorImage.height) * dH;
        let dX = winX + winW - dW - 20;
        let dY = winY + winH - dH - 20;
        
        if (mouseX > dX && mouseX < dX + dW && mouseY > dY && mouseY < dY + dH) {
          isCostumeChanged = !isCostumeChanged; // 切換服裝狀態
          if (isCostumeChanged) {
             // 初始化位置在門口
             char5WindowX = dX;
             char5WindowY = dY + dH - (char5StandAnim.sheetHeight * 2.5);
             // 給予初始速度 (往左沿著底部走)
             char5VelocityX = -3;
             char5VelocityY = 0;
             char5State = 'walk';
             char5Timer = 60;
             char5Facing = 1;
          }
        }
      }

      // 新增：點擊角色5的答案氣泡自動填入答案
      if (isCostumeChanged && char5State === 'idle') {
        let charScale = 2.5;
        let cW = char5StandAnim.frameWidth * charScale;
        let bubbleX = char5WindowX + cW / 2;
        let bubbleY = char5WindowY - 30;
        
        // 氣泡大小為 60x40，中心點為 (bubbleX, bubbleY)
        if (mouseX > bubbleX - 30 && mouseX < bubbleX + 30 && 
            mouseY > bubbleY - 20 && mouseY < bubbleY + 20) {
          if (mathAnswerInput) {
            mathAnswerInput.value(mathProblem.answer);
          }
        }
      }
    } else if (mathWindowState === 'correct') {
      let btnX = winX + winW / 2 - 50;
      let btnY = winY + winH - 80;
      let btnW = 100;
      let btnH = 40;
      if (mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY && mouseY < btnY + btnH) {
        questionsAnsweredCount++; // 增加回答計數
        totalQuestions++; // 增加總問題數
        if (questionsAnsweredCount < 2) {
           // 還沒答完兩題，出下一題
           if (dialogueTexts === char3Dialogues || dialogueTexts === char4Dialogues) {
             // const q = random(chineseQuestions);
             // mathProblem = { question: q.q, answer: q.a, type: 'chinese' };
             if (questionPool.length === 0) { // 如果題庫抽完了，重新生成
                if (dialogueTexts === char3Dialogues) questionPool = [...chineseQuestions];
                else questionPool = [...englishQuestions];
                shuffle(questionPool, true);
             }
             const q = questionPool.pop();
             mathProblem = { question: q.q, answer: q.a, type: 'chinese' };
           } else { // 預設為角色2的數學題
             const num1 = floor(random(1, 10));
             const num2 = floor(random(1, 10));
             mathProblem = { question: `${num1} + ${num2} = ?`, answer: num1 + num2, type: 'math' };
           }
           mathWindowState = 'asking'; // 回到提問狀態
           isCostumeChanged = false; // 重置角色5狀態，確保第二題時需要再次點擊才會出現
        } else {
           mathWindowState = 'instruction'; // 切換到指示畫面
        }
      }
    } else if (mathWindowState === 'instruction') {
      let btnX = winX + winW / 2 - 50;
      let btnY = winY + winH - 80;
      let btnW = 100;
      let btnH = 40;
      if (mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY && mouseY < btnY + btnH) {
        showStarPowerupWindow = false; // 關閉視窗
        isCorrectAnswer = true; // 觸發答對動畫
        currentFrame = 0;
      }
    } else if (mathWindowState === 'incorrect') {
      let btnX = winX + winW / 2 - 60;
      let btnY = winY + winH - 80;
      let btnW = 120;
      let btnH = 40;
      if (mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY && mouseY < btnY + btnH) {
        mathWindowState = 'retry_instruction'; // 切換到提示畫面
      }
    } else if (mathWindowState === 'retry_instruction') {
      let btnX = winX + winW / 2 - 50;
      let btnY = winY + winH - 80;
      let btnW = 100;
      let btnH = 40;
      if (mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY && mouseY < btnY + btnH) {
        showStarPowerupWindow = false; // 關閉視窗，玩家必須去吃下一顆星星
      }
    }
  }
}

function drawFadeEffect() {
  // --- 處理淡入淡出與重置 ---
  if (isFadingOut) {
    fadeAlpha += 5; // 漸暗速度
    if (fadeAlpha >= 255) {
      fadeAlpha = 255;
      isFadingOut = false;
      
      // 判斷是否在第二關 (背景2)
      const isStage2 = (bgImage === unnamedImage);
      const isStage3 = (bgImage === bg3Image); // 新增：判斷是否在第三關
      
      // 畫面全黑時執行重置
      p1HP = p1MaxHP;
      p2HP = p2MaxHP;
      isBattleMode = false;
      isTransitioning = false;
      showDialog = false;
      dialogueIndex = 0;
      currentFrame = 0;
      fallingItemY = -300;
      fallingItemVy = 0;
      hasFallingItemDropped = false;
      p1HasHit = false;
      p2HasHit = false;
      stars = []; // 重置遊戲時清空星星
      meteors = []; // 重置流星
      isCorrectAnswer = false;
      isFallingDownHole = false; // 重置掉落狀態
      fallCurtainHeight = 0; // 重置黑幕高度
      isRevealingNewBg = false; // 重置揭露動畫狀態
      revealCurtainY = 0; // 重置揭露動畫Y座標
      isWaitingOnBlackScreen = false; // 重置黑幕等待狀態
      blackScreenStartTime = 0; // 重置黑幕計時器
      isCostumeChanged = false; // 重置角色5狀態
      isChar3QuizCompleted = false; // 重置角色3問答狀態
      isChar4QuizCompleted = false; // 新增：重置角色4問答狀態
      
      coins = []; // 重置金幣
      coinCount = 0; // 重置金幣數量
      isChar4Active = false; // 重置角色4狀態
      char4CurrentFrame = 0; // 重置角色4動畫
      isChar4Attacking = false; // 重置角色4攻擊狀態
      isChar4DefeatItemFalling = false; // 新增：重置角色4戰敗掉落物狀態
      isChestOpened = false; // 新增：重置寶箱狀態
      musObject = null; // 新增：重置 MUS 物件
      if (isStage2) {
        // 如果是在第二關失敗，保留在第二關
        isGameStarted = true;
        isTitleScreen = false;
        isWakingUp = false;
        isFallingEntrance = false;
        hasFallenTransitionDone = true;
        bgImage = unnamedImage;
        
        // 重置角色位置 (從天而降)
        characterX = width / 2;
        characterY = -100;
        velocityY = 0;
        
        // 重置神秘事件
        isMysteryExploded = false;
        isChar3Active = false;
        char3CurrentFrame = 0;
        isChar3Attacking = false;
        
        punchUnlocked = true; // 確保能力已解鎖
        hasLockedForHalfHP = false;
      } else if (isStage3) {
        // 如果是在第三關失敗，保留在第三關
        isGameStarted = true;
        isTitleScreen = false;
        isWakingUp = false;
        isFallingEntrance = false;
        hasFallenTransitionDone = true;
        bgImage = bg3Image;
        
        // 重置角色位置 (從天而降)
        characterX = width / 2;
        characterY = -100;
        velocityY = 0;
        
        // 重置相關狀態
        punchUnlocked = true;
        hasLockedForHalfHP = false;
        dialogueTexts = char2Dialogues; // 重置對話以避免戰鬥狀態
      } else {
        // 如果是在第一關失敗，完全重置
        isGameStarted = false; // 回到睡覺狀態
        isTitleScreen = false; // 直接回到睡覺畫面
        isWakingUp = false;
        isFallingEntrance = false; // 重置掉落入場狀態
        hasFallenTransitionDone = false; // 重置轉場旗標
        bgImage = originalBgImage; // 重置背景
        
        characterX = width / 4;
        newCharX = width * 0.8;
        
        punchUnlocked = false; // 重置拳擊解鎖狀態
        hasLockedForHalfHP = false; // 重置半血鎖定狀態
        
        moveInstructionOpacity = 255;
        hasPlayerMoved = false;
        
        isMysteryExploded = false; // 重置神秘圖片狀態
        isChar3Active = false; // 重置角色3狀態
        char3CurrentFrame = 0; // 重置角色3動畫
        isChar3Attacking = false;
        isChar4Active = false; // 重置角色4
        char4CurrentFrame = 0; // 重置角色4動畫
        isChar4Attacking = false; // 重置角色4攻擊狀態
      isChar4DefeatItemFalling = false; // 新增：重置角色4戰敗掉落物狀態
      musObject = null; // 新增：重置 MUS 物件
      }
      
      isFadingIn = true; // 開始漸亮
    }
  } else if (isFadingIn) {
    fadeAlpha -= 5; // 漸亮速度與漸暗速度一致，達成無縫接軌
    if (fadeAlpha <= 0) {
      fadeAlpha = 0;
      isFadingIn = false;
    }
  }

  // 繪製黑色遮罩
  if (fadeAlpha > 0) {
    push();
    fill(0, fadeAlpha);
    noStroke();
    rect(0, 0, width, height);
    pop();
  }
}

// 繪製星形的輔助函式
function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function createExplosion(x, y) {
  // 觸發狀態改變：隱藏神秘圖片，顯示角色3並讓它跳出來
  isMysteryExploded = true;
  isChar3Active = true;
  char3X = x;
  char3Y = y;
  char3Vy = -20; // 向上跳出的初速度
  char3CurrentFrame = 0; // 重置動畫幀

  for (let i = 0; i < 500; i++) {
    explosionParticles.push({
      x: x + random(-50, 50),
      y: y + random(-50, 50),
      vx: random(-20, 20),
      vy: random(-20, 20),
      size: random(50, 150),
      color: color(255, random(50, 255), 0), // 火焰色系
      alpha: 255
    });
  }
}

// 新增：生成像素蘋果圖片的函式
function createPixelApple() {
  let img = createImage(16, 16);
  img.loadPixels();
  
  // 0:透明, 1:紅, 2:深紅, 3:綠(葉), 4:褐(梗), 5:亮光
  const map = [
    0,0,0,0,0,0,0,4,4,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,4,4,0,0,0,0,0,0,0,
    0,0,0,0,0,0,3,3,4,0,0,0,0,0,0,0,
    0,0,0,0,0,3,3,3,3,0,0,0,0,0,0,0,
    0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,
    0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,
    0,0,1,1,5,5,1,1,1,1,1,1,0,0,0,0,
    0,1,1,1,5,5,1,1,1,1,1,1,1,0,0,0,
    0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,
    0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,
    0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,
    0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,
    0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,
    0,0,1,1,1,1,0,0,1,1,1,1,0,0,0,0,
    0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
  ];
  
  for(let i=0; i<map.length; i++) {
    let x = i % 16;
    let y = floor(i / 16);
    let c = color(0, 0, 0, 0);
    if (map[i] === 1) c = color(220, 20, 60);
    else if (map[i] === 2) c = color(139, 0, 0);
    else if (map[i] === 3) c = color(50, 205, 50);
    else if (map[i] === 4) c = color(139, 69, 19);
    else if (map[i] === 5) c = color(255, 200, 200);
    img.set(x, y, c);
  }
  img.updatePixels();
  return img;
}

// 新增：生成像素金幣圖片的函式
function createPixelCoin() {
  let img = createImage(16, 16);
  img.loadPixels();
  
  // 0:透明, 1:金黃, 2:亮黃, 3:暗黃(邊框)
  const map = [
    0,0,0,0,3,3,3,3,3,3,0,0,0,0,0,0,
    0,0,0,3,2,2,2,2,2,2,3,0,0,0,0,0,
    0,0,3,2,2,1,1,1,1,2,2,3,0,0,0,0,
    0,3,2,2,1,1,1,1,1,1,2,2,3,0,0,0,
    0,3,2,1,1,1,1,1,1,1,1,2,3,0,0,0,
    3,2,1,1,1,1,3,3,1,1,1,1,2,3,0,0,
    3,2,1,1,1,1,3,3,1,1,1,1,2,3,0,0,
    3,2,1,1,1,1,1,1,1,1,1,1,2,3,0,0,
    3,2,1,1,1,1,1,1,1,1,1,1,2,3,0,0,
    3,2,1,1,1,1,1,1,1,1,1,1,2,3,0,0,
    0,3,2,1,1,1,1,1,1,1,1,2,3,0,0,0,
    0,3,2,2,1,1,1,1,1,1,2,2,3,0,0,0,
    0,0,3,2,2,1,1,1,1,2,2,3,0,0,0,0,
    0,0,0,3,2,2,2,2,2,2,3,0,0,0,0,0,
    0,0,0,0,3,3,3,3,3,3,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
  ];
  
  for(let i=0; i<map.length; i++) {
    let x = i % 16;
    let y = floor(i / 16);
    let c = color(0, 0, 0, 0);
    if (map[i] === 1) c = color(255, 215, 0); // Gold
    else if (map[i] === 2) c = color(255, 255, 0); // Yellow
    else if (map[i] === 3) c = color(184, 134, 11); // Dark Goldenrod
    img.set(x, y, c);
  }
  img.updatePixels();
  return img;
}
