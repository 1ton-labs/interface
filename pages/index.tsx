import { NextPage } from 'next';
import styles from '@/styles/Home.module.css'
import contents from '@/contents';
import Layout from '@/components/Layout';
import VanillaTilt from "vanilla-tilt";
import { useRef, FC, ReactNode, useEffect } from 'react';

type TiltProps = {
  children: ReactNode;
}

const Tilt: FC<TiltProps> = ({ children }) => {
  const tilt = useRef<HTMLDivElement>(null);
  const options = {
    scale: 1.0,
    speed: 1000,
    max: 30
  };
  useEffect(() => {
    if (tilt.current) {
      VanillaTilt.init(tilt.current, options);
    }
  }, [children])

  return (
    <div ref={tilt}>
      {children}
    </div>
  )
}

const Home: NextPage = () => {
  return (
    <>
      <Layout
        title={contents.title}
        description={contents.description}
        navbarLogo={contents.landing.navbar.logo}
        navbarItems={contents.landing.navbar.items}
      >
        <div className='mt-16 grid grid-cols-5 max-w-6xl font-main'>
          <div className='col-span-3 flex flex-col justify-start ml-6 mt-8'>
            <img
              src={contents.landing.logo}
              alt={contents.landing.description}
              className={`w-[150px] lg:w-[100px]`}
            />
            <div className='mt-5 ml-2'>
              <div className='font-normal text-2xl tracking-wide'>Empowering the Unbanked Creators with <br /> Valued Digital Assets</div>
              <div className='font-bold text-2xl tracking-wide my-10 '>BORROW, LEND, BOND</div>
              <div className='flex gap-10'>
                <a href={contents.landing.button1.link}>
                  <button className="h-9 px-7 font-medium text-sm rounded-lg bg-primary-light transition transition-500 text-black hover:opacity-70">{contents.landing.button1.name}</button>
                </a>
                <a href={contents.landing.button2.link} target="_blank" rel="noreferrer">
                  <button className="h-9 px-7 font-medium text-sm rounded-lg border border-primary-light transition transition-500 text-primary-light hover:opacity-70">{contents.landing.button2.name}</button>
                </a>
              </div>
            </div>

          </div>
          <div className='col-span-2'>
            <Tilt>
              <img
                src={contents.landing.nftview.logo.image}
                alt={contents.landing.nftview.logo.description}
              />
            </Tilt>
          </div>
        </div>
        <img
          src={contents.landing.holaA.image}
          alt={contents.landing.holaA.description}
          className="w-[700px] absolute -right-[200px] top-32 z-[-10]"
        />
        <img
          src={contents.landing.holaB.image}
          alt={contents.landing.holaB.description}
          className="w-[600px] absolute left-0 z-[-10]"
        />
      </Layout>
    </>
  )
}

export default Home;
