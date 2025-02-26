package com.live_editor.editor.Repos;


import com.live_editor.editor.Models.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileRepo extends JpaRepository<File,Integer> {
}
