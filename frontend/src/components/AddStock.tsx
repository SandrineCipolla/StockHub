import React, {useEffect, useState} from 'react';
import {addStock} from "../utils/StockAPIClient.ts";
import Modal from 'react-modal';

//définit les propriétés que le composant AddStock
interface AddStockProps {
    onStockAdded: () => void;//une fonction sans argument qui est appelée lorsque l'ajout d'un stock est terminé. Cette fonction permet de notifier le composant parent (StocksList) pour qu'il puisse mettre à jour la liste des stocks.
}

const AddStock: React.FC<AddStockProps> = ({onStockAdded}) => {
    const [label, setLabel] = useState('');
    const [description, setDescription] = useState('');

    const [showForm, setShowForm] = useState(false);


    useEffect(() => {
        Modal.setAppElement('#root');
    }, []);

    const handleShowForm = () => {
        if (showForm) {
            setLabel('');
            setDescription('');
        }
        setShowForm(!showForm);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            console.info('Submitting form with values:', {LABEL: label, DESCRIPTION: description});
            await addStock(
                label,
                description,
            );

            setLabel('');
            setDescription('');
            setShowForm(false);
            onStockAdded();

        } catch (error) {
            console.error('Error in adding stock item', error);
        }
    };

    return (
        <div>
            <button onClick={handleShowForm}>+</button>
            <Modal
                isOpen={showForm}
                onRequestClose={handleShowForm}
                shouldCloseOnOverlayClick={false}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.2)'
                    },

                    content: {
                        width: 'auto',
                        height: 'auto',
                        margin: 'auto',
                    }
                }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-white p-4 rounded shadow-lg">
                <div>

                    <button onClick={handleShowForm}
                            className="absolute top-1 right-2 bg-purple-700 text-white rounded-full w-4 h-4 flex items-center justify-center">X
                    </button>

                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col mt-4 space-y-2">
                            <input type="text" value={label} onChange={e => setLabel(e.target.value)}
                                   placeholder="Label"
                                   required className="border p-2 rounded"/>
                            <input type="text" value={description} onChange={e => setDescription(e.target.value)}
                                   placeholder="Description" required className="border p-2 rounded"/>
                        </div>
                        <div className="flex justify-center mt-5">
                            <button type="submit" className="p-2 bg-violet-700 text-white rounded">Add Stock</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default AddStock;