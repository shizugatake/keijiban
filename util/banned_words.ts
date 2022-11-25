
export const BanWords = [
  "禁止",
  "秘匿",
  "BANNED",
  "任意の規制するべき言葉"
];

export const hasBanWords = (message: string) =>{
  let censored = message;
  for(const w of BanWords){
    const regexp = new RegExp(w, 'g');
    censored = censored.replace(regexp, "○".repeat(w.length));
  }
  return censored;
}
