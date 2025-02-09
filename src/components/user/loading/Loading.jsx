import React from 'react'
import { Placeholder } from 'react-bootstrap';


export default function Loading() {
    return (
        <>
            <Placeholder xs={12} />
            <Placeholder xs={2} bg="primary" />
            <Placeholder xs={4} bg="secondary" />
            <Placeholder xs={6} bg="success" />
            <Placeholder xs={8} bg="danger" />
            <Placeholder xs={10} bg="warning" />
            <Placeholder xs={8} bg="info" />
            <Placeholder xs={10} bg="light" />
            <Placeholder xs={12} bg="dark" />

        </>
    )
}
