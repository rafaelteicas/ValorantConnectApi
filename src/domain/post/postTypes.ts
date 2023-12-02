import {type Elos, type Agents} from '../game/valorantTypes';

export interface PostType {
  message: string;
  elo: Elos;
  main: Agents;
}
