import Link from 'next/link'
import React from 'react'
import { Container, Form, ListGroupItem, Row, Col } from 'react-bootstrap'

import { api } from '../../utils/api'
import { useRouter } from 'next/router'

import styles from '../../styles/Home.module.css'

export default function User({ users, category, token }) {
    const router = useRouter();

    const handleEditClick = async () => {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const id = document.getElementById('id').value;
        const user = {
            id,
            name,
            email
        }
        const res = await api.put('/user', user)
        if(res.status === 200){
            router.push({
                pathname: '/users',
                query: {
                    category,
                    token
                }
            }, '/users')
        } else {
            alert('Erro ao realizar a operação.')
        }
    }

    return (
        <Container className={styles.containerB} fluid={true} >
            {    category == 1
                ? <ListGroupItem key={users.id}>
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label>Id</Form.Label>
                                <Form.Control type='text' id='id' defaultValue={users.id} disabled />
                            </Col>
                            <Col>
                                <Form.Label>Nome</Form.Label>
                                <Form.Control className={styles.formControl} type='text' id='name' defaultValue={users.name} />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label>E-Mail</Form.Label>
                                <Form.Control className={styles.formControl} type='text' id='email' defaultValue={users.email} />
                            </Col>
                            <Col>
                                <Form.Label>Data de Criação</Form.Label>
                                <Form.Control type='text' id='createdAt' defaultValue={users.createdAt} disabled />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Container className={styles.containerButtons}>
                        <input className={styles.button} onClick={handleEditClick} type='button' id='edit' value='Editar' />
                        <Link href={{
                            pathname: '/users',
                            query: {
                                category: `${category}`,
                                token: `${token}`
                            }
                        }} as='/users'>
                            <input className={styles.button} type='button' id='cancel' value='Cancelar' />
                        </Link>
                    </Container>
                </ListGroupItem>
                : <ListGroupItem key={users.id} >
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label>Id</Form.Label>
                                <Form.Control type='text' id='id' value={users.id} disabled />
                            </Col>
                            <Col>
                                <Form.Label>Nome</Form.Label>
                                <Form.Control className={styles.formControl} type='text' id='name' value={users.name} />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label>E-Mail</Form.Label>
                                <Form.Control className={styles.formControl} type='text' id='email' value={users.email} />
                            </Col>
                            <Col>
                                <Form.Label>Celular</Form.Label>
                                <Form.Control className={styles.formControl} type='text' id='email' value={users.cellphone} />
                            </Col>
                            <Col>
                                <Form.Label>Data de Criação</Form.Label>
                                <Form.Control type='text' id='createdAt' value={users.createdAt} disabled />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Container className={styles.containerButtons}>
                        <input className={styles.button} type='button' id='edit' value='Editar' />
                        <Link href={{
                            pathname: '/users',
                            query: {
                                category: `${category}`,
                                token: `${token}`
                            }
                        }} as='/users'>
                            <input className={styles.button} type='button' id='cancel' value='Cancelar' />
                        </Link>
                    </Container>
                </ListGroupItem>}
        </Container >
    )
}
