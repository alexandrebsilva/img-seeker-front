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
            serverURL: 'http://localhost:4000',
            response: false,
            imgsReceived: [],
            url: '',
            loading: false,
        }
        this.socket = socketIOClient(this.state.serverURL)
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
            console.log(receivedInfo)
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
                    <h3>Digite a URL</h3>
                </Card.Title>
                <div>
                    {
                        !this.state.response ?
                            null :
                            images.length === 0 ?
                                <Alert variant='danger'>Url nao contem nenhuma imagem</Alert> :
                                <Alert variant='success'>
                                    {images.length} {images.length === 1 ? ' imagem encontrada' : 'imagens encontradas'}
                                    <hr />
                                    <Link to='/album?albumId='>Ver imagens encontradas</Link>
                                </Alert>
                    }
                    {/*images.map((image) => (
                        JSON.stringify(image)
                    ))*/}
                    <input type='text' name='url' onChange={this.onChangeUrlHandler} value={this.state.url} placeholder='digite a url'></input>
                    <Button type='button' className="btn btn-success ml-2" onClick={this.onSubmitUrl} disabled={this.state.loading}>{!this.state.loading ? 'Pesquisar' : 'Carregando...'}</Button>

                </div>
            </Card>
        );
    }
}
export default UrlForm