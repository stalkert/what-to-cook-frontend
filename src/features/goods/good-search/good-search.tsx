import React, { useCallback, useEffect, useState } from 'react';
import { AutoComplete } from 'antd';
import { useLazyGetGoodsQuery } from '../api/repository';
import { Good } from '../api/models/good.model';
import { debounce } from 'lodash';
import { useAddGoodToPurchaseMutation } from '../../purchases/api/repository';

const GoodSearch: React.FC = () => {
  const [searchGoodText, setSearchGoodText] = useState('');
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);

  const [triggerGetGoods, result] = useLazyGetGoodsQuery();
  const [addGoodToPurchase] = useAddGoodToPurchaseMutation();

  const onSelect = (goodId: string) => {
    setSearchGoodText('');
    debouncedGetGoods('');
    addGoodToPurchase({ goodId });
  };
  const debouncedGetGoods = useCallback(
    debounce((text) => {
      const page = 1;
      const size = 10;
      const search = text;

      triggerGetGoods({ page, size, search });
    }, 1000),
    [],
  );

  useEffect(() => {
    const page = 1;
    const size = 10;
    const search = '';

    triggerGetGoods({ page, size, search });
  }, []);

  useEffect(() => {
    const options = result.data?.items.map((item: Good) => ({ label: item.name, value: item.id })) || [];
    setOptions(options);
  }, [result.data]);

  const onSearchGoodText = (text: string) => {
    setSearchGoodText(text);
    debouncedGetGoods(text);
  };

  return (
    <>
      <AutoComplete
        value={searchGoodText}
        options={options}
        style={{ width: 200 }}
        onSelect={onSelect}
        onSearch={(text) => onSearchGoodText(text)}
        placeholder="input here"
      />
    </>
  );
};

export default GoodSearch;
