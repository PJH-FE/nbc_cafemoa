export default function getNowDate() {
  const offset = new Date().getTimezoneOffset() * 60000;
  const today = new Date(Date.now() - offset).toISOString();
  return today;
}
