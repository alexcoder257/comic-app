import { get } from "./api/api";
import ApiConstants from "@/constants/ApiConstants";

export function getTrending(payload: any) {
  return get(`${ApiConstants.Trending}?${payload}`);
}

export function getAllGenres() {
  return get(ApiConstants.Genres);
}

export function getComicByGenre(payload: any) {
  return get(`${ApiConstants.ComicsByGenre}/${payload}`);
}

export function getSearchItem(payload: any) {
  return get(`${ApiConstants.Search}/${payload}`);
}

export function getSearchSuggest(payload: any) {
  return get(`${ApiConstants.SearchSuggest}?${payload}`);
}

export function getRecommendComic() {
  return get(ApiConstants.RecommendComics);
}

export function getNewComic(payload: any) {
  return get(`${ApiConstants.NewComics}?${payload}`);
}

export function getBoyComic(payload: any) {
  return get(`${ApiConstants.BoyComics}?${payload}`);
}

export function getGirlComic(payload: any) {
  return get(`${ApiConstants.GirlComics}?${payload}`);
}

export function getCompletedComic(payload: any) {
  return get(`${ApiConstants.CompletedComics}?${payload}`);
}

export function getRecentUpdateComic(payload: any) {
  return get(`${ApiConstants.RecentUpdateComics}?${payload}`);
}

export function getDetailCommic(payload: any) {
  return get(`${ApiConstants.ComicDetail}/${payload}`);
}

export function getComicChapter(payload: any) {
  return get(`${ApiConstants.ComicChapters}/${payload}/chapters`);
}

export function getSingleChapter(payload: any) {
  return get(
    `${ApiConstants.ComicSingleChapter}/${payload.comicId}/chapters/${payload.chapterId}`
  );
}

export function getTopAllComic(payload: any) {
  return get(`${ApiConstants.TopAllComic}?${payload}`);
}

export function getDailyComic(payload: any) {
  return get(`${ApiConstants.TopDaily}?${payload}`);
}

export function getWeeklyComic(payload: any) {
  return get(`${ApiConstants.TopWeekly}?${payload}`);
}

export function getMonthlyComic(payload: any) {
  return get(`${ApiConstants.TopMonthly}?${payload}`);
}

export function getTopChapter(payload: any) {
  return get(`${ApiConstants.TopChapter}?${payload}`);
}

export function getTopFollow(payload: any) {
  return get(`${ApiConstants.TopFollow}?${payload}`);
}

export function getTopComment(payload: any) {
  return get(`${ApiConstants.TopComment}?${payload}`);
}
