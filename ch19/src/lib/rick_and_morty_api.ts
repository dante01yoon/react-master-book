export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  image: string;
}

export interface ApiResponse {
  results: Character[];
}

/**
 * Rick and Morty API에서 캐릭터 목록을 가져오는 함수
 * @returns {Promise<ApiResponse>} 캐릭터 데이터 Promise
 */
export const getCharacters = async (): Promise<ApiResponse> => {
  console.log('[API] Rick and Morty 캐릭터 데이터 요청 시작...');
  // 데이터 페칭에 시간이 걸리는 상황을 시뮬레이션하기 위해 2초 지연
  await new Promise(resolve => setTimeout(resolve, 2000));

  const response = await fetch('https://rickandmortyapi.com/api/character');
  if (!response.ok) {
    throw new Error('Failed to fetch characters');
  }
  const data = await response.json();
  console.log('[API] Rick and Morty 캐릭터 데이터 수신 완료.');
  return data;
}; 