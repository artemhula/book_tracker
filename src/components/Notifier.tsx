import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast, Toaster } from 'sonner';
import { selectNotification } from '../redux/slices/notifierSlice';

export default function Notifier() {
  const notification = useSelector(selectNotification);
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
      default:
        break;
    }
  }, [notification]);

  return <Toaster richColors position="top-right" />;
}
