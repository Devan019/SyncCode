package com.liveCollab.Editor_backend.Models;


import jakarta.persistence.*;

@Entity
@Table(name = "files")
public class File {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String code;
    private String filename;

    public File() {
    }

    public File(String code, String filename) {
        this.code = code;
        this.filename = filename;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "File{" +
                "id=" + id +
                ", code='" + code + '\'' +
                ", filename='" + filename + '\'' +
                '}';
    }
}
