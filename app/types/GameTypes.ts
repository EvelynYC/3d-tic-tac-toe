import { Player, GameState } from "../utils/GameLogic";

export interface GameBoardProps {
  onColumnClick: (columnIndex: number) => void;
  currentPlayer: Player;
  gameState: GameState;
  onGameEnd?: (winner: Player) => void;
}

export interface GameStatus {
  isGameOver: boolean;
  winner: Player | null;
}

export interface TokenProps {
  position: [number, number, number];
  color: Player;
  scale?: number;
  animate?: boolean;
  isPreview?: boolean;
  tokenId?: string;
}

export interface VictoryAnimationProps {
  winner: Player;
}
