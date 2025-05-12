package com.sprouthub.sprouthub.service;

import com.sprouthub.sprouthub.model.ForumPost;
import com.sprouthub.sprouthub.model.Comment;

import java.util.List;

public interface ForumService {
    ForumPost createForumPost(ForumPost forumPost);
    ForumPost getForumPostById(String id);
    List<ForumPost> getAllForumPosts();
    ForumPost updateForumPost(String id, ForumPost forumPost);
    void deleteForumPost(String id);
    Comment addComment(String postId, Comment comment);
    Comment updateComment(String postId, String commentId, Comment comment);
    void deleteComment(String postId, String commentId);
}