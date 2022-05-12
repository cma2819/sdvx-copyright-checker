import puppeteer from 'puppeteer';

type SongId = string;

export type Song = {
  id: SongId;
  name: string;
  artist: string;
  copyright: string|null;
};

const LIST_URL = 'https://p.eagate.573.jp/game/sdvx/vi/music/index.html' as const;

export const fetchPagesCount = async (): Promise<number> => {
  const browser = await puppeteer.launch();

  console.debug('Open song index page for get pages count.');
  const songIndexPage = await browser.newPage();
  await songIndexPage.goto(LIST_URL);

  await songIndexPage.waitForSelector('select#search_page');
  const lastOption = (await songIndexPage.$$('select#search_page option')).pop();
  if (!lastOption) {
    throw new Error('Song page select not has any option.');
  }

  return (await lastOption.getProperty('value')).jsonValue<number>();
}

export const loadSongsIn = async (page: number): Promise<Song[]> => {
  const browser = await puppeteer.launch();

  console.debug(`Open song index page = ${page}`);
  const songIndexPage = await browser.newPage();
  await songIndexPage.goto(`${LIST_URL}?page=${page}`);
  await songIndexPage.waitForSelector('div#music');

  const aJackets = await songIndexPage.$$<HTMLLinkElement>('div.jk > a');
  const results = aJackets.reduce((promise, a) => {
    return promise.then(async (prev) => {
      const detailUrl = new URL(await (await a.getProperty('href')).toString());
      const id = detailUrl.searchParams.get('music_id');
      if (!id) {
        throw new Error('Cannot get song\s id, unknown html contexts.');
      }
      console.debug(`Fetching song: ${id} ...`);

      while (true) {
        try {
          await a.evaluate((elm) => elm.click());
          await songIndexPage.waitForSelector('div#music-data', {
            visible: true
          });
          break;
        } catch (err) {
          console.info('Missing info element, etry.');
          const button = await songIndexPage.$<HTMLButtonElement>('button#cboxClose');
          await button?.evaluate((b) => b.click());
          continue;
        }
      }
  
      const [name, artist] = await Promise.all((
        await songIndexPage.$$<HTMLParagraphElement>('div#music-data div.info p')
      ).map(async (p) => (await p.getProperty('textContent')).jsonValue<string>()));

      const copyright = await (await (await songIndexPage.$('div#music-data div#copy'))?.getProperty('textContent'))?.jsonValue<string>();

      await songIndexPage.waitForSelector('button#cboxClose');
      const button = await songIndexPage.$<HTMLButtonElement>('button#cboxClose');
      await button?.evaluate((b) => b.click());
      
      return songIndexPage.waitForSelector('div#music-data', {
        hidden: true
      }).then((() => {
        return [
          ...prev,
          {
            id,
            name,
            artist,
            copyright: !copyright || copyright === '' ? null : copyright,
          },
        ]
      }));
    });

  }, Promise.resolve<Song[]>([]));

  Promise.all(await results).then(async () => {
    await browser.close();
  });

  return results;
}
