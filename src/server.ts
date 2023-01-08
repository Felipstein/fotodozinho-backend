import { app } from './app';
import EnvProvider from './utils/EnvProvider';

app.listen(EnvProvider.port, () => console.log(`Server started at port ${EnvProvider.port}`));
