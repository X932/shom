import { RootStoreState } from '@app-store';
import { useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

export const useAppSelector: TypedUseSelectorHook<RootStoreState> = useSelector;
