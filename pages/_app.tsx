import '../styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AppProps } from 'next/app';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  // // Mimic getInitialProps logic using useEffect
  // useEffect(() => {
  //   // Your global data fetching logic here
  //   const fetchData = async () => {
  //     // Fetch global data
  //     const globalData = await fetch('/api/global-data');
  //     const globalDataJson = await globalData.json();
  //     // Do something with global data
  //   };

  //   fetchData();
  // }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}

export default MyApp;