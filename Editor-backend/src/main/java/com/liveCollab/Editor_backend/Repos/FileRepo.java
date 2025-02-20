package com.liveCollab.Editor_backend.Repos;

import com.liveCollab.Editor_backend.Models.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestMapping;

@Repository
public interface FileRepo extends JpaRepository<File,Integer> {
}
