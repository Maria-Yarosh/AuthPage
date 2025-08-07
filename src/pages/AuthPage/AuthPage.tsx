import { useEffect, useState } from "react"
import { Modal } from "../../components/Modal/Modal"
import { AuthForm } from "./AuthForm/AuthForm"


function AuthPage() {
  const [isOpen, setIsOpen] = useState(false)

  const handleClickOpenModal = () => {
    setIsOpen(!isOpen)
  }

  const handleClickCloseModal = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    console.log('authPage mount')
    return () => {
        console.log('authPage unmount')
    }
  }, [])

  return (
    <>
     <button onClick={handleClickOpenModal}>Регистрация</button>
     <Modal open={isOpen} close={handleClickCloseModal}>
        <AuthForm />
     </Modal>
    </>
  )
}

export default AuthPage