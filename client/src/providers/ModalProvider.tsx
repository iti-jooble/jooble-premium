import React from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/redux/store";
import { ModalType } from "@/constants/modals";
import { closeModal } from "@/redux/slices/uiSlice";
import PaywallModal from "@/components/modals/PaywallModal";

const ModalProvider: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeModals = useSelector((state: RootState) => state.ui.activeModals);

  const handleCloseModal = (modalId: string) => {
    dispatch(closeModal(modalId));
  };

  return (
    <>
      {activeModals.map((modal) => {
        switch (modal.type) {
          case ModalType.PAYWALL:
            return (
              <PaywallModal
                key={modal.id}
                closeModal={() => handleCloseModal(modal.id)}
                {...modal.props}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
};

export default ModalProvider;
