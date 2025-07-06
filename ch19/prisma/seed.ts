import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// API 응답 타입 정의
interface ApiCharacter {
  id: number;
  name: string;
}

interface ApiEpisode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[]; // 캐릭터 URL 배열
  url: string;
  created: string;
}

async function main() {
  console.log(`Start seeding ...`);

  // 기존 데이터 삭제
  await prisma.episode.deleteMany({});
  await prisma.character.deleteMany({});
  console.log('기존 데이터 삭제 완료');

  // Rick and Morty API에서 처음 20개 에피소드 정보를 가져와서 DB에 저장
  for (let i = 1; i <= 20; i++) {
    try {
      const episodeResponse = await fetch(
        `https://rickandmortyapi.com/api/episode/${i}`
      );
      if (!episodeResponse.ok) continue;

      const episodeData = (await episodeResponse.json()) as ApiEpisode;

      const characterApiIds: number[] = [];
      for (const url of episodeData.characters) {
        const charResponse = await fetch(url);
        if (!charResponse.ok) continue;
        const charData = (await charResponse.json()) as ApiCharacter;

        await prisma.character.upsert({
          where: { apiId: charData.id },
          update: { name: charData.name },
          create: {
            apiId: charData.id,
            name: charData.name,
          },
        });
        characterApiIds.push(charData.id);
      }

      // 에피소드 생성 및 모든 캐릭터와 연결
      await prisma.episode.create({
        data: {
          apiId: episodeData.id,
          title: episodeData.name,
          air_date: episodeData.air_date,
          episode: episodeData.episode,
          url: episodeData.url,
          characters: {
            connect: characterApiIds.map((apiId) => ({ apiId })),
          },
        },
      });

      console.log(`Created episode "${episodeData.name}"`);
    } catch (error) {
      console.error(`Failed to seed episode ${i}:`, error);
    }
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