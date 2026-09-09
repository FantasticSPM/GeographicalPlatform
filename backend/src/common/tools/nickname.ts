const moods = [
  '温柔',
  '清醒',
  '安静',
  '慵懒',
  '自由',
  '浪漫',
  '洒脱',
  '迷糊',
  '热烈',
  '平静',
  '温暖',
  '随性',
];

const nature = [
  '晚风',
  '微风',
  '清风',
  '月光',
  '星河',
  '银河',
  '云朵',
  '晨雾',
  '山川',
  '南山',
  '落日',
  '夕阳',
  '细雨',
  '春风',
  '秋水',
  '长夜',
];

const animals = [
  '小猫',
  '小熊',
  '狐狸',
  '兔子',
  '海豚',
  '鲸鱼',
  '松鼠',
  '小鹿',
];

const people = ['少年', '少女', '旅人', '过客', '诗人', '行者', '浪客', '看客'];

const actions = [
  '听风',
  '看海',
  '望月',
  '追光',
  '逐梦',
  '远行',
  '漫游',
  '发呆',
  '等风',
  '听雨',
  '看云',
  '赏月',
];

const objects = [
  '月亮',
  '星星',
  '太阳',
  '大海',
  '山川',
  '云朵',
  '灯火',
  '远方',
  '黄昏',
  '清晨',
  '四季',
  '银河',
];

const templates = [
  () => `${random(moods)}${random(nature)}`,
  () => `${random(nature)}${random(people)}`,
  () => `${random(moods)}${random(animals)}`,
  () => `${random(nature)}${random(actions)}`,
  () => `${random(actions)}${random(objects)}`,
  () => `${random(moods)}的${random(people)}`,
  () => `${random(nature)}的${random(people)}`,
  () => `${random(actions)}的${random(objects)}`,
  () => `${random(moods)}的${random(nature)}`,
  () => `${random(nature)}与${random(objects)}`,
  () => `${random(people)}与${random(objects)}`,
];

function random<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 生成随机昵称
export function generateRandomNickname() {
  return random(templates)();
}
