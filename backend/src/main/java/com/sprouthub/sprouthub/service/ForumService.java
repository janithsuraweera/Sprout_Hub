package com.sprouthub.sprouthub.service;

import com.sprouthub.sprouthub.model.ForumPost;

import java.util.List;

public interface ForumService {
    ForumPost createForumPost(ForumPost forumPost);
    ForumPost getForumPostById(String id);
    List<ForumPost> getAllForumPosts();
    ForumPost updateForumPost(String id, ForumPost forumPost);
    void deleteForumPost(String id);
}