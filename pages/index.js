import Head from 'next/head'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Salão de Beleza</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Header />
      </main>

      <Footer className={styles.footer} />
    </div>
  )
}
