import { Sprite, useSprite } from '@/shared/ui/sprite';
import { useStore } from 'effector-react';
import { useMemo } from 'react';
import { GameStates, GameStore } from '../model';

type GameControllerProps = {
  store: GameStore;
} & PrefixProps<JSX.IntrinsicElements['div'], 'on'>;

export const GameController = ({ store, ...props }: GameControllerProps) => {
  const state = useStore(store.$gameState);
  const movePressed = useStore(store.$movePressed);

  const position = useMemo(() => {
    if (movePressed) {
      return 3;
    }
    switch (state) {
      case GameStates.StartPress:
        return 2;
      case GameStates.Win:
        return 4;
      case GameStates.Lose:
        return 5;
      default:
        return 1;
    }
  }, [state, movePressed]);

  const sprite = useSprite(2, position);

  const handleClick = () => {
    store.restart();
  };

  const handleMouseDown = () => {
    store.startPress();
  };

  return (
    <Sprite
      {...props}
      {...sprite}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
    />
  );
};
