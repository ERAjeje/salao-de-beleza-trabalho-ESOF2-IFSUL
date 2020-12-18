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
        const name = document.getElementById('name').value;
        const type = document.getElementById('type').value;
        const description = document.getElementById('description').value;
        const unitQuantity = parseFloat(document.getElementById('unitQuantity').value);
        const purchasePrice = parseFloat(document.getElementById('purchasePrice').value);
        const product = {
            type,
            description,
            name,
            unitQuantity,
            purchasePrice
        };
        const res = await api.post('/products', product)
        if (res.data.type) {
            router.push({
                pathname: '/products',
                query: {
                    token,
                    category
                }
            }, '/products')
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
                                    <Form.Label>Tipo</Form.Label>
                                    <Form.Control className={styles.formControl} as='input' id='type' />
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
                                    <Form.Label>Descrição</Form.Label>
                                    <Form.Control className={styles.formControl} as='input' id='description' />
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group>
                            <Row>
                                <Col>
                                    <Form.Label>Unidade (ml)</Form.Label>
                                    <Form.Control className={styles.formControl} as='input' id='unitQuantity' />
                                </Col>
                                <Col>
                                    <Form.Label>Preço</Form.Label>
                                    <Form.Control className={styles.formControl} as='input' id='purchasePrice' />
                                </Col>
                            </Row>
                        </Form.Group>
                        <Container className={styles.containerButtons}>
                            <input className={styles.button} onClick={handleClickCreate} type='button' id='create' value='Criar' />
                            <Link href={{
                                pathname: '/products',
                                query: {
                                    category: `${category}`,
                                    token: `${token}`
                                }
                            }} as='/products'>
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
