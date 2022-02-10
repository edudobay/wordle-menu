/**
 * @type {[GameData]}
 */
import sortArray from 'sort-array';

export const games = [
  {
    name: 'Wordle auf Deutsch - Das Original',
    lang: 'de',
    country: 'AT',
    url: 'https://wordle.at/',
  },
  {
    name: 'Wordle auf Deutsch - wordle-spielen.de',
    lang: 'de',
    url: 'https://wordle.uber.space/',
  },
  {
    name: 'Le Mot - Wordle en français',
    lang: 'fr',
    url: 'https://wordle.louan.me/',
  },
  {
    name: 'Wordle (ES)',
    lang: 'es',
    url: 'https://wordle.danielfrg.com/',
  },
  {
    name: 'PAR🇮🇹LE',
    lang: 'it',
    url: 'https://pietroppeter.github.io/wordle-it/',
  },
  {
    name: 'Szó reggelt!',
    lang: 'hu',
    url: 'https://jealousmarkup.xyz/szofejto/',
  },
  {
    name: 'Termo',
    lang: 'pt',
    country: 'BR',
    url: 'https://term.ooo/',
  },
  {
    name: 'Letreco',
    lang: 'pt',
    country: 'BR',
    url: 'https://www.gabtoschi.com/letreco/',
  },
  {
    name: 'Palavra do dia',
    lang: 'pt',
    country: 'PT',
    url: 'https://palavra-do-dia.pt/',
  },
  {
    name: 'Wordle (RU)',
    lang: 'ru',
    url: 'https://wordle.belousov.one/',
  },
  {
    name: 'Wordle',
    lang: 'en',
    url: 'https://www.powerlanguage.co.uk/wordle/',
  },
];

sortArray(games, { by: ['lang', 'name'] });
