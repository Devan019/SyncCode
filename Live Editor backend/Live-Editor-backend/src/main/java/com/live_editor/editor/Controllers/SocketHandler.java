package com.live_editor.editor.Controllers;

import com.live_editor.editor.Models.User;
import com.live_editor.editor.Repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

//@Configuration
@Component
public class SocketHandler extends TextWebSocketHandler {
    private static final ConcurrentHashMap<String, String> socketIdMap = new ConcurrentHashMap<>();

    private final UserRepo userRepo;

    public SocketHandler(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String socketId = UUID.randomUUID().toString(); // Generate unique socket ID
        socketIdMap.put(session.getId(), socketId);

        // Extract user email from session (assuming it's stored in query parameters)
        String userEmail = getEmailFromSession(session);
        System.out.println(userEmail);

        if (userEmail != null && userRepo != null) {
            Optional<User> userOptional = userRepo.findByEmail(userEmail);

            if (userOptional.isPresent()) {
                User user = userOptional.get();
                user.setSocket_id(socketId); // Update socket_id
                userRepo.save(user); // Save to database

                System.out.println("Updated user " + userEmail + " with socket ID: " + socketId);
            } else {
                System.out.println("User not found for email: " + userEmail);
            }
        }

        // Send the socket ID to the client
        session.sendMessage(new TextMessage("socket_id:" + socketId));
        System.out.println("New WebSocket connection: " + socketId);
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        System.out.println("Received: " + message.getPayload());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        socketIdMap.remove(session.getId());
        System.out.println("WebSocket closed: " + session.getId());
    }

    private String getEmailFromSession(WebSocketSession session) {
        // Assuming the user email is passed as a query parameter: ws://localhost:8080/ws/code?email=user@example.com
        String query = session.getUri().getQuery();
        if (query != null && query.startsWith("email=")) {
            return query.substring(6); // Extract the email after "email="
        }
        return null;
    }
}
