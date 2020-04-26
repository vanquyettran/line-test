import {IImage} from '../image/IImage';
import {IVideo} from '../video/IVideo';
import {ISticker} from '../sticker/ISticker';
import {ICoupon} from '../coupon/ICoupon';
import {ILink} from '../link/ILink';
import {ISurvey} from '../survey/ISurvey';

export interface IPost {
  id: number,
  type: string,
  status: string,
  scheduledTime?: number,
  images?: IImage[],
  video?: IVideo,
  sticker?: ISticker,
  coupon?: ICoupon,
  link?: ILink,
  survey?: ISurvey,
  createdAt: number,
  updatedAt: number
}
