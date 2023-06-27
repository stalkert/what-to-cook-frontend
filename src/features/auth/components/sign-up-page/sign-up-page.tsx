import React, { useEffect } from 'react';
import { Form, Input, Button, Card, Space } from 'antd';
import './sign-up-page.scss';
import { Link, useNavigate } from 'react-router-dom';
import { SignUpFormValues } from '../../api/models/auth.model';
import { toast } from 'react-toastify';
import { ShopOutlined } from '@ant-design/icons';
import { useSignUpMutation } from '../../api/repository';

const SignUpPage: React.FC = () => {
  const [signUpUser, { isSuccess: isSuccessUserCreation, isError: isErrorUserCreation, error }] = useSignUpMutation();

  const navigate = useNavigate();

  const onFinish = async (values: SignUpFormValues) => {
    try {
      await signUpUser(values);
    } catch (e: any) {
      toast.error(e.message || "Something wen't wrong. Please, try again later");
    }
  };

  useEffect(() => {
    if (isSuccessUserCreation) {
      toast.success(`Account successfully created! Please login with your credentials.`);
      navigate('/sign-in');
    }
    if (isErrorUserCreation) {
      // @ts-ignore
      toast.error(error.data.message || "Something wen't wrong. Please, try again later");
    }
  }, [isSuccessUserCreation, isErrorUserCreation]);

  return (
    <div className="sign-up-page">
      <ShopOutlined className="icon" />
      <Card className="sign-up-form">
        <h2 className="form-title">What to cook</h2>
        <h3 className="form-title">Sign up page</h3>
        <Form name="sign-up-form" layout={'vertical'} onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                type: 'string',
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>
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
                Create account
              </Button>
              <div className="sign-up__link">
                <Link to="/sign-up"> Sign In</Link>
              </div>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default SignUpPage;
