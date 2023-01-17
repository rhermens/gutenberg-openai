import { registerBlockType } from '@wordpress/blocks';
import { Edit } from './edit';
import { Save } from './save';

import json from './block.json';

const { name } = json;

registerBlockType(name, {
    edit: Edit,
    save: Save,
})
