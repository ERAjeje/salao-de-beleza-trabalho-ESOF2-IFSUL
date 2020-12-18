import { useEffect, useState } from 'react'
import Head from 'next/head'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import styles from '../../styles/Home.module.css'
import CardComponent from '../../components/userCrud/Card'
import { Card, Col, Row, Container, ListGroup, ListGroupItem } from 'react-bootstrap'
import { api } from '../../utils/api'

import { useRouter } from 'next/router'

export default function Users() {
  const router = useRouter();
  const [users, setUsers] = useState([])

  const token = router.query.token;
  const category = router.query.category;

  const handleEditClick = ({ target }) => {
    router.push({
      pathname: '/users/edit',
      query: {
        category,
        token,
        id: `${target.id}`
      }
    }, `/users/edit/${target.id}`)
  }

  const handleDeleteClick = async ({ target }) => {
    const id = target.id;
    api.defaults.headers = { 'Authorization': `Bearer ${token}`};
    const res = await api.delete(`/user/${id}`);
    const data = await api.get('/users');
    setUsers(data.data)
  }

  useEffect(() => {
    (async () => {
      api.defaults.headers = { 'Authorization': `Bearer ${token}`}
      const res = await api.get('/users').catch(err => console.log(err))
        setUsers(res.data)
      
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
                  users.map(user => {
                    return (
                      <ListGroupItem key={user.id}>
                        <Row>
                          <Col xs='2'>
                            <span>Código</span>
                            <h6 className={styles.h6Codigo}>{user.id}</h6>
                          </Col>
                          <Col xs='6'>
                            <span>Nome</span>
                            <h6>{user.name}</h6>
                          </Col>
                          <Col>
                            <Row>
                              <Col>
                                <input className={styles.button} onClick={handleEditClick} type='button' id={user.id} value='Editar' />
                              </Col>
                              <Col>
                                <input className={styles.button} onClick={handleDeleteClick} type='button' id={user.id} value='Excluir' />
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
