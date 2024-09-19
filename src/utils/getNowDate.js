export default function getNowDate() {
  const offset = new Date().getTimezoneOffset() * 60000;
  const todayFull = new Date(Date.now() - offset).toISOString();
  const today = todayFull.replace('T', ' ').split('.')[0];
  return today;
}
