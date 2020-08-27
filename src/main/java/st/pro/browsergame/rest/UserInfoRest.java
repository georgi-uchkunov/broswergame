/**
 * 
 */
package st.pro.browsergame.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import st.pro.browsergame.models.Mission;
import st.pro.browsergame.models.Purchase;
import st.pro.browsergame.models.ShopItem;
import st.pro.browsergame.models.Training;
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

	@PostMapping("/deleteUser")
	public ResponseEntity<String> deleteUser(@RequestParam(name = "id") int id, HttpSession session) {
		List<st.pro.browsergame.models.User> users = userRepo.findAll();
		User userForDelete = users.stream().filter(user -> id == user.getId()).findFirst().orElse(null);
		if (null != userForDelete) {
			users.remove(userForDelete);
			userRepo.deleteById(userForDelete.getId());
		}
		return ResponseEntity.ok().body("User with id: " + id + " has been deleted");
	}

	@PostMapping(value = "/updateUserGold")
	public User updateUserGold(@RequestParam(name = "id") int id,
			@RequestParam(name = "trainingCost") int trainingCost) {
		Optional<User> userForUpdate = userRepo.findById(id);
		if (userForUpdate.isPresent()) {
			User realUserForUpdate = userForUpdate.get();
			realUserForUpdate.setGold((short) (realUserForUpdate.getGold() - trainingCost));
			return userRepo.saveAndFlush(realUserForUpdate);
		}
		return null;

	}

	@PostMapping(value = "/updateUser")
	public User updateUser(User userForUpdate) {

		return userRepo.saveAndFlush(userForUpdate);

	}

	@PostMapping(value = "/updateUserSansPassword")
	public User updateUser02(@RequestParam(name = "id") int id, @RequestParam(name = "email") String email,
			@RequestParam(name = "username") String username, @RequestParam(name = "address") String address,
			@RequestParam(name = "ingameName") String ingameName, @RequestParam(name = "gold") Short gold,
			@RequestParam(name = "crystal") Short crystal, @RequestParam(name = "guildPoints") Short guildPoints) {
		Optional<User> userForUpdate = userRepo.findById(id);
		if (userForUpdate.isPresent()) {
			User realUserForUpdate = userForUpdate.get();
			realUserForUpdate.setEmail(email);
			realUserForUpdate.setUsername(username);
			realUserForUpdate.setAddress(address);
			realUserForUpdate.setIngameName(ingameName);
			realUserForUpdate.setGold(gold);
			realUserForUpdate.setCrystal(crystal);
			realUserForUpdate.setGuildPoints(guildPoints);
			return userRepo.saveAndFlush(realUserForUpdate);
		}
		return null;
	}

	@GetMapping("/getAllUsers")
	public Page<User> getAllUsers(Pageable pageable) {
		return userRepo.findAll(pageable);
	}

	@GetMapping("/getAllUsersExceptAdmin")
	public ArrayList<User> getAllUsers() {
		List<User> users = userRepo.findAll();
		List<User> userList = new ArrayList<User>();
		for (int i = 0; i < users.size(); i++) {
			User currentUser = users.get(i);
			userList.add(currentUser);

		}
		userList.remove(0);
		return (ArrayList<User>) userList;

	}

}