import { NextPage } from 'next';
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import contents from '@/contents';
import { THEME } from '@/constants';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{contents.title}</title>
        <meta name="description" content={contents.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p className="inline">
            We are&nbsp;
            <code className={styles.code}>{contents.team.name}</code>
            . Follow us on&nbsp;
            <a
              href={contents.team.link}
              className="underline hover:font-bold"
              target="_blank"
              rel="noopener noreferrer"
            >Github</a>
            .
          </p>
          <div>
            <a
              href={contents.logo.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              {/* <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              /> */}
              <Image
                src={contents.logo.image}
                alt={contents.logo.description}
                className={styles.vercelLogo}
                width={contents.logo.width}
                height={contents.logo.height}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.center + " " + (THEME === "1ton" ? styles.center1ton : styles.centerSprout)}>
          {/* <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <div className={styles.thirteen}>
            <Image
              src="/thirteen.svg"
              alt="13"
              width={40}
              height={31}
              priority
            />
          </div> */}
          <div className='min-w-[300px] sm:px-0 md:px-20 lg:px-32 flex flex-col items-center gap-8 sm:gap-10 lg:gap-12 text-center'>
            <h1 className='font-inter text-2xl sm:text-3xl lg:text-4xl font-bold lg:leading-tight'>{contents.oneliner}</h1>
            <p className='font-inter text-xl sm:text-2xl lg:text-2xl [&>span]:text-accent' dangerouslySetInnerHTML={{ __html: contents.subliner }}></p>
          </div>
        </div>

        <div className={styles.grid}>
          <a
            href="/treasury"
            className={styles.card}
            // target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="font-inter">
              {contents.button1.name} <span>-&gt;</span>
            </h2>
            <p className="font-inter">
              {contents.button1.description}
            </p>
          </a>

          <a
            href="/finance"
            className={styles.card}
            // target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="font-inter">
              {contents.button2.name} <span>-&gt;</span>
            </h2>
            <p className="font-inter">
              {contents.button2.description}
            </p>
          </a>

          {/* <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Templates <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Discover and deploy boilerplate example Next.js&nbsp;projects.
            </p>
          </a> */}

          {/* <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Deploy <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Instantly deploy your Next.js site to a shareable URL
              with&nbsp;Vercel.
            </p>
          </a> */}
        </div>
      </main>
    </>
  )
}

export default Home;
