import Link from 'next/link'
import React from 'react'
import { Card, Col, Container, Form, Row } from 'react-bootstrap'

import { useRouter } from 'next/router'

import style from '../../styles/Home.module.css'

export default function CardComponent() {
    const router = useRouter();
    const token = router.query.token;
    const category = router.query.category;
    return (
        <Container className={style.containerB} fluid={true} >
            <Card>
                <Card.Body>
                    <Form.Group>
                        <Row md={12}>
                            <Col xs='7' >
                                <Form.Control className={style.formControl} type='text' placeholder='Busque aqui' />
                            </Col>
                            <Col >
                                <Form.Control className={style.formControl} type='button' value='Buscar' />
                            </Col>
                            <Col>
                                <Link href={{
                                    pathname: '/users/create',
                                    query: {
                                        category,
                                        token
                                    }
                                }} as='/users/create' >
                                    <Form.Control className={style.formControl} type='button' value='Criar Novo' />
                                </Link>
                            </Col>
                        </Row>
                    </Form.Group>
                </Card.Body>
            </Card>
        </Container>
    )
}
