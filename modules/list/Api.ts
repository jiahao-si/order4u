
import { get, post } from '../../common/request'

/**
 * 
 */
export const postDemo = (data: {
  domain: string
}) => {
  return post('/demo/api/manage/postdemo', data)
}