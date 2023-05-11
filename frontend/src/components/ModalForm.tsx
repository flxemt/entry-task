import { Form, Input, Select } from 'antd'
import { FormInstance } from 'antd'

export default function ModalForm({ form, onFinish }: { form: FormInstance; onFinish: () => void }) {
  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email', type: 'email' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Please select your gender' }]}>
        <Select>
          <Select.Option value="male">Male</Select.Option>
          <Select.Option value="female">Female</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Street" name="street" rules={[{ required: true, message: 'Please enter your street' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="City" name="city" rules={[{ required: true, message: 'Please enter your city' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Phone" name="phone" rules={[{ required: true, message: 'Please enter your phone' }]}>
        <Input />
      </Form.Item>
    </Form>
  )
}
