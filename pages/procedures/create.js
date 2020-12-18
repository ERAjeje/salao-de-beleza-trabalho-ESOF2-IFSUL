import Link from 'next/link'
import Head from 'next/head'
import Footer from '../../components/footer/Footer'
import React, { useEffect, useState } from 'react'
import { Container, Form, ListGroupItem, Row, Col } from 'react-bootstrap'

import { api } from '../../utils/api'
import { useRouter } from 'next/router'

import styles from '../../styles/Home.module.css'


export default function Create() {
    const [state, setstate] = useState([])
    const router = useRouter();
    const token = router.query.token;
    const category = router.query.category;
    const products = [];

    const handleSelectItem = () => {
        const product = document.getElementById('products');
        const unitQuantity = document.getElementById('productUnit');
        const amount = document.getElementById('productAmount');
        products.push({
            productId: product.value,
            unit: unitQuantity.value,
            amount: amount.value
        });
        product.value = '';
        unitQuantity.value = '';
        amount.value = '';
    }

    const handleClickCreate = async () => {
        const name = document.getElementById('name').value;
        const type = document.getElementById('type').value;
        const description = document.getElementById('description').value;


        const procedure = {
            type,
            description,
            name,
            products
        };
        const res = await api.post('/procedure', procedure)
        if (res.data.type) {
            router.push({
                pathname: '/procedures',
                query: {
                    token,
                    category
                }
            }, '/procedures')
        }
    }
    useEffect(() => {
        api.defaults.headers = { 'Authorization': `Bearer ${token}` };
        (async () => {
            const res = await api.get('/products')
            const products = res.data;
            setstate(products)
        })()
    }, [])

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
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control className={styles.formControl} as='input' id='name' />
                                </Col>
                                <Col>
                                    <Form.Label>Tipo</Form.Label>
                                    <Form.Control className={styles.formControl} as='input' id='type' />
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
                                    <Form.Group >
                                        <Form.Label>Lista de Insumos</Form.Label>
                                        <Form.Control className={styles.formControl} id='products' as='select' >
                                            <option>Selecione um Produto</option>
                                            {
                                                state.map(item => {
                                                    return (
                                                        <option key={item.id} value={item.id}>{item.name}</option>
                                                    );
                                                })
                                            }
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Form.Group>
                                    <Row>
                                        <Col>
                                            <Form.Label>Quantidade</Form.Label>
                                            <Form.Control className={styles.formControl} as='input' id='productAmount' defaultValue={state.amount} />
                                        </Col>
                                        <Col>
                                            <Form.Label>Unidade de Medida</Form.Label>
                                            <Form.Control className={styles.formControl} as='input' id='productUnit' defaultValue={state.unit} />
                                        </Col>
                                        <Col>
                                            <Form.Label />
                                            <input className={styles.button} onClick={handleSelectItem} type='button' id='include' value='Incluir' />
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Row>
                        </Form.Group>
                        <Container className={styles.containerButtons}>
                            <input className={styles.button} onClick={handleClickCreate} type='button' id='create' value='Criar' />
                            <Link href={{
                                pathname: '/procedures',
                                query: {
                                    category: `${category}`,
                                    token: `${token}`
                                }
                            }} as='/procedures'>
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
