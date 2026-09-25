export type ToastType = 'info' | 'success' | 'warning' | 'error';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  timestamp: string;
  actionLabel?: string;
  onAction?: () => void;
}
