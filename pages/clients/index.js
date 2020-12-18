import { useEffect, useState } from 'react'
import Head from 'next/head'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import styles from '../../styles/Home.module.css'
import CardComponent from '../../components/clientCrud/Card'
import { Card, Col, Row, Container, ListGroup, ListGroupItem } from 'react-bootstrap'
import { api } from '../../utils/api'

import { useRouter } from 'next/router'

export default function Clients() {
  const router = useRouter();
  const [clients, setClients] = useState([])

  const token = router.query.token;
  const category = router.query.category;

  const handleEditClick = ({ target }) => {
    router.push({
      pathname: '/clients/edit',
      query: {
        category,
        token,
        id: `${target.id}`
      }
    }, `/clients/edit/${target.id}`)
  }

  const handleDeleteClick = async ({ target }) => {
    const id = target.id;
    api.defaults.headers = { 'Authorization': `Bearer ${token}`};
    const res = await api.delete(`/client/${id}`);
    if(res.status === 200){
        const data = await api.get('/client/clients');
        setClients(data.data)
    }
  }

  useEffect(() => {
    (async () => {
      api.defaults.headers = { 'Authorization': `Bearer ${token}`}
      const res = await api.get('/client/clients').catch(err => console.log(err))
        setClients(res.data)
      
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
                  clients.map(client => {
                    return (
                      <ListGroupItem key={client.id}>
                        <Row>
                          <Col xs='2'>
                            <span>{client.id}</span>
                          </Col>
                          <Col xs='6'>
                            <h6>{client.name}</h6>
                          </Col>
                          <Col>
                            <Row>
                              <Col>
                                <input className={styles.button} onClick={handleEditClick} type='button' id={client.id} value='Editar' />
                              </Col>
                              <Col>
                                <input className={styles.button} onClick={handleDeleteClick} type='button' id={client.id} value='Excluir' />
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
