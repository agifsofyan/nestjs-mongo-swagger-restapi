import Xendit from 'xendit-node';
import {X_SECRET_KEY, X_PUBLIC_KEY, X_TOKEN} from 'src/config/xendit.configuration';

const x = new Xendit({
  secretKey: X_SECRET_KEY,
});