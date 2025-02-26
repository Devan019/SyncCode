package com.live_editor.editor.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "files")
public class File {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String code;
    private String filename;
    private String language;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    public File() {
    }

    public File(User user, String language, String filename, String code) {
        this.user = user;
        this.language = language;
        this.filename = filename;
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public  String getLanguage(){
        return this.language;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setLanguage(String language){
        this.language = language;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

