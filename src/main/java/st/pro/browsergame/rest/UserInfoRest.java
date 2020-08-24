/**
 * 
 */
package st.pro.browsergame.rest;

import java.util.Optional;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import st.pro.browsergame.models.User;
import st.pro.browsergame.repos.UserRepository;

/**
 * Rest controller for receiving User info, depending on current logged in user
 * 
 * @author IL
 */
@RestController
public class UserInfoRest {

	@Autowired
	private UserRepository userRepo;

	@GetMapping("/getCurrentUser")
	public User getCurrentUser(final HttpSession session) {
		return (User) session.getAttribute("currentUser");
	}

	@PostMapping(value = "/updateUser")
	public User updateUser(@RequestParam(name = "id") int id, @RequestParam(name = "gold") Short gold) {
		Optional<User> userForUpdate = userRepo.findById(id);
		if (userForUpdate.isPresent()) {
			User realUserForUpdate = userForUpdate.get();
			realUserForUpdate.setGold((short) (realUserForUpdate.getGold() - gold));
			return userRepo.saveAndFlush(realUserForUpdate);
		}
		return null;

	}

}