import { Avatar, Grid, Typography } from "@mui/material";
import React from "react";
import { formatAgo } from "../utils/date";
import { LuThumbsUp } from 'react-icons/lu';

const commentStyle = {
  display: "flex",
  alignItems: "center",
};

const spacingStyle = {
  marginRight: "10px", // 여백 크기 조절
};

const likesContainerStyle = {
  display: "flex",
  alignItems: "center",
  marginTop: "10px", // 댓글 내용과의 여백 조절
};

const likeIconStyle = {
  marginRight: "5px", // 아이콘과 텍스트 사이 여백 조절
};

export default function VideoComment({ comments }) {
  function decodeHTML(html) {
    var txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  return (
    <div>
      <h3>댓글 {comments.length.toLocaleString()}개</h3>
      {comments.map((comment) => (
        <div key={comment.id} style={{ marginBottom: "20px" }}>
          <Grid container spacing={2}>
            <Grid item>
              <Avatar
                alt="Commenter"
                src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl}
                style={{ width: "50px", height: "50px" }}
              />
            </Grid>
            <Grid item xs={10}>
              <div style={commentStyle}>
                <Typography variant="subtitle1" color="textPrimary">
                  {comment.snippet.topLevelComment.snippet.authorDisplayName}
                </Typography>
                <div style={spacingStyle}></div>
                <Typography variant="body2" color="textSecondary">
                  {formatAgo(comment.snippet.topLevelComment.snippet.publishedAt, 'ko')}
                </Typography>
              </div>
              <Typography variant="body1" color="textPrimary">
                {decodeHTML(comment.snippet.topLevelComment.snippet.textDisplay)}
              </Typography>
              <div style={likesContainerStyle}>
                <LuThumbsUp style={likeIconStyle} />
                <Typography variant="body2" color="textSecondary">
                  {comment.snippet.topLevelComment.snippet.likeCount}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      ))}
    </div>
  );
}
