import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, Modal, Form } from 'antd'
import { useStore, User } from '../store'
const { Column } = Table

import ModalForm from '../components/ModalForm'

interface Column {
  title: string
  dataIndex: string
  key: string
}

export default function HomePage() {
  const store = useStore()

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [currentId, setCurrentId] = useState<number | null>(null)
  const [formAdd] = Form.useForm()
  const [formEdit] = Form.useForm()

  // Handle double click on a row
  const onRow = (record: User) => ({
    onDoubleClick: () => {
      const { id, name, email, gender, address, phone } = record
      const formData = { name, email, gender, street: address.street, city: address.city, phone }
      setCurrentId(id)
      setIsEditModalOpen(true)
      formEdit.setFieldsValue(formData)
    }
  })

  // Close modals
  function closeAddModal() {
    setIsAddModalOpen(false)
  }

  function closeEditModal() {
    setIsEditModalOpen(false)
    setCurrentId(null)
  }

  // Submit modals
  function handleAddSubmit() {
    setIsAddModalOpen(false)
    const user = formAdd.getFieldsValue()
    store.addUser(user)
    formAdd.resetFields()
  }

  function handleEditSubmit() {
    setIsEditModalOpen(false)
    const user = formEdit.getFieldsValue()
    formEdit.resetFields()
    store.editUser(currentId, user)
  }

  // Add "key" props
  const items = store.users.map((user: User) => ({ ...user, key: user.id }))

  return (
    <div className="container">
      <header className="header">
        <Button type="primary" onClick={() => setIsAddModalOpen(true)}>
          Add new item
        </Button>
        <Link to="/chart">
          <Button>Go to pie chart</Button>
        </Link>
      </header>

      <Table dataSource={items} onRow={onRow} pagination={{ position: ['bottomCenter'] }}>
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Gender" dataIndex="gender" key="gender" />
        <Column title="Street" dataIndex="address" render={item => item.street} key="street" />
        <Column title="City" dataIndex="address" render={item => item.city} key="city" />
        <Column title="Phone" dataIndex="phone" key="phone" />
        <Column
          title="Action"
          key="action"
          render={item => <Button onClick={() => store.removeUser(item.id)}>Delete</Button>}
        />
      </Table>

      <Modal title="New item" centered open={isAddModalOpen} onOk={formAdd.submit} onCancel={closeAddModal}>
        <ModalForm form={formAdd} onFinish={handleAddSubmit} />
      </Modal>

      <Modal title="Edit item" centered open={isEditModalOpen} onOk={formEdit.submit} onCancel={closeEditModal}>
        <ModalForm form={formEdit} onFinish={handleEditSubmit} />
      </Modal>
    </div>
  )
}
