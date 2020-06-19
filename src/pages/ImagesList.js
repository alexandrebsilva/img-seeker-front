import React, { Component } from 'react';
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

            receivedImages.images.map((image, idxCol) => {
                let photos = []
                image.images.map((i, idxPhoto) => {
                    photos.push(
                        <tr key={idxPhoto}>
                            <td>
                                {i.url}
                            </td>
                            <td>
                                {i.contentType}
                            </td>
                            <td>
                                <img src={i.url} key={i.url} alt='imgSeeker' height='70px' width='70px'></img>
                            </td>
                        </tr>
                    )
                })
                collectionsComponents.push((
                    < Card key={Math.random()} className="mt-3" >
                        <Card.Title>{image._id} - {photos.length} found images</Card.Title>
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th>url</th>
                                    <th>contentType</th>
                                    <th>Imagem</th>
                                </tr>
                            </thead>
                            <tbody>
                                {photos.map((photo) => (photo))}
                            </tbody>
                        </table>

                    </Card >)
                )
            })
            this.setState({ collections: collectionsComponents })
        })

        return (
            <>
                {
                    this.state.collections.length === 0 ?
                        <>
                            <Alert variant='warning'>There are no saved images</Alert>
                            <br />
                            <Link to='/images-list'>Search images</Link></> :
                        null
                }
                {this.state.collections.map((domain) => (domain))}
            </>

        );
    }
}

export default ImageList;
