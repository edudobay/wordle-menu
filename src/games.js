/**
 * @type {[GameData]}
 */
import sortArray from 'sort-array';

export const games = [
  { name: 'Wördl', lang: 'de', country: 'AT', url: 'https://wordle.at/' },
  { name: '6mal5.com', lang: 'de', url: 'https://www.6mal5.com/' },
  { name: 'Le Mot - Wordle en français', lang: 'fr', url: 'https://wordle.louan.me/', resetTime: { timeZone: 'Europe/Berlin' } },
  { name: 'Wordle (ES)', lang: 'es', url: 'https://wordle.danielfrg.com/', resetTime: { timeZone: 'America/New_York' } },
  { name: 'PAR🇮🇹LE', lang: 'it', url: 'https://pietroppeter.github.io/wordle-it/' },
  { name: 'Szó reggelt!', lang: 'hu', url: 'https://jealousmarkup.xyz/szofejto/', resetTime: { localTime: 4 * 60 } }, // Resets at 4:00, local time },
  { name: 'Termo', lang: 'pt', country: 'BR', url: 'https://term.ooo/' },
  { name: 'Letreco', lang: 'pt', country: 'BR', url: 'https://www.gabtoschi.com/letreco/' },
  { name: 'Charada', lang: 'pt', country: 'BR', url: 'https://charada.app/', infinitePlay: true },
  { name: 'Palavra do dia', lang: 'pt', country: 'PT', url: 'https://palavra-do-dia.pt/' },
  { name: 'Wordle (RU)', lang: 'ru', url: 'https://wordle.belousov.one/', resetTime: { timeZone: 'UTC' } },
  { name: 'Wordle', lang: 'en', url: 'https://www.nytimes.com/games/wordle/index.html' },
  { name: 'WordleCAT', lang: 'ca', url: 'https://gelozp.com/games/wordle/' },
  { name: 'WordleGame', lang: 'en', url: 'https://wordlegame.org/', infinitePlay: true },
  { name: 'Quordle', lang: 'en', url: 'https://www.quordle.com/' },
  { name: 'WordleGame en Français', lang: 'fr', url: 'https://wordlegame.org/wordle-in-french', infinitePlay: true },
  { name: 'WordleGame auf Deutsch', lang: 'de', url: 'https://wordlegame.org/wordle-in-german', infinitePlay: true },
  { name: 'WordleGame en Español', lang: 'es', url: 'https://wordlegame.org/wordle-in-spanish', infinitePlay: true },
  { name: 'WordleGame em Português', lang: 'pt', url: 'https://wordlegame.org/wordle-in-portuguese', infinitePlay: true },
  { name: 'WordleGame in Italiano', lang: 'it', url: 'https://wordlegame.org/wordle-in-italian', infinitePlay: true },
  { name: 'WordleGame на Русском', lang: 'ru', url: 'https://wordlegame.org/wordle-in-russian', infinitePlay: true },
];

sortArray(games, { by: ['lang', 'name'] });
