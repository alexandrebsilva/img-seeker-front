import React, { Component } from 'react';
import Gallery from 'react-photo-gallery'
import { Card } from 'react-bootstrap';
import socketIOClient from 'socket.io-client'
class ImageList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            serverURL: 'http://localhost:4000',
        }
        this.socket = socketIOClient(this.state.serverURL)
    }

    render() {
        this.socket.on('listImages', (receivedImages) => {
            console.log('received', receivedImages)
        })
        const photos = [
            {
                src: 'https://suittech.com.br/img/portfolio/04-full.jpg',
                width: 4,
                height: 3
            },
            {
                src: 'https://suittech.com.br/img/portfolio/02-full.jpg',
                width: 1,
                height: 1
            },

        ];

        return (
            <Card>
                <Card.Title className='text-uppercase'>https://suittech.com.br</Card.Title>
                <Gallery photos={photos} />
            </Card>

        );
    }
}

export default ImageList;
