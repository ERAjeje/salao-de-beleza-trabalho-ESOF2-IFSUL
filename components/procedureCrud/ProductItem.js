import React from 'react'
import { Form, Row, Col, ListGroupItem } from 'react-bootstrap'

export default function ProductItem({ item, handleChangeProduct }) {
    let alteredItem = { productId: item.id, amount: item.amount, unit: item.unit };
    const handleChange = ({ target }) => {
        const amount = document.getElementById('productAmount').value;
        const unit = document.getElementById('productUnit').value;
        alteredItem.amount = amount;
        alteredItem.unit = unit;
        handleChangeProduct(alteredItem);
    }

    return (
        <ListGroupItem key={item.id} >
            <Form.Group onChange={handleChange}>
                <Row >
                    <Col>
                        <Form.Label>Produto</Form.Label>
                        <Form.Control className={styles.formControl} as='input' id='productName' defaultValue={item.name} />
                    </Col>
                    <Col>
                        <Form.Label>Quantidade</Form.Label>
                        <Form.Control className={styles.formControl} as='input' id='productAmount' defaultValue={item.amount} />
                    </Col>
                    <Col>
                        <Form.Label>Unidade de Medida</Form.Label>
                        <Form.Control className={styles.formControl} as='input' id='productUnit' defaultValue={item.unit} />
                    </Col>
                </Row>
            </Form.Group>
        </ListGroupItem>
    )
}
