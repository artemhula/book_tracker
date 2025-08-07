import { useState } from 'react';

export const useModal = () => {
  const [isOpened, setIsOpened] = useState(false);

  const openModal = () => setIsOpened(true);
  const closeModal = () => setIsOpened(false);

  return { isOpened, openModal, closeModal };
};
