import Link from 'next/link'
import React from 'react'
import { Container, Form, ListGroupItem, Row, Col } from 'react-bootstrap'

import { api } from '../../utils/api'
import { useRouter } from 'next/router'

import styles from '../../styles/Home.module.css'

export default function Product({ products, category, token }) {
    const router = useRouter();
    
    const handleEditClick = async () => {
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const type = document.getElementById('type').value;
        const id = document.getElementById('id').value;
        const unitQuantity = parseFloat(document.getElementById('unitQuantity').value);
        const purchasePrice = parseFloat(document.getElementById('id').value);
        console.log(id)
        const product = {
            id,
            name,
            description,
            type,
            unitQuantity,
            purchasePrice
        }
        const res = await api.put('/products/update', product)
        console.log(res)
        if(res.status === 200){
            router.push({
                pathname: '/products',
                query: {
                    category,
                    token
                }
            }, '/products')
        } else {
            alert('Erro ao realizar a operação.')
        }
    }

    return (
        <Container className={styles.containerB} fluid={true} >
                <ListGroupItem key={products.id}>
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label>Id</Form.Label>
                                <Form.Control type='text' id='id' defaultValue={products.id} disabled />
                            </Col>
                            <Col>
                                <Form.Label>Nome</Form.Label>
                                <Form.Control className={styles.formControl} type='text' id='name' defaultValue={products.name} />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label>Tipo</Form.Label>
                                <Form.Control className={styles.formControl} type='text' id='type' defaultValue={products.type} />
                            </Col>
                            <Col>
                                <Form.Label>Unidade (ml)</Form.Label>
                                <Form.Control className={styles.formControl} type='text' id='unitQuantity' defaultValue={products.unitQuantity} />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control className={styles.formControl} type='text' id='description' defaultValue={products.description} />
                            </Col>
                            <Col>
                                <Form.Label>Data de Criação</Form.Label>
                                <Form.Control type='text' id='createdAt' defaultValue={products.createdAt} disabled />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Container className={styles.containerButtons}>
                        <input className={styles.button} onClick={handleEditClick} type='button' id='edit' value='Editar' />
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
    )
}
