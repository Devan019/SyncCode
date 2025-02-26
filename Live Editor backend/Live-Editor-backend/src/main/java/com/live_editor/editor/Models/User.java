package com.live_editor.editor.Models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String username;
    private String email;
    private String password;
    private String socketid;

    @OneToMany(cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<File> files;

    public User() {
    }

    public User(String username, String email_id, String password, List<File> files) {
        this.username = username;
        this.email = email_id;
        this.password = password;
        this.files = files;
    }

    public String getSocket_id() {
        return socketid;
    }

    public void setSocket_id(String socket_id) {
        this.socketid = socket_id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail_id() {
        return email;
    }

    public void setEmail_id(String email_id) {
        this.email = email_id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<File> getFiles() {
        return files;
    }

    public void setFiles(List<File> files) {
        this.files = files;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email_id='" + email + '\'' +
                ", password='" + password + '\'' +
                ", files=" + files +
                '}';
    }
}
