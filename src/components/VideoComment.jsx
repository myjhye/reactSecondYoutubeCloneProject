import { Typography } from "@mui/material";
import React from "react";

function VideoComment({ comment }) {
  return (
    <div>
      <h2>Video Comments</h2>
      <ul>
        {comment.map((commentItem) => (
          <li key={commentItem.id}>
            <div>
            <Typography color="#000">
                {commentItem.snippet.topLevelComment.snippet.authorDisplayName}
            </Typography>
              {/* 댓글 작성자 이미지 */}
              <img
                src={commentItem.snippet.topLevelComment.snippet.authorProfileImageUrl}
                alt="Commenter"
                style={{ width: "50px", height: "50px" }}
              />
            </div>
            <div>
              {/* 댓글 내용 */}
              <Typography color="#000">
                {commentItem.snippet.topLevelComment.snippet.textDisplay}
              </Typography>
              {/* 작성 날짜 */}
              <p>{commentItem.snippet.topLevelComment.snippet.publishedAt}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VideoComment;
