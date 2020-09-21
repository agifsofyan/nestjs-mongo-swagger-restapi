import 'dotenv/config';

const {
    XENDIT_SECRET_KEY,
    XENDIT_PUBLIC_KEY,
    XENDIT_TOKEN_VERIFICATION
} = process.env;

export const X_SECRET_KEY = XENDIT_SECRET_KEY
export const X_PUBLIC_KEY = XENDIT_PUBLIC_KEY
export const X_TOKEN = XENDIT_TOKEN_VERIFICATION