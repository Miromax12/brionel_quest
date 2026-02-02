
import { QuestStage, DailyTask, CandidateProfile, UserStatus } from './types';

export const INITIAL_STAGES: QuestStage[] = [
  {
    week: 1,
    title: "Фундамент бренду",
    missions: [
      { id: '1-1', title: 'Оптимізуй шапку профілю', description: 'Зроби чітке УТП та заклик до дії', type: 'PROFILE', xpReward: 50, isCompleted: false, requirementType: 'link' },
      { id: '1-2', title: 'Опублікуй reels про свій ранок', description: 'Покажи свою енергію та продукти', type: 'CONTENT', xpReward: 30, isCompleted: false, requirementType: 'link' },
      { id: '1-3', title: 'Тренування в симуляторі', description: 'Пройди 3 діалоги з типом "Зацікавлений"', type: 'EDUCATION', xpReward: 40, isCompleted: false, requirementType: 'auto' }
    ]
  },
  {
    week: 2,
    title: "Перші контакти",
    missions: [
      { id: '2-1', title: 'Напиши 5 новим людям', description: 'Використовуй шаблони з AI-асистента', type: 'COMMUNICATION', xpReward: 60, isCompleted: false, requirementType: 'screenshot' }
    ]
  },
  {
    week: 3,
    title: "Екосистема соцмереж",
    missions: [
      { id: '3-1', title: 'Створити Інста профіль', description: 'Повне заповнення та перехід на бізнес-аккаунт', type: 'PROFILE', xpReward: 100, isCompleted: false, requirementType: 'link' },
      { id: '3-2', title: 'Оформити YouTube канал', description: 'Створення шапки, лого та опису каналу', type: 'PROFILE', xpReward: 100, isCompleted: false, requirementType: 'link' },
      { id: '3-3', title: 'Запустити TikTok', description: 'Первинне налаштування профілю', type: 'PROFILE', xpReward: 50, isCompleted: false, requirementType: 'link' }
    ]
  },
  {
    week: 4,
    title: "Контентна стратегія",
    missions: [
      { id: '4-1', title: '3 Reels: Історія змін', description: 'Серія роликів про особисту трансформацію через продукт', type: 'CONTENT', xpReward: 150, isCompleted: false, requirementType: 'link' },
      { id: '4-2', title: '3 звичайні пости', description: 'Експертний контент у стрічку Instagram', type: 'CONTENT', xpReward: 90, isCompleted: false, requirementType: 'link' }
    ]
  },
  {
    week: 5,
    title: "Telegram Майстерність",
    missions: [
      { id: '5-1', title: 'Створити та оформити ТГ канал', description: 'Налаштування навігації та візуалу', type: 'PROFILE', xpReward: 80, isCompleted: false, requirementType: 'link' },
      { id: '5-2', title: 'Марафон: 5 постів у ТГ', description: 'Заповнення каналу цінним контентом', type: 'CONTENT', xpReward: 120, isCompleted: false, requirementType: 'auto' }
    ]
  },
  {
    week: 6,
    title: "Голос та Візуал",
    missions: [
      { id: '6-1', title: 'Серія з 5 подкастів', description: 'Аудіо-повідомлення з користю для аудиторії', type: 'CONTENT', xpReward: 200, isCompleted: false, requirementType: 'auto' },
      { id: '6-2', title: '3 Каруселі в Instagram', description: 'Навчальний контент у форматі карток', type: 'CONTENT', xpReward: 150, isCompleted: false, requirementType: 'link' }
    ]
  },
  {
    week: 7,
    title: "Експертне розпакування",
    missions: [
      { id: '7-1', title: '5 розпакувань продуктів', description: 'Професійний огляд складу та переваг продукції', type: 'RESULT', xpReward: 250, isCompleted: false, requirementType: 'link' }
    ]
  }
];

export const DAILY_CHECKLIST: DailyTask[] = [
  { id: 'd1', title: 'Написати 3 новим людям', xp: 30, type: 'NEW_PEOPLE', completed: false },
  { id: 'd2', title: 'Викласти сторіс', xp: 10, type: 'STORY', completed: false },
  { id: 'd3', title: 'Відповісти на коментарі', xp: 10, type: 'ENGAGEMENT', completed: false },
  { id: 'd4', title: 'Зробити 1 reels/пост', xp: 25, type: 'REELS', completed: false }
];

export const CANDIDATES: CandidateProfile[] = [
  { id: 'c1', name: 'Олена', type: 'INTERESTED', difficulty: 'EASY', description: 'Мама в декреті, шукає додатковий дохід.' },
  { id: 'c2', name: 'Михайло', type: 'SKEPTIC', difficulty: 'MEDIUM', description: 'Мав негативний досвід в іншому проекті.' },
  { id: 'c3', name: 'Ірина', type: 'BUSY', difficulty: 'MEDIUM', description: 'Власниця малого бізнесу, цінує свій час.' },
  { id: 'c4', name: 'Андрій', type: 'ANALYST', difficulty: 'HARD', description: 'Потребує цифр, фактів та детального маркетингу.' }
];

export const STATUS_THRESHOLDS = [
  { status: UserStatus.STARTER, minXp: 0 },
  { status: UserStatus.ACTIVE, minXp: 100 },
  { status: UserStatus.LEADER, minXp: 500 },
  { status: UserStatus.MASTER, minXp: 1500 },
  { status: UserStatus.LEGEND, minXp: 5000 }
];
