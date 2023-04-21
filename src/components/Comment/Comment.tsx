import moment from 'moment';
import { IComment } from '../../dto/comment.dto';

import './Comment.css';

import plus from '../../assets/images/icon-plus.svg';
import minus from '../../assets/images/icon-minus.svg';
import reply from '../../assets/images/icon-reply.svg';
import deleteIcon from '../../assets/images/icon-delete.svg';
import edit from '../../assets/images/icon-edit.svg';

function Comment(props: IComment) {
  const isCurrentUser = props.user.username === "juliusomo";

  const now = moment();
  const past = moment(props.createdAt);

  const diff = moment.duration(now.diff(past))
  const time =  diff.years() ? `${diff.years()} ${diff.years() > 1 ? 'years' : 'year'} ago` :
                diff.months() ? `${diff.months()} ${diff.months() > 1 ? 'months' : 'month'} ago` :
                diff.weeks() ? `${diff.weeks()} ${diff.weeks() > 1 ? 'weeks' : 'week'} ago` :
                diff.days() ? `${diff.days()} ${diff.days() > 1 ? 'days' : 'day'} ago` :
                diff.hours() ? `${diff.hours()} ${diff.hours() > 1 ? 'hours' : 'hour'} ago` :
                diff.minutes() ? `${diff.minutes()} ${diff.minutes() > 1 ? 'minutes' : 'minute'} ago` :
                diff.seconds() ? `${diff.seconds()} ${diff.seconds() > 1 ? 'seconds' : 'second'} ago` : 'Just now';
  return (
    <div className='comment-section'>
        <div className="comment">
            <div className="score">
                <img src={plus} alt='Plus Icon' loading='lazy'></img>
                <span>{props.score}</span>
                <img src={minus} alt='Minus Icon' loading='lazy'></img>
            </div>
            <div className="comment-content">
                <div className='comment-title'>
                    <div className="comment-user">
                        <img src={props.user.image.png} alt={props.user.username} loading='lazy'></img>
                        <hgroup>
                            <h1>{ props.user.username }{isCurrentUser ? <span>you</span> : ''}</h1>
                            <p>{time}</p>
                        </hgroup>
                    </div>
                    <div className="comment-action">
                        { isCurrentUser ? 
                        <div className="btn-user">
                            <button className='btn-delete' type='button'>
                                <img src={deleteIcon} alt='Icon Delete'></img>
                                Delete
                            </button>
                            <button className='btn-edit' type='button'>
                                <img src={edit} alt='Icon Edit'></img>
                                Edit
                            </button>
                        </div> :  
                        <button className='btn-reply' type='button'>
                            <img src={reply} alt='Icon reply'></img>
                            Reply
                        </button>
                        }
                    </div>
                </div>
                <p>{props.content}</p>
            </div>
        </div>
        <div className='replies'>
            {props.replies?.map((reply, index) => <Comment key={index} id={reply.id} score={reply.score} user={reply.user} content={reply.content} createdAt={reply.createdAt} replies={reply.replies}></Comment>)}
        </div>
    </div>
    
  )
}

export default Comment;
