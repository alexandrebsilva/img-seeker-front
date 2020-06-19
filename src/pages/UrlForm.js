import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'
import { Card, Button, Alert } from 'react-bootstrap';
import {
    Link
} from 'react-router-dom'
class UrlForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            response: false,
            imgsReceived: [],
            url: '',
            loading: false,
        }
        this.socket = socketIOClient(process.env.REACT_APP_SERVER_URL,)
    }

    onChangeUrlHandler = (event) => {
        this.setState({ url: event.target.value })
    }
    onSubmitUrl = () => {
        this.setState({ response: false })
        this.socket.emit('urlEventSubmit', this.state.url)
    }

    render() {
        this.socket.on('urlEventSubmit', (receivedInfo) => {
            if (!receivedInfo.loading && receivedInfo.data !== undefined) {
                this.setState({ response: true })
            }
            this.setState({ loading: receivedInfo.loading })
            this.setState({ imgsReceived: receivedInfo.data === undefined ? [] : receivedInfo.data })
        })
        const images = this.state.imgsReceived

        return (
            <Card>
                <Card.Title>
                    <h3>URL</h3>
                </Card.Title>
                <div>
                    {
                        !this.state.response ?
                            null :
                            images.length === 0 ?
                                <Alert variant='danger'>Url does not have any image or it is invalid</Alert> :
                                <Alert variant='success'>
                                    {images.length} {images.length === 1 ? ' image found' : 'images found'}
                                    <hr />
                                    <Link to='/images-list'>Ver imagens encontradas</Link>
                                </Alert>
                    }
                    {/*images.map((image) => (
                        JSON.stringify(image)
                    ))*/}
                    <input type='text' className='input-group-text w-100 mb-2' name='url' onChange={this.onChangeUrlHandler} value={this.state.url} placeholder='Type the URL you wish to seek the images'></input>
                    <Button type='button' className="btn btn-success ml-2" onClick={this.onSubmitUrl} disabled={this.state.loading}>{!this.state.loading ? 'Search' : 'Loading...'}</Button>

                </div>
            </Card>
        );
    }
}
export default UrlForm