import data from '../data.json';
import Comment from './components/Comment/Comment';
import CommentBox from './components/CommentBox/CommentBox';
import amy from './assets/images/avatars/image-amyrobson.png';
import max from './assets/images/avatars/image-maxblagun.png';
import juliu from './assets/images/avatars/image-juliusomo.png';
import ramsemiron from './assets/images/avatars/image-ramsesmiron.png';
import { useEffect, useState } from 'react';

function App() {
  const commentsData = localStorage.getItem('data');
  let [commentsParse, setCommentsPasre] = useState<typeof data>(data);

  if (commentsData) {
    commentsParse = JSON.parse(commentsData);
  } else {
    commentsParse = { ...data };
    commentsParse.currentUser.image.png = juliu;
    commentsParse.comments[0].user.image.png = amy;
    commentsParse.comments[1].user.image.png = max;
    commentsParse.comments[1].replies[0].user.image.png = ramsemiron;
    commentsParse.comments[1].replies[1].user.image.png = juliu;
  }
  // commentsParse.currentUser.username = 'huy'
  useEffect(() => {
    return () => localStorage.setItem('data', JSON.stringify(commentsParse));
  })
  return (
    <div className="App">
      {
        commentsParse.comments.map(
          (comment, index) => 
            <Comment key={index} id={comment.id} createdAt={comment.createdAt} user={comment.user} score={comment.score} replies={comment.replies} content={comment.content}></Comment>
        )
      }
      <CommentBox></CommentBox>
    </div>
  )
}

export default App;
