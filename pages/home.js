import Head from 'next/head'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import styles from '../styles/Home.module.css'

export default function Home() {

    let category;
    if(typeof window !== "undefined"){
        category = localStorage.getItem('category')
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Salão de Beleza</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Header />
                {
                    category == 1 
                    ? 'Dashboard adm'
                    : 'Agendar Procedimento'
                }
            </main>

            <Footer className={styles.footer} />
        </div>
    )
}
