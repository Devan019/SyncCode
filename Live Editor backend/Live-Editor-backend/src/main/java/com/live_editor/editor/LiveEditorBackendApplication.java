package com.live_editor.editor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.live_editor.editor") // ✅ Ensure correct package scanning
public class LiveEditorBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(LiveEditorBackendApplication.class, args);
    }
}
