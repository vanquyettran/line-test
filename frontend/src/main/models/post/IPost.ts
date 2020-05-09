import {IImage} from '../image/IImage';
import {IVideo} from '../video/IVideo';
import {ISticker} from '../sticker/ISticker';
import {ICoupon} from '../coupon/ICoupon';
import {ILink} from '../link/ILink';
import {ISurvey} from '../survey/ISurvey';

/**
 * Post interface used by frontend code
 * this might be different than the interface on server
 */
export interface IPost {
  id: number,
  status: string,
  scheduledTime: number | null,
  contentType: string,
  contentData: IImage[] | IVideo | ISticker | ICoupon | ILink | ISurvey,
  createdTime: number,
  updatedTime: number
}
