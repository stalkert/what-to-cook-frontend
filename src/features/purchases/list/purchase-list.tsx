import React from 'react';
import './purchase-list.scss';
import { List } from 'antd';
import PurchaseItem from '../item/purchase-item';
import GoodSearch from '../../goods/good-search/good-search';
import { useGetPurchaseListQuery } from '../api/repository';

const PurchaseList: React.FC = () => {
  const { data } = useGetPurchaseListQuery();

  return (
    <List
      size="small"
      className="col-md-6 col-sm-12 col-xs-129"
      header={<GoodSearch />}
      footer={<div>Footer</div>}
      bordered
      dataSource={data}
      renderItem={(item: any) => (
        <List.Item>
          {<PurchaseItem id={item.good.id} name={item.good.name} isMeal={item.good.isMeal} checked={item.checked} />}
        </List.Item>
      )}
    />
  );
};

export default PurchaseList;
