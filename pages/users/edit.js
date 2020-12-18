import { useState, useEffect } from 'react'
import Head from 'next/head'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import styles from '../../styles/Home.module.css'
import Card from '../../components/userCrud/Card'
import { Container } from 'react-bootstrap'
import User from '../../components/userCrud/User'

import { useRouter } from 'next/router'
import { api } from '../../utils/api'


export default function Edit() {
  const [user, setUser] = useState({});
  const router = useRouter();
  const token = router.query.token;
  const category = router.query.category;
  const id = router.query.id

  useEffect(() => {
    api.defaults.headers = { 'Authorization': `Bearer ${token}`};
    (async () => {
      const res = await api.get(`/user/id/${id}`).catch(err => console.log(err))
      setUser(res.data)
    })()
  }, [])

    return (
        <div className={styles.container} >
            <Head>
                <title>Salão de Beleza</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Header />
                <Container>
                    <User users={user} category={category} token={token} />
                </Container>
            </main>

            <Footer className={styles.footer} />
        </div>
    )
}
