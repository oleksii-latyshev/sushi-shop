import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

import SushiDescription from '@/components/SushiDescription/SushiDescription';
import SushiDescError from '@/components/SushiDescription/SushiDescriptionError';
import SushiDescLoading from '@/components/SushiDescription/SushiDescriptionLoading';
import { useGetSushiByIdQuery } from '@/services/sushi.service';

const Sushi: React.FC = () => {
  const { id } = useParams();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const variant = Number(searchParams.get('variant'));

  const { isLoading, isError, isSuccess, data } = useGetSushiByIdQuery(id || '', {
    skip: !id,
  });

  const errorBlock = isError && <SushiDescError />;
  const pending = isLoading && <SushiDescLoading />;
  const succeeded = isSuccess && data && <SushiDescription {...data} variant={variant} />;

  return (
    <>
      {errorBlock}
      {pending}
      {succeeded}
    </>
  );
};

export default Sushi;
