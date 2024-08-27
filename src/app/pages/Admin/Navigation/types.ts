type MinimizeToggleCallback = (minimized: boolean) => void;

export interface AdminNavigationProps {
  onMinimizeToggle: MinimizeToggleCallback;
}
