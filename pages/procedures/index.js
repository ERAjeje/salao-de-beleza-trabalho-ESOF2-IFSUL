import { useEffect, useState } from 'react'
import Head from 'next/head'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import styles from '../../styles/Home.module.css'
import CardComponent from '../../components/procedureCrud/Card'
import { Card, Col, Row, Container, ListGroup, ListGroupItem } from 'react-bootstrap'
import { api } from '../../utils/api'

import { useRouter } from 'next/router'

export default function Procedures() {
  const router = useRouter();
  const [procedures, setProcedures] = useState([])

  const token = router.query.token;
  const category = router.query.category;

  const handleEditClick = ({ target }) => {
    router.push({
      pathname: '/procedures/edit',
      query: {
        category,
        token,
        id: `${target.id}`
      }
    }, `/procedures/edit/${target.id}`)
  }

  const handleDeleteClick = async ({ target }) => {
    const id = target.id;
    console.log(id)
    api.defaults.headers = { 'Authorization': `Bearer ${token}`};
    const res = await api.delete(`/procedure/delete/${id}`);
    if(res.status === 200){
        const data = await api.get('/procedure');
        setProcedures(data.data)
    }
  }

  useEffect(() => {
    (async () => {
      api.defaults.headers = { 'Authorization': `Bearer ${token}`}
      const res = await api.get('/procedure').catch(err => console.log(err))
        setProcedures(res.data)
      
    })()
  }, [router])

  return (
    <div className={styles.container} >
      <Head>
        <title>Salão de Beleza</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Header />
        <Container>
          <CardComponent />
          <Container>
            <Card>
              <ListGroup variant='flush'>
                {
                  procedures.map(product => {
                    return (
                      <ListGroupItem key={product.id}>
                        <Row>
                          <Col xs='2'>
                            <span>Código</span>
                            <h6 className={styles.h6Codigo}>{product.id}</h6>
                          </Col>
                          <Col xs='6'>
                            <span>Procedimento</span>
                            <h6>{product.name}</h6>
                          </Col>
                          <Col>
                            <Row>
                              <Col>
                                <input className={styles.button} onClick={handleEditClick} type='button' id={product.id} value='Editar' />
                              </Col>
                              <Col>
                                <input className={styles.button} onClick={handleDeleteClick} type='button' id={product.id} value='Excluir' />
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </ListGroupItem>
                    )
                  })
                }
              </ListGroup>
            </Card>
          </Container>
        </Container>
      </main>

      <Footer className={styles.footer} />
    </div>
  )
}
