package com.behelitazmq.azmq.model;

import jakarta.persistence.*; // for Spring Boot 3
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "vlogs")
public class Vlog {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    // Max 100 characters
    @Column(name = "title", nullable = false)
    @Size(max = 100, message = "Title must not exceed 100 characters.")
    private String title;

    // Max 500 words (Assuming ~5 characters per word on average)
    @Column(name = "description", nullable = false)
    @Size(max = 2500, message = "Description must not exceed 500 words.")
    private String description;

    // Video file path (assumed as String)
    @Column(name = "video_url", nullable = false)
    private String videoUrl;

    // Thumbnail file path (assumed as String)
    @Column(name = "thumbnail_url")
    private String thumbnailUrl;

    public Vlog() {
    }

    public Vlog(String title, String description, String videoUrl, String thumbnailUrl) {
        this.title = title;
        this.description = description;
        this.videoUrl = videoUrl;
        this.thumbnailUrl = thumbnailUrl;
    }

    public long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public String getThumbnailUrl() {
        return thumbnailUrl;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }

    public void setThumbnailUrl(String thumbnailUrl) {
        this.thumbnailUrl = thumbnailUrl;
    }

    @Override
    public String toString() {
        return "Vlog{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", videoUrl='" + videoUrl + '\'' +
                ", thumbnailUrl='" + thumbnailUrl + '\'' +
                '}';
    }
}