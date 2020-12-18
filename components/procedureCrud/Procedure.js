import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Container, Form, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap'
import ProductItem from '../procedureCrud/ProductItem'

import { api } from '../../utils/api'
import { useRouter } from 'next/router'

import styles from '../../styles/Home.module.css'

export default function Procedure({ procedures, category, token }) {
    const [productArray, setProductArray] = useState([])
    const router = useRouter();
    let products = [];
    let alteredProducts
    const aux = procedures.products;

    useEffect(() => {
        api.defaults.headers = { 'Authorization': `Bearer ${token}` };
        if (aux) {
            aux.map(item => {
                (async () => {
                    const res = await api.get(`/products/${item.productId}`);
                    const data = res.data.data;
                    const obj = { 'id': `${data.id}`, 'name': `${data.name}`, 'amount': `${item.amount}`, 'unit': `${item.unit}` };
                    products.push(obj);
                })()
            })
            setProductArray(products)
        }
    }, [aux]);

    const handleAlteredProduct = (product) => {
        alteredProducts = aux.filter(item => item.productId !== product.productId);
        alteredProducts.push(product);
    }

    const handleEditClick = async () => {
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const type = document.getElementById('type').value;
        const id = document.getElementById('id').value;
        const procedure = {
            id,
            name,
            description,
            type,
            products: alteredProducts
        }
        const res = await api.put('/procedure/update', procedure)
        console.log(res)
        if (res.status === 200) {
            router.push({
                pathname: '/procedures',
                query: {
                    category,
                    token
                }
            }, '/procedures')
        } else {
            alert('Erro ao realizar a operação.')
        }
    }

    return (
        <Container className={styles.containerB} fluid={true} >
            <ListGroupItem key={procedures.id}>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Label>Id</Form.Label>
                            <Form.Control as='input' id='id' defaultValue={procedures.id} disabled />
                        </Col>
                        <Col>
                            <Form.Label>Data de Criação</Form.Label>
                            <Form.Control as='input' id='createdAt' defaultValue={procedures.createdAt} disabled />
                        </Col>
                        <Col>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control className={styles.formControl} as='input' id='name' defaultValue={procedures.name} />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control className={styles.formControl} as='input' id='type' defaultValue={procedures.type} />
                        </Col>
                        <Col>
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control className={styles.formControl} as='input' id='description' defaultValue={procedures.description} />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Label>Lista de Insumos</Form.Label>
                            <ListGroup variant='flush'>
                                {
                                    productArray.map(item => {
                                        console.log(item.id)
                                        return <ProductItem item={item} itemFunction={handleAlteredProduct} />
                                    })
                                }
                            </ListGroup>
                        </Col>
                    </Row>
                </Form.Group>
                <Container className={styles.containerButtons}>
                    <input className={styles.button} onClick={handleEditClick} type='button' id='edit' value='Editar' />
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
    )
}
