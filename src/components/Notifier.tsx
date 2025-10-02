import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, Toaster } from 'sonner';
import { reset, selectNotification } from '../redux/slices/notifierSlice';

export default function Notifier() {
  const notification = useSelector(selectNotification);
  const dispatch = useDispatch();

  useEffect(() => {
    switch (notification.type) {
      case 'Success':
        toast.success(notification.text);
        break;
      case 'Warning':
        toast.warning(notification.text);
        break;
      case 'Error':
        toast.error(notification.text);
        break;
    }

    dispatch(reset());
  }, [notification]);

  return <Toaster richColors position="top-right" />;
}
