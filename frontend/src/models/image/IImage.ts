
/**
 * Post interface used by frontend code
 * this might be different than the interface on server
 */

export interface IImage {
  id: string,
  thumbnailUrl: string,
  originalUrl: string,
  width: number,
  height: number
}
