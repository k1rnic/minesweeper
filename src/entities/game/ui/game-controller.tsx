import { Sprite, useSprite } from '@/shared/ui/sprite';
import { useStore } from 'effector-react';
import { useMemo } from 'react';
import {
  $gameState,
  $movePressed,
  GameStates,
  restart,
  startPress,
} from '../model';

type GameStateButtonProps = PrefixProps<JSX.IntrinsicElements['div'], 'on'>;

export const GameController = (props: GameStateButtonProps) => {
  const state = useStore($gameState);
  const movePressed = useStore($movePressed);

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
    restart();
  };

  const handleMouseDown = () => {
    startPress();
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
