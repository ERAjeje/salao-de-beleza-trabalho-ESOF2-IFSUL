import Link from 'next/link'
import Head from 'next/head'
import Footer from '../../components/footer/Footer'
import React from 'react'
import { Container, Form, ListGroupItem, Row, Col } from 'react-bootstrap'

import { api } from '../../utils/api'
import { useRouter } from 'next/router'

import styles from '../../styles/Home.module.css'


export default function Create() {
    const router = useRouter();
    const token = router.query.token;
    const category = router.query.category;

    const handleClickCreate = async () => {
        const cpf = document.getElementById('cpf').value;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const cellphone = document.getElementById('cellphone').value;
        const password = document.getElementById('password').value;
        const passwordConfirmation = document.getElementById('passwordConf').value;
        if (password !== passwordConfirmation) {
            alert("Erro: A senha e a confirmação devem ser iguais");
        } else {
            const client = {
                cpf,
                cellphone,
                name,
                email,
                password
            };
            const res = await api.post('/client/signup', client)
            if (res.data.token) {
                router.push({
                    pathname: '/clients',
                    query: {
                        token,
                        category
                    }
                }, '/clients')
            }
        }
    }

    return (
        <div className={styles.container} >
            <Head>
                <title>Salão de Beleza</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Container className={styles.containerB} fluid={true} >
                    <ListGroupItem >
                        <Form.Group>
                            <Row>
                                <Col>
                                    <Form.Label>CPF</Form.Label>
                                    <Form.Control className={styles.formControl}  as='input' id='cpf' />
                                </Col>
                                <Col>
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control className={styles.formControl} as='input' id='name' />
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group>
                            <Row>
                                <Col>
                                    <Form.Label>E-Mail</Form.Label>
                                    <Form.Control className={styles.formControl} as='input' id='email' />
                                </Col>
                                <Col>
                                    <Form.Label>Celular</Form.Label>
                                    <Form.Control className={styles.formControl}  as='input' id='cellphone' />
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group>
                            <Row>
                                <Col>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control className={styles.formControl}   type='password' id='password' />
                                </Col>
                                <Col>
                                    <Form.Label>Confirmação de Password</Form.Label>
                                    <Form.Control className={styles.formControl}   type='password' id='passwordConf' />
                                </Col>
                            </Row>
                        </Form.Group>
                        <Container className={styles.containerButtons}>
                            <input className={styles.button} onClick={handleClickCreate} type='button' id='create' value='Criar' />
                            <Link href={{
                                pathname: '/clients',
                                query: {
                                    category: `${category}`,
                                    token: `${token}`
                                }
                            }} as='/clients'>
                                <input className={styles.button} type='button' id='cancel' value='Cancelar' />
                            </Link>
                        </Container>
                    </ListGroupItem>
                </Container >

            </main>

            <Footer className={styles.footer} />
        </div>
    )
}
