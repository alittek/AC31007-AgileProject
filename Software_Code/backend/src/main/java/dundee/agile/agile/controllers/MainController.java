package dundee.agile.agile.controllers;

import dundee.agile.agile.objects.LoginDetails;
import dundee.agile.agile.objects.User;
import dundee.agile.agile.repositories.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class MainController {

    private final UsersRepository usersRepository;

    @PostMapping("/login")
    public Long login(@RequestBody LoginDetails loginDetails) {
        Optional<User> user = usersRepository.findByUsernameEquals(loginDetails.getUsername());
        if (user.isPresent() && user.get().getPassword().equals(loginDetails.getPassword())) {
            return user.get().getId();
        }
        return -1L;
    }

    @PostMapping("/register")
    public Long registerUser(@RequestBody LoginDetails loginDetails) {
        User user = new User();
        user.setUsername(loginDetails.getUsername());
        user.setPassword(loginDetails.getPassword());
        user = usersRepository.save(user);
        return user.getId();
    }
}
