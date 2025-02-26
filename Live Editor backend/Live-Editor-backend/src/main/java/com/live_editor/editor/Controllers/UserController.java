package com.live_editor.editor.Controllers;

import com.live_editor.editor.Models.File;
import com.live_editor.editor.Models.User;
import com.live_editor.editor.Repos.FileRepo;
import com.live_editor.editor.Repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(value = "*")
public class UserController {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private FileRepo fileRepo;
    @PostMapping
    public User create(@RequestBody User user) {
        for (File file : user.getFiles()) {
            file.setUser(user);
        }

        System.out.println(user);
        Optional<User> exitUser = userRepo.findById(user.getId());
        if (exitUser.isPresent()) {
            System.out.println("in if cond");
            User user1 = exitUser.get();
            List<File> files = user1.getFiles();
            files.addAll(user.getFiles());
            return userRepo.save(user1);
        }
        user.setId(0);
        System.out.println("not in if");


        return userRepo.save(user);

    }


}
