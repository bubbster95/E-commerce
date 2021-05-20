import { collectionInfo } from './firebase';
import React from 'react';

export const collectCategories = React.createContext(
    collectionInfo('categories')
)
