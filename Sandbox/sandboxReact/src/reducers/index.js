import { combineReducers } from 'redux';

import letters from './letters';
import files from './files';

export default combineReducers({
    letters,
    files,
    files2
});