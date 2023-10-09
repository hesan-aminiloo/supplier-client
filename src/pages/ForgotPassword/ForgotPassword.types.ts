export type ForgotPasswordFormData = {
  email: string;
};

export enum ForgotPasswordFormStateEnums {
  RESET_PASSWORD = 'reset_password',
  RESET_LINK_SENT = 'reset_link_sent',
  EMAIL_INPUT = 'email_input',
}

export type ForgotPasswordFormState = `${ForgotPasswordFormStateEnums}`;
