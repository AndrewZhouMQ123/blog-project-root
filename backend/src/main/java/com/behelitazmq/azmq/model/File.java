package com.behelitazmq.azmq.model;

import jakarta.persistence.*;

@Entity
@Table(name = "photos")
public class File {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "vlog_id")
    private Vlog vlog;

    @Column(name="folder_name")
    private String folderName;

    @Column(name="file_name", nullable = true, length = 64)
    private String fileName;

    @Column(name="file_format")
    private String fileFormat;

    @Column(name = "file_size")
    private int fileSize;

    @Lob
    @Column(name = "data", columnDefinition="MEDIUMBLOB")
    private byte[] data;

    @Transient
    public String getPhotosImagePath() {
        if (fileName == null || id == 0) return null;
        // auto-increment starts from 1, 0 is not valid value

        return "/user-photos/" + id + "/" + fileName;
    }

    public long getId() {
        return id;
    }

    public Vlog getVlog() {
        return vlog;
    }

    public void setVlog(Vlog vlog) {
        this.vlog = vlog;
    }

    public int getFileSize() {
        return fileSize;
    }

    public void setFileSize(int fileSize) {
        this.fileSize = fileSize;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public String getFolderName() {
        return folderName;
    }

    public void setFolderName(String folderName) {
        this.folderName = folderName;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileFormat() {
        return fileFormat;
    }

    public void setFileFormat(String fileFormat) {
        this.fileFormat = fileFormat;
    }
}
