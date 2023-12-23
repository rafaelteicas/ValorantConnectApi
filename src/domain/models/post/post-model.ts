import {type ElosModel, type AgentsModel} from '../game/valorant-model';

export interface PostModel {
  message?: string;
  elo: ElosModel;
  main: AgentsModel;
  other: AgentsModel[]
}

export interface PostListModel {
  perPage: string,
  page: string
}