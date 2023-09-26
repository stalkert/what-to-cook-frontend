import React from 'react';
import { Checkbox, Space, Tag } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { CloseOutlined } from '@ant-design/icons';
import { useDeleteGoodFromPurchaseMutation, useUpdateGoodFromPurchaseMutation } from '../api/repository';

const PurchaseItem: React.FC<any> = ({ id, name, isMeal, checked }) => {
  const [deleteGoodFromPurchase] = useDeleteGoodFromPurchaseMutation();
  const [updateGoodFromPurchase] = useUpdateGoodFromPurchaseMutation();

  const onChange = (e: CheckboxChangeEvent) => {
    updateGoodFromPurchase(id);
  };

  const onDelete = () => {
    deleteGoodFromPurchase(id);
  };

  return (
    <div className="d-flex justify-content-between w-100">
      <Checkbox onChange={onChange} checked={checked}>
        {name}
      </Checkbox>
      <div className="d-flex justify-content-between align-items-center">
        <Space direction="vertical">{isMeal ? <Tag color="blue">fridge</Tag> : <Tag>store</Tag>}</Space>
        <CloseOutlined className="good__icon ms-4" onClick={onDelete} />
      </div>
    </div>
  );
};

export default PurchaseItem;
