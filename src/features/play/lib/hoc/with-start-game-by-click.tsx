import { gameModel } from '@/entities/game';
import { useUnit } from 'effector-react';
import { ComponentType } from 'react';
import { start } from '../../model';

export const withStartGameByClick = <T,>(Component: ComponentType<T>) => {
  return ({ onClick, ...props }: T & { onClick?: () => void }) => {
    const startGame = useUnit(start);

    const handleClick = () => {
      startGame();
      onClick?.();
    };

    const handleMouseDown = () => {
      gameModel.changeGameState(gameModel.GameStates.StartPress);
    };

    return (
      <Component
        {...(props as T & JSX.IntrinsicAttributes)}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
      />
    );
  };
};
