import { ReactElement } from 'react'

function Modal({
  showModal,
  setShowModal,
  children
}: {
  showModal: boolean
  setShowModal: (showModal: boolean) => void
  children: ReactElement
}) {
  if (!showModal) return null

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button onClick={() => setShowModal(false)}>Close</button>
        {children}
      </div>
    </div>
  )
}

export default Modal
