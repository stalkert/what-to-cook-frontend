import React, { useState } from 'react';
import { Table, Input, Space, Button } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useGetGoodsQuery } from '../api/repository';
import { Key, SortOrder } from 'antd/es/table/interface';
import { toast } from 'react-toastify';
import './good-list.scss';
import { useNavigate } from 'react-router-dom';
import { Good } from '../api/models/good.model';

const { Search } = Input;

interface TableParams {
  pagination?: TablePaginationConfig;
  field?: Key | readonly Key[];
  order?: SortOrder;
  search: string;
}

const columns: ColumnsType<Good> = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    className: 'name__column',
  },
  {
    title: 'Type',
    dataIndex: 'isMeal',
    sorter: true,
    render: (isMeal) => (isMeal ? 'Meal' : 'Good'),
  },
];

const GoodList: React.FC = () => {
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
    search: '',
  });
  const navigate = useNavigate();
  const page = tableParams.pagination?.current!;
  const size = tableParams.pagination?.pageSize!;
  const field = tableParams.field as string;
  const direction = tableParams.order === 'ascend' ? 'asc' : 'desc';
  const search = tableParams.search;
  const { data, error, isLoading } = useGetGoodsQuery({ page, size, field, direction, search });

  const onSearch = (search: string) => {
    setTableParams((tableParams) => ({ ...tableParams, search }));
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<Good> | SorterResult<Good>[],
  ) => {
    setTableParams({
      pagination,
      ...sorter,
      search,
    });

    if (error) {
      toast.error('Error during loading goods');
    }
  };

  const onCreate = () => {
    navigate(`/goods/create`);
  };

  return (
    <div>
      <div className="good-list__toolbar">
        <Search
          className="good-list__search"
          placeholder="Input good name"
          onSearch={onSearch}
          style={{ width: 200 }}
        />
        <Button type="primary" onClick={onCreate}>
          Create
        </Button>
      </div>
      <Table
        className="good-list"
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data?.items || []}
        pagination={{
          current: data?.current || 1,
          pageSize: data?.pageSize || 10,
          total: data?.total || 0,
        }}
        loading={isLoading}
        onRow={(record) => {
          return {
            onClick: () => {
              navigate(`/goods/${record.id}`);
            },
          };
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default GoodList;
