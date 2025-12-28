export enum GameStatus {
    UNSPECIFIED = 0,
    PLAN = 1,
    PLAYING = 2,
    COMPLETED = 3,
    DROPPED = 4,
    WAITING = 5
}

export interface ILibraryEntry {
    user_id: string;
    game_id: string;
    status: GameStatus;
    created_at: string;
    updated_at: string;
}

export interface ILibraryStats {
    stats: number;
}

export interface IUpdateLibraryParams {
    gameId: string;
    status: GameStatus;
}

export interface IGetLibraryParams {
    page?: number;
    limit?: number;
}