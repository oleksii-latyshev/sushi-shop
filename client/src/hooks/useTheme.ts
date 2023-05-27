import type { InitialStateSettings } from '../store/slices/settingsSlice';
import { setTheme } from '../store/slices/settingsSlice';
import { useAppDispatch, useAppSelector } from './hooks';

export const useTheme = (): [InitialStateSettings['theme'], () => void] => {
  const { theme } = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

  const toggleTheme = () => {
    const toggledTheme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', toggledTheme);
    dispatch(setTheme(toggledTheme));
  };

  return [theme, toggleTheme];
};
