import React, { useEffect, useState } from 'react';
import { Card, Checkbox, Form, Input, Modal } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateGoodMutation, useDeleteGoodMutation, useEditGoodMutation, useGetGoodQuery } from '../api/repository';
import './good-item.scss';
import CardHeader, { UiButton } from '../../../common/components/ui/card-header/card-header';
import { toast } from 'react-toastify';

const UserProfile: React.FC = () => {
  const { goodId } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { data: good, isLoading, isError } = useGetGoodQuery(goodId!, { skip: !goodId });
  const [createGood, { isSuccess: isSuccessGoodCreation, isError: isErrorGoodCreation, error: errorGoodCreation }] =
    useCreateGoodMutation();
  const [editGood, { isSuccess: isSuccessGoodEditing, isError: isErrorGoodEditing, error: errorGoodEditing }] =
    useEditGoodMutation();
  const [deleteGood, { isSuccess: isSuccessDeletion, isError: isErrorDeletion }] = useDeleteGoodMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [submittable, setSubmittable] = useState(false);

  // Watch all values
  const values = Form.useWatch([], form);

  useEffect(() => {
    form.validateFields(['name']).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      },
    );
  }, [values]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    deleteGood(goodId!);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async () => {
    try {
      !goodId ? await createGood(form.getFieldsValue()) : await editGood({ id: goodId, ...form.getFieldsValue() });
      console.log(form.getFieldsValue());
    } catch (e: any) {
      toast.error(e.message || "Something wen't wrong. Please, try again later");
    }
  };
  const cardActionButtons: UiButton[] = [
    {
      buttonTitle: 'Create',
      callback: onFinish,
      danger: false,
      isVisible: !goodId,
      disabled: !submittable,
    },
    {
      buttonTitle: 'Edit',
      callback: onFinish,
      danger: false,
      isVisible: !!goodId,
    },
    {
      buttonTitle: 'Delete',
      callback: showModal,
      danger: true,
      isVisible: !!goodId,
    },
  ].filter(({ isVisible }: UiButton) => isVisible);

  useEffect(() => {
    if (isSuccessDeletion) {
      toast.success(`${good?.name || 'Good'} successfully deleted!`);
      setIsModalOpen(false);
      navigate('/goods');
    }
    if (isErrorDeletion) {
      toast.error('Some error during good deletion!');
    }
  }, [isSuccessDeletion, isErrorDeletion]);

  useEffect(() => {
    const onSuccessGoodEditing = () => {
      toast.success(`Good successfully updated!`);
    };

    const onErrorGoodEditing = () => {
      // @ts-ignore
      toast.error(errorGoodEditing?.data?.message || "Something wen't wrong. Please, try again later");
    };

    if (isSuccessGoodEditing) {
      onSuccessGoodEditing();
    }
    if (isErrorGoodEditing) {
      onErrorGoodEditing();
    }
  }, [isSuccessGoodEditing, isErrorGoodEditing]);

  useEffect(() => {
    const onSuccessGoodCreation = () => {
      toast.success(`Good successfully created!`);
      navigate('/goods');
    };

    const onErrorGoodCreation = () => {
      // @ts-ignore
      toast.error(errorGoodCreation?.data?.message || "Something wen't wrong. Please, try again later");
    };

    if (isSuccessGoodCreation) {
      onSuccessGoodCreation();
    }
    if (isErrorGoodCreation) {
      onErrorGoodCreation();
    }
  }, [isSuccessGoodCreation, isErrorGoodCreation]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while loading user?.</div>;
  }

  if (!good && !!goodId) {
    return <div>Good not found.</div>;
  }
  const initialFormValue = !goodId ? { name: '', isMeal: false } : { name: good?.name, isMeal: good?.isMeal };

  return (
    <Card
      title={<CardHeader title="Good info" backBtnLink="/goods" isBackBtnVisible={true} buttons={cardActionButtons} />}
      style={{ width: '100%' }}
    >
      <div className="good-info">
        <Form form={form} name="good-info-form" layout={'vertical'} initialValues={initialFormValue}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                type: 'string',
                message: 'Please input good name',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="isMeal" valuePropName="checked">
            <Checkbox>Is Meal</Checkbox>
          </Form.Item>
        </Form>
      </div>
      <Modal title="Good deletion" centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Are you sure you want to delete {good?.name || 'this good'} ?</p>
      </Modal>
    </Card>
  );
};

export default UserProfile;
