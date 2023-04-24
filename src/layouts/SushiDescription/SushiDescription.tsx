import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import SushiDesc from '../../components/SushiDesc/SushiDesc';
import SushiDescError from '../../components/SushiDesc/SushiDescError';
import SushiDescLoading from '../../components/SushiDesc/SushiDescLoading';
import { useAppDispatch } from '../../hooks';
import { fetchSushiById, selectSushi } from '../../store/slices/sushiSlice';

const SushiDescription: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { selectedSushi, status } = useSelector(selectSushi);

  useEffect(() => {
    dispatch(fetchSushiById(id)).catch((error) => console.log(error));
  }, []);

  const errorBlock = status === 'failed' && <SushiDescError />;
  const pending = status === 'pending' && <SushiDescLoading />;
  const succeeded = status === 'succeeded' && selectedSushi && (
    <SushiDesc {...selectedSushi} />
  );
  // ? нужна ли проверка на пустоту обьекта, по факту если несуществующий id ввести - это вызовет ошибку запроса
  // то есть нет необходимости в случае успеха проверять, но если бэк будет отдавать пустоту, то имеет смысл

  return (
    <>
      {errorBlock}
      {pending}
      {succeeded}
    </>
  );
};

export default SushiDescription;
