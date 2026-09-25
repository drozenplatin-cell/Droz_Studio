import React from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { ToastMessage } from '../../types/toast';

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-8 right-6 z-50 flex flex-col space-y-2 pointer-events-none max-w-sm w-full select-none">
      {toasts.map((toast) => {
        let icon = <Info size={16} className="text-[#3574F0] shrink-0" />;
        let borderColor = 'border-[#393B40]';
        let badgeColor = 'bg-[#3574F0]/10 text-[#3574F0]';

        if (toast.type === 'success') {
          icon = <CheckCircle2 size={16} className="text-[#3DDC84] shrink-0" />;
          borderColor = 'border-[#3DDC84]/40';
          badgeColor = 'bg-[#3DDC84]/10 text-[#3DDC84]';
        } else if (toast.type === 'warning') {
          icon = <AlertTriangle size={16} className="text-[#E09F3E] shrink-0" />;
          borderColor = 'border-[#E09F3E]/40';
          badgeColor = 'bg-[#E09F3E]/10 text-[#E09F3E]';
        } else if (toast.type === 'error') {
          icon = <AlertCircle size={16} className="text-[#F25555] shrink-0" />;
          borderColor = 'border-[#F25555]/40';
          badgeColor = 'bg-[#F25555]/10 text-[#F25555]';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto bg-[#2B2D30] border ${borderColor} rounded-lg shadow-2xl p-3 flex items-start space-x-3 text-xs text-[#DFE1E5] backdrop-blur-md transform transition-all duration-300 animate-in fade-in slide-in-from-bottom-2`}
          >
            <div className="mt-0.5">{icon}</div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-[#DFE1E5]">{toast.title}</span>
                <span className="text-[10px] text-[#707278] font-mono ml-2">{toast.timestamp}</span>
              </div>
              {toast.description && (
                <p className="text-[11px] text-[#A9ACB3] mt-1 leading-snug break-words">
                  {toast.description}
                </p>
              )}
              {toast.actionLabel && toast.onAction && (
                <button
                  onClick={() => {
                    toast.onAction?.();
                    onDismiss(toast.id);
                  }}
                  className={`mt-2 px-2 py-0.5 rounded text-[10px] font-bold ${badgeColor} hover:opacity-90 transition`}
                >
                  {toast.actionLabel}
                </button>
              )}
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="text-[#707278] hover:text-[#DFE1E5] transition -mr-1 -mt-1 p-1"
              title="Dismiss notification"
            >
              <X size={12} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
