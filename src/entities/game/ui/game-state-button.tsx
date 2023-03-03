import { Sprite, useSprite } from '@/shared/ui/sprite';
import { useStore } from 'effector-react';
import { useMemo } from 'react';
import { $gameState, GameStates } from '../model';

type GameStateButtonProps = PrefixProps<JSX.IntrinsicElements['div'], 'on'>;

export const GameStateButton = (props: GameStateButtonProps) => {
  const state = useStore($gameState);

  const position = useMemo(() => {
    switch (state) {
      case GameStates.StartPress:
        return 2;
      case GameStates.MakeMove:
        return 3;
      case GameStates.Win:
        return 4;
      case GameStates.Lose:
        return 5;
      default:
        return 1;
    }
  }, [state]);

  const sprite = useSprite(2, position);

  if (state === null) {
    return null;
  }

  return <Sprite {...props} {...sprite} />;
};
