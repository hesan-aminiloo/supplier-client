export interface SendMessageProps {
  onSubmit: (
    message: string,
    actions: {
      reset: () => void;
    }
  ) => void;
  isSending?: boolean;
}
