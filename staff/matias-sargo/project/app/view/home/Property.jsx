import { useState } from 'react';

import logic from '../../logic/index.js';
import formatTime from '../../util/formatTime.js';

import Button from '../library/Button.jsx';
import Image from '../library/Image';
import Paragraph from '../library/Paragraph';
import Heading from '../library/Heading.jsx';
import Container from '../library/Container.jsx';
import Confirm from '../common/Confirm';
import Input from '../library/Input.jsx';
import Label from '../library/Label.jsx';
import Form from '../library/Form.jsx';
import formatDate from '../../util/formatDate.js';

export default function Property({ property: currentProperty, onPropertyDeleted, onPropertyEdited, onBack }) {
    const [confirmMessage, setConfirmMessage] = useState(null);
    const [editPropertyVisible, setEditPropertyVisible] = useState(false);

    const handleDeletePropertyClick = () => setConfirmMessage('delete property?');

    const handleDeletePropertyAccept = () => {
        try {
            logic.deleteProperty(currentProperty.id)
                .then(() => onPropertyDeleted())
                .catch(error => {
                    console.error(error);
                    alert(error.message);
                });
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    const handleDeletePropertyCancel = () => setConfirmMessage(null);

    const handleEditPropertyClick = () => setEditPropertyVisible(true);

    const handleCancelEditPropertyClick = () => setEditPropertyVisible(false);

    const handleEditPropertySubmit = (event) => {
        event.preventDefault();

        const form = event.target;

        const editImageInput = form['edit-image-input'];
        const editTitleInput = form['edit-title-input'];
        const editDescriptionInput = form['edit-description-input'];
        const editLatitudeInput = form['edit-latitude-input'];
        const editLongitudeInput = form['edit-longitude-input'];
        const editPriceInput = form['edit-price-input'];
        const editTypeInput = form['edit-type-input'];

        const image = editImageInput.value;
        const title = editTitleInput.value;
        const description = editDescriptionInput.value;
        const latitude = editLatitudeInput.value;
        const longitude = editLongitudeInput.value;
        const price = editPriceInput.value;
        const type = editTypeInput.value;

        try {
            logic.updatePropertyData(currentProperty.id, { image, title, description, latitude, longitude, price, type })
                .then(() => {
                    setEditPropertyVisible(false);
                    onPropertyEdited();
                })
                .catch(error => {
                    console.error(error);
                    alert(error.message);
                });
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    return <article className='border-b border--b border-gray-500 ml-2 mr-2'>
        <Container>
            {currentProperty.images && currentProperty.images.length > 0 && (
                <Image src={currentProperty.images[0]} title={currentProperty.title} alt='property image' />
            )}
            <Heading className='mb-2 mt-2 font-bold text-lg'>{currentProperty.title}</Heading>
            <Paragraph>{currentProperty.description}</Paragraph>
            <Paragraph>
                <span className='font-bold text-slate-400'>location: </span>
                <span>{currentProperty.location.coordinates.join(', ')}</span>
            </Paragraph>
            <Paragraph>
                <span className='font-bold text-slate-400'>price: </span>
                <span>{currentProperty.price} $</span>
            </Paragraph>
            <Paragraph>
                <span className='font-bold text-slate-400'>type: </span>
                <span>{currentProperty.type}</span>
            </Paragraph>
            <Heading className='text-xs text-slate-500'>{currentProperty.owner.username}</Heading>
            <Time>{formatTime(new Date(currentProperty.date))}</Time>

            <Container>
                {currentProperty.owner.id === logic.getUserId() && <>
                    <Button onClick={handleDeletePropertyClick}>DELETE</Button>
                    <Button onClick={handleEditPropertyClick}>EDIT</Button>
                </>}
            </Container>

            {editPropertyVisible && <Form onSubmit={handleEditPropertySubmit}>
                <Label htmlFor='edit-image-input'>image</Label>
                <Input id='edit-image-input' defaultValue={currentProperty.images[0]} />
                <Label htmlFor='edit-title-input'>title</Label>
                <Input id='edit-title-input' defaultValue={currentProperty.title} />
                <Label htmlFor='edit-description-input'>description</Label>
                <Input id='edit-description-input' defaultValue={currentProperty.description} />
                <Label htmlFor='edit-latitude-input'>latitude</Label>
                <Input id='edit-latitude-input' defaultValue={currentProperty.location.coordinates[1]} />
                <Label htmlFor='edit-longitude-input'>longitude</Label>
                <Input id='edit-longitude-input' defaultValue={currentProperty.location.coordinates[0]} />
                <Label htmlFor='edit-price-input'>price</Label>
                <Input id='edit-price-input' defaultValue={currentProperty.price} />
                <Label htmlFor='edit-type-input'>type</Label>
                <Input id='edit-type-input' defaultValue={currentProperty.type} />

                <Button type='submit'>save</Button>
                <Button type='reset' onClick={handleCancelEditPropertyClick}>cancel</Button>
            </Form>}

            {confirmMessage && (<Confirm message={confirmMessage} onAccept={handleDeletePropertyAccept} onCancel={handleDeletePropertyCancel}></Confirm>)}
        </Container>
    </article>
}
