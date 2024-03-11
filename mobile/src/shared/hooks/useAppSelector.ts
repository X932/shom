import { useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { RootStoreState } from '@app-store';

export const useAppSelector: TypedUseSelectorHook<RootStoreState> = useSelector;
