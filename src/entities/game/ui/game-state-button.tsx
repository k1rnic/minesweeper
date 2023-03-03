import { Sprite } from '@/shared/ui/sprite';
import { useStore } from 'effector-react';
import { useMemo } from 'react';
import { $gameState, GameStates } from '../model';

const EMOJI_SPRITES_X = 0;
const EMOJI_SPRITES_Y = 24;
const EMOJI_SPRITES_W = 26;
const EMOJI_SPRITES_H = 26;

const getSpritesX = (num: number) => {
  const offset = EMOJI_SPRITES_W + 1;

  return offset * num;
};

type GameStateButtonProps = PrefixProps<JSX.IntrinsicElements['div'], 'on'>;

export const GameStateButton = (props: GameStateButtonProps) => {
  const state = useStore($gameState);

  const xPos = useMemo(() => {
    switch (state) {
      case GameStates.StartPress:
        return getSpritesX(1);
      case GameStates.MakeMove:
        return getSpritesX(2);
      case GameStates.Win:
        return getSpritesX(3);
      case GameStates.Lose:
        return getSpritesX(4);
      default:
        return EMOJI_SPRITES_X;
    }
  }, [state]);

  if (state === null) {
    return null;
  }

  return (
    <Sprite
      {...props}
      x={xPos}
      y={EMOJI_SPRITES_Y}
      width={EMOJI_SPRITES_W}
      height={EMOJI_SPRITES_H}
    />
  );
};
