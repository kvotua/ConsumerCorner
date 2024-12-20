export interface IConfirmModal {
  title: string;
  successButtonTitle?: string;
  cancelButtonTitle?: string;
  successButtonClass?: string;
  cancelButtonClass?: string;
  successButtonClick?: () => void;
  cancelButtonClick?: () => void;

  description?: string;
}
