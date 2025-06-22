import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 외부 API 응답에 대한 타입 정의
interface ApiEpisode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

async function main() {
  console.log(`Start seeding ...`);

  // Rick and Morty API에서 처음 5개 에피소드 정보를 가져와서 DB에 저장
  for (let i = 1; i <= 5; i++) {
    const response = await fetch(`https://rickandmortyapi.com/api/episode/${i}`);
    const data = (await response.json()) as ApiEpisode;

    const episode = await prisma.episode.create({
      data: {
        id: data.id,
        name: data.name,
        air_date: data.air_date,
        episode: data.episode,
        // API의 characters는 문자열 배열이지만, 우리 스키마는 String이므로 join으로 합침
        characters: data.characters.join(','),
        url: data.url,
        created: new Date(data.created),
      },
    });
    console.log(`Created episode with id: ${episode.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 