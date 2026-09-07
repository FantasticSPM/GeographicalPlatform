// 判断是否有定义
export const define = (value: any) => {
  return value !== undefined && value !== null;
};

// 生成随机昵称
export const generateRandomNickname = () => {
  const adjectives = [
    '快乐',
    '勇敢',
    '智慧',
    '善良',
    '坚强',
    '自由',
    '和平',
    '勇敢',
    '智慧',
    '善良',
    '坚强',
    '自由',
    '和平',
  ];
  const nouns = [
    '的',
    '孩子',
    '朋友',
    '战士',
    '战士',
    '战士',
    '战士',
    '战士',
    '战士',
    '战士',
    '战士',
    '战士',
    '战士',
  ];
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return randomAdjective + randomNoun;
};

// 生成一个唯一id
export const generateUniqueId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 3) | 8).toString(16);
  });
};
