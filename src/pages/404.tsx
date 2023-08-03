import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Admin() {
  return (
    <>
      <Head>
        <title>Manage Some Awesome Tickets</title>
      </Head>
      <main className={`${inter.className}`}>
        <h1>404</h1>
        <h2>This page could not be found, weary traveler.</h2>
        <Image
          src="https://i.kym-cdn.com/entries/icons/facebook/000/039/993/resthere.jpg"
          height={200}
          width={400}
          alt="Knight sitting resting by a fire."
        />
      </main>
    </>
  );
}
