import React from 'react';
import { useParams } from 'react-router-dom';

import SushiDesc from '../../components/SushiDesc/SushiDesc';
import SushiDescError from '../../components/SushiDesc/SushiDescError';
import SushiDescLoading from '../../components/SushiDesc/SushiDescLoading';
import { useGetSushiByIdQuery } from '../../store/api/api';

const SushiDescription: React.FC = () => {
  const { id } = useParams();

  const { isLoading, isError, isSuccess, data } = useGetSushiByIdQuery(id || '', {
    skip: !id,
  });

  const errorBlock = isError && <SushiDescError />;
  const pending = isLoading && <SushiDescLoading />;
  const succeeded = isSuccess && data && <SushiDesc {...data} />;

  return (
    <>
      {errorBlock}
      {pending}
      {succeeded}
    </>
  );
};

export default SushiDescription;
