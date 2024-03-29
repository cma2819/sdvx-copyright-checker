import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { SearchSongs } from '../components/SearchSongs';
import { Song } from '../modules/songs';
import { readSongs } from '../store/song.store';
import styles from '../styles/Home.module.css'

type Props = {
  updatedAt: string;
  songs: Song[];
};

export const getStaticProps: GetStaticProps<Props> = () => {
  const { songs, updatedAt } = readSongs();
  return {
    props: {
      updatedAt: updatedAt,
      songs: songs,
    }
  };
}

const Home: NextPage<Props> = ({ updatedAt, songs }) => {

  return (
    <div className={styles.container}>
      <Head>
        <title>SDVX Copyright Checker</title>
        <meta name="description" content="Sound Voltex に収録されている楽曲の版権チェックツールです." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          SDVX Copyright Checker
        </h1>
        <p>
          updated at: {updatedAt}
        </p>

        <div className={styles.search}>
          <SearchSongs songs={songs} />
        </div>

      </main>

      <footer className={styles.footer}>
        <div>
          ご意見・ご要望は
          <a href="https://twitter.com/cma2819" target="_blank" rel="noreferrer">Twitter</a>
          または
          <a href="https://github.com/cma2819/sdvx-copyright-checker/issues" target="_blank" rel="noreferrer">GitHub issues</a>
          までお願いします。
        </div>
        <div>
          &copy; cma2819
        </div>
      </footer>
    </div>
  )
}

export default Home
