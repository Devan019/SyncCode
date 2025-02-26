package com.live_editor.editor.Controllers;

import com.live_editor.editor.Models.File;
import com.live_editor.editor.Repos.FileRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/files")
@CrossOrigin(value = "*")
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

