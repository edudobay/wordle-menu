type TimezoneOffsetInMinutes = number;

interface ResetTime {
  localTime?: number;
  timeZone: string;
}

export interface GameData {
  lang: string;
  country?: string;
  url: string;
  name: string;
  resetTime?: ResetTime;
  infinitePlay?: boolean;
}

export const games: Array<GameData>;
