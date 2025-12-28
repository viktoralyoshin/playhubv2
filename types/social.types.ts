export interface IReview {
    id: string;
    user_id: string;
    game_id: string;
    rating: number;
    text: string;
    created_at: string;
    updated_at: string;
}

export interface ICreateReviewInput {
    game_id: string;
    text: string;
    rating: number;
}

export interface IGame {
    id: string;
    igdb_id: string;
    name: string;
    slug: string;
    summary: string;
    playhub_rating: number;
    igdb_rating: number;
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