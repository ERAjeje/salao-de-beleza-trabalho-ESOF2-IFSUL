import { useState, useEffect } from 'react'
import Head from 'next/head'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import styles from '../../styles/Home.module.css'
import { Container } from 'react-bootstrap'

import { useRouter } from 'next/router'
import { api } from '../../utils/api'
import Product from '../../components/productCrud/Product'


export default function Edit() {
  const [product, setProduct] = useState({});
  const router = useRouter();
  const token = router.query.token;
  const category = router.query.category;
  const id = router.query.id

  useEffect(() => {
    api.defaults.headers = { 'Authorization': `Bearer ${token}`};
    (async () => {
      const res = await api.get(`/products/${id}`).catch(err => console.log(err))
      if(!res){
        router.push({
          pathname: '/products',
          query: {
            category,
            token
          }
        }, '/products')
      }
      setProduct(res.data.data)
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
                    <Product products={product} category={category} token={token} />
                </Container>
            </main>

            <Footer className={styles.footer} />
        </div>
    )
}
