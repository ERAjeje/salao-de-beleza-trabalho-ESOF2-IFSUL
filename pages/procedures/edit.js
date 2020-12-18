import { useState, useEffect } from 'react'
import Head from 'next/head'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import styles from '../../styles/Home.module.css'
import Card from '../../components/procedureCrud/Card'
import { Container } from 'react-bootstrap'

import { useRouter } from 'next/router'
import { api } from '../../utils/api'
import Procedure from '../../components/procedureCrud/Procedure'


export default function Edit() {
  const [procedure, setProcedure] = useState({});
  const router = useRouter();
  const token = router.query.token;
  const category = router.query.category;
  const id = router.query.id
  useEffect(() => {
    let state;
    api.defaults.headers = { 'Authorization': `Bearer ${token}`};
    (async () => {
      const res = await api.get(`/procedure/${id}`).catch(err => console.log(err))
      state = res.data;
      setProcedure(state.data);
    })()
  }, [id])

    return (
        <div className={styles.container} >
            <Head>
                <title>Salão de Beleza</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Header />
                <Container>
                    <Procedure procedures={procedure} category={category} token={token} />
                </Container>
            </main>

            <Footer className={styles.footer} />
        </div>
    )
}
