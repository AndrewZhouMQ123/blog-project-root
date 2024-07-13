package com.behelitazmq.azmq.model;

import jakarta.persistence.*; // for Spring Boot 3

@Entity
@Table(name = "vlogs")
public class Vlog {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @OneToOne(mappedBy = "vlog", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private File file;

    @Column(name="title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "message")
    private String message;

    @Column(name = "submitted")
    private Boolean submitted;

    @Column(name = "uploaded")
    private Boolean uploaded;

    public Vlog() {

    }

    public Vlog(String title, String description, Boolean submitted)
    {
        this.title = title;
        this.description = description;
        this.submitted = submitted;
    }

    public File getFile() {
        return file;
    }

    public void setFile(File file) {
        this.file = file;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription (String description) {
        this.description = description;
    }

    public Boolean getSubmitted() {
        return submitted;
    }

    public void setSubmitted(Boolean submitted) {
        this.submitted = submitted;
    }

    public Boolean getUploaded() {
        return uploaded;
    }

    public void setUploaded(Boolean uploaded) {
        this.uploaded = uploaded;
    }


}
