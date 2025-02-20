package com.liveCollab.Editor_backend.Controllers;


import com.liveCollab.Editor_backend.Models.File;
import com.liveCollab.Editor_backend.Repos.FileRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(name = "/files")
public class FileController {
    @Autowired
    private FileRepo fileRepo;

    @GetMapping
    public List<File> getFiles(){
        return fileRepo.findAll();
    }

    @PostMapping
    public File createFile(@RequestBody File file){
        return fileRepo.save(file);
    }

}
