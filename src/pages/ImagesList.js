import React, { Component } from 'react';
import Gallery from 'react-photo-gallery'
import { Card, Alert, } from 'react-bootstrap';
import socketIOClient from 'socket.io-client'
import { Link } from 'react-router-dom'
class ImageList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collections: [],
            loading: true
        }
        this.socket = socketIOClient(process.env.REACT_APP_SERVER_URL)
    }

    render() {
        let collectionsComponents = []
        this.socket.on('listImages', (receivedImages) => {
            this.setState({ loading: receivedImages.loading })
            this.setState({ images: receivedImages.images })

            receivedImages.images.map((image, idxDomain) => {
                let photos = []
                image.images.map((i) => {
                    photos.push({ src: i.url, width: 4, height: 3 })
                })
                collectionsComponents.push((
                    <Card key={Math.random()} className="mt-3">
                        <Card.Title>{image._id} - {photos.length} imagens encontradas</Card.Title>
                        <Gallery photos={photos} />
                    </Card>)
                )
            })
            this.setState({ collections: collectionsComponents })
        })

        return (
            <>
                {this.state.collections.length === 0 ?
                    <>
                        <Alert variant='warning'>There are no saved images</Alert>
                        <br />
                        <Link to='/images-list'>Search images</Link></> :
                    null}
                {this.state.collections.map((domain) => (domain))}
            </>

        );
    }
}

export default ImageList;
