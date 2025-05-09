import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { ModalType } from '@/constants/modals';
import PaywallModal from '@/components/PaywallModal';

const ModalProvider: React.FC = () => {
  const activeModals = useSelector((state: RootState) => state.ui.activeModals);
  
  return (
    <>
      {activeModals.map((modal) => {
        // Render the appropriate modal based on type
        switch (modal.type) {
          case ModalType.PAYWALL:
            return (
              <PaywallModal 
                key={modal.id}
                modalId={modal.id}
                {...modal.props}
              />
            );
          // Add cases for other modal types as needed
          default:
            return null;
        }
      })}
    </>
  );
};

export default ModalProvider;