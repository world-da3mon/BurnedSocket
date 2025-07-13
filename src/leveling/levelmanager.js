const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/levels.json');

const levelRoles = {
  5: '1393626117000400906',
  10: '1393626113758199862',
  25: '1393626106485145712',
  50: '1393626104199381212',
  100: '1393626101523153060'
};

function loadLevels() {
  if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, '{}');
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
}

function saveLevels(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

function getUserLevelData(userId) {
  const data = loadLevels();
  if (!data[userId]) {
    data[userId] = { xp: 0, level: 1 };
    saveLevels(data);
  }
  return data[userId];
}

function addXp(userId, xpAmount) {
  const data = loadLevels();
  if (!data[userId]) data[userId] = { xp: 0, level: 1 };

  const user = data[userId];
  user.xp += xpAmount;

  const xpNeeded = Math.floor(100 * Math.pow(1.2, user.level));
  let leveledUp = false;

  if (user.xp >= xpNeeded) {
    user.level += 1;
    user.xp = 0;
    leveledUp = true;
  }

  saveLevels(data);
  return { level: user.level, leveledUp };
}

function getRoleForLevel(level) {
  return levelRoles[level] || null;
}

function getAllLevelRoles() {
  return Object.values(levelRoles);
}

module.exports = {
  getUserLevelData,
  addXp,
  getRoleForLevel,
  getAllLevelRoles
};
