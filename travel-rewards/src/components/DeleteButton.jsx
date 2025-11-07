import { useState } from "react";
import Modal from "./Modal.jsx";

function DeleteButton({ itemId, deleteUrl, onDelete, children }) {
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);

    async function handleConfirmDelete() {
        setError(null);
        try {
            const response = await fetch(`${deleteUrl}/${itemId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            //If defined in the parent, call onDelete to refresh data
            if (onDelete) onDelete();
        } else {
            setError("Error deleting item");
        }

        } catch (err) {
            setError("Error deleting item: " + err.message);
        } finally {
            setShowModal(false);
        }
    }

    return (
        <>
        {/* Display the children displayed in the parent between <DeleteButton> */}
        <span onClick={() => setShowModal(true)}>
            {children}
        </span>

        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                Are you sure you want to delete this card?
                {error && <p className="red">{error}</p>}
                <div className="modalButtons">
                    <button onClick={handleConfirmDelete}>Confirm</button>
                    <button onClick={() => setShowModal(false)}>Cancel</button>
                </div>
            </Modal>
        )}
        </>
    );
}

export default DeleteButton;
