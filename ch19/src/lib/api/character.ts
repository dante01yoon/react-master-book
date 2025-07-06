export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface CharactersResponse {
  info: Info;
  results: Character[];
}

/**
 * 모든 캐릭터 목록을 가져오는 함수
 * @returns {Promise<CharactersResponse>}
 */
export async function getCharacters(): Promise<CharactersResponse> {
  console.log('getCharacters 호출');
  // 1초 딜레이 추가
  await new Promise(resolve => setTimeout(resolve, 1000));
  const response = await fetch('https://rickandmortyapi.com/api/character');
  if (!response.ok) {
    throw new Error('Failed to fetch characters');
  }
  return response.json();
}

/**
 * 특정 ID의 캐릭터 정보를 가져오는 함수
 * @param {string} id - 캐릭터 ID
 * @returns {Promise<Character>}
 */
export async function getCharacter(id: string): Promise<Character> {
  console.log('getCharacter 호출');
  // 1초 딜레이 추가
  await new Promise(resolve => setTimeout(resolve, 1000));
  const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch character');
  }
  return response.json();
} 