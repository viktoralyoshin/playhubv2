export enum GameOrderBy {
    RELEASE_DATE = 0,
    RATING = 1,
}

export interface IGame {
    id: string;
    igdb_id: string;
    name: string;
    slug: string;
    summary: string;
    igdb_rating: number;
    playhub_rating: number;
    hypes: number;
    first_release_date: string;
    release_dates: string[];
    cover_url: string;
    artwork_urls: string[];
    screenshots: string[];
    genres: string[];
    themes: string[];
    platforms: string[];
    created_at: string;
    updated_at: string;
}

export interface IGameFilters {
    page?: number;
    limit?: number;
    q?: string;
}