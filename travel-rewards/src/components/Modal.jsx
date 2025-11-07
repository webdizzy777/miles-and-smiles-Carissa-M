function Modal({ children }) {
  return (
    <div className="modalOverlay">
      <div className="modal">
        <h2>
          <span className="material-symbols-outlined orange">warning</span>
          &nbsp;&nbsp;Delete!&nbsp;&nbsp;
          <span className="material-symbols-outlined orange">warning</span>
        </h2>
        {/* Display what is listed between the opening and closing tags of the Modal component in the parent */}
        <p>{children}</p>
      </div>
    </div>
  );
}

export default Modal;
