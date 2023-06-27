import React from 'react';
import { Form, Input, Button, Card, Space } from 'antd';
import { ShopOutlined } from '@ant-design/icons';
import './sign-in-page.scss';
import { useAuth } from '../../hooks/use-auth';
import { Link, useNavigate } from 'react-router-dom';
import { SignInFormValues } from '../../api/models/auth.model';
import { toast } from 'react-toastify';

const SignInPage: React.FC = () => {
  const { signIn } = useAuth();

  const navigate = useNavigate();

  const onFinish = async (values: SignInFormValues) => {
    try {
      await signIn(values);
      navigate('/');
    } catch (e) {
      toast.error("Something wen't wrong. Please, try again later");
    }
  };

  return (
    <div className="sign-in-page">
      <ShopOutlined className="icon" />
      <Card className="sign-in-form">
        <h2 className="form-title">What to cook sign-in page</h2>
        <Form name="sign-in-form" layout={'vertical'} onFinish={onFinish}>
          <Form.Item
            label="E-mail"
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please input your e-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <div>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button type="primary" htmlType="submit" block>
                Log in
              </Button>
              <div className="sign-up__link">
                <Link to="/sign-up"> Create account</Link>
              </div>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default SignInPage;
