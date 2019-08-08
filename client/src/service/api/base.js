import Request from '../../utils/request';

export default class base {
  static get    = Request.get;
  static put    = Request.put;
  static post   = Request.post;
  static delete = Request.del;
}
