import 'dotenv/config';
import Queue from './app/lib/Queue';
import CreateAccount from './app/jobs/CreateAccount';

Queue.process(CreateAccount.handle);