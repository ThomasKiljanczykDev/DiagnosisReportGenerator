// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { type RootState } from '@/common/redux/store';
import { type AppDispatch } from '@/renderer/redux/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
