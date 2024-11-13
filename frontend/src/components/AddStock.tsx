import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {addStock} from "../utils/StockAPIClient.ts";
import Modal from 'react-modal';

//définit les propriétés que le composant AddStock
interface AddStockProps {
    onStockAdded: () => void;//une fonction sans argument qui est appelée lorsque l'ajout d'un stock est terminé. Cette fonction permet de notifier le composant parent (StocksList) pour qu'il puisse mettre à jour la liste des stocks.
}

//forwardRef pour passer un ref au composant AddStock
const AddStock = forwardRef<{ handleShowForm: () => void }, AddStockProps>(({onStockAdded}, ref) => {
    const [label, setLabel] = useState('');
    const [description, setDescription] = useState('');
    const [showForm, setShowForm] = useState(false);

    const [touched, setTouched] = useState({
        label: false,
        description: false
    });

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
//Expose handleShowForm via ref pour pouvoir l’appeler depuis le parent
    useImperativeHandle(ref, () => ({
        handleShowForm
    }));

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (label.trim() === '' || description.trim() === '') {
            setTouched({ label: true, description: true });
            return;
        }
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
            <Modal
                isOpen={showForm}
                onRequestClose={handleShowForm}
                shouldCloseOnOverlayClick={false}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        zIndex: 999,
                    },

                    content: {
                        width: '40%', // Ajuste la largeur à 60% de la fenêtre
                        height: 'auto',
                        margin: 'auto',
                        padding: '20px', // Augmente le padding pour un meilleur espacement
                        borderRadius: '8px', // Ajoute un rayon de bordure pour arrondir les coins du formulaire
                        backgroundColor: 'black', // Fond gris foncé avec opacité (bg-gray-800 bg-opacity-50)
                        border: '2px solid #A78BFA', // Bordure violette
                        boxShadow: '0 -2px 10px rgba(255, 255, 255, 0.2), 0 2px 10px rgba(255, 255, 255, 0.2)', // Halo similaire aux cartes
                        transition: 'box-shadow 0.3s ease-in-out, border 0.3s ease-in-out',
                    }
                }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-white p-4 rounded shadow-lg">
                <div>

                    <button onClick={handleShowForm}
                            className="absolute top-3 right-2 bg-violet-700 text-white rounded-full w-4 h-4 flex items-center justify-center shadow-lg hover:shadow-white transition duration-300">X
                    </button>

                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col mt-10 space-y-5">
                            {/* Champ Label avec validation */}
                            <input
                                type="text"
                                id="label"
                                name="label"
                                value={label}
                                onChange={e => setLabel(e.target.value)}
                                onFocus={() => setTouched({...touched, label: true})}
                                onBlur={() => setTouched({...touched, label: true})}
                                placeholder="Label"
                                className={`border p-2 rounded-lg bg-gray-800 text-white shadow focus:outline-none focus:ring-2 ${
                                    touched.label && label.trim() === '' ? 'border-red-500' : 'focus:ring-violet-500'
                                }`}
                                required
                            />
                            {touched.label && label.trim() === '' && (
                                <span className="text-red-500">Le label est requis</span>
                            )}

                            {/* Champ Description avec validation */}
                            <input
                                type="text"
                                id="description"
                                name="description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                onFocus={() => setTouched({...touched, description: true})}
                                onBlur={() => setTouched({...touched, description: true})}
                                placeholder="Description"
                                className={`border p-2 rounded-lg bg-gray-800 text-white shadow focus:outline-none focus:ring-2 ${
                                    touched.description && description.trim() === '' ? 'border-red-500' : 'focus:ring-violet-500'
                                }`}
                                required
                            />
                            {touched.description && description.trim() === '' && (
                                <span className="text-red-500">La description est requise</span>
                            )}
                        </div>

                        <div className="flex justify-center mt-5">
                            <button type="submit"
                                    className="p-3 bg-violet-700 text-white rounded-lg shadow transition duration-300 ease-in-out transform hover:bg-violet-600 hover:scale-105 hover:shadow-[0px_0px_15px_5px_rgba(255,255,255,0.5)]">Add
                                Stock
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
});

export default AddStock;