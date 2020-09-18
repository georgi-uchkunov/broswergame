/**
 * 
 */
package st.pro.browsergame.rest;

import java.time.Duration;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.Callable;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

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

import st.pro.browsergame.RunnableResourceUpdate;
import st.pro.browsergame.models.Mission;
import st.pro.browsergame.models.Purchase;
import st.pro.browsergame.models.ShopItem;
import st.pro.browsergame.models.Training;
import st.pro.browsergame.models.User;
import st.pro.browsergame.repos.UserRepository;

/**
 * Rest controller for receiving User info, depending on current logged in user
 * 
 * @author
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

	@PostMapping(value = "/updateUserCrystal")
	public User updateUserCrystal(@RequestParam(name = "id") int id,
			@RequestParam(name = "missionCost") int missionCost) {
		Optional<User> userForUpdate = userRepo.findById(id);
		if (userForUpdate.isPresent()) {
			User realUserForUpdate = userForUpdate.get();
			realUserForUpdate.setCrystal((short) (realUserForUpdate.getCrystal() - missionCost));
			return userRepo.saveAndFlush(realUserForUpdate);
		}
		return null;

	}

	@PostMapping(value = "/setAdminResources")
	public User setAdminResources(HttpSession session) {
		User currentUser = (User) session.getAttribute("currentUser");
		if (currentUser.getId() == 2) {
			Optional<User> userForUpdate = userRepo.findById(2);
			if (userForUpdate.isPresent()) {
				User realUserForUpdate = userForUpdate.get();
				realUserForUpdate.setGuildPoints(30000);
				realUserForUpdate.setCrystal((short) 30000);
				realUserForUpdate.setGold(30000);
				return userRepo.saveAndFlush(realUserForUpdate);
			}
		}
		return null;

	}

	@PostMapping(value = "/spendCrystalsOnNewHero")
	public ResponseEntity<String> spendCrystalsOnNewHero(final HttpSession session) {
		final User user = (User) session.getAttribute("currentUser");
		if (user != null) {
			if (user.getCrystal() >= 100) {
				user.setCrystal((short) (user.getCrystal() - 100));
				userRepo.saveAndFlush(user);
				return ResponseEntity.ok().body("Proceed with recruiting.");
			} else {
				return ResponseEntity.ok().body("Need more crystals.");
			}
		}
		return null;
	}

	@PostMapping(value = "/updateUser")
	public User updateUser(User userForUpdate) {

		return userRepo.saveAndFlush(userForUpdate);

	}

	@PostMapping(value = "/updateUserSansPassword")
	public User updateUserSansPassword(@RequestParam(name = "id") int id, @RequestParam(name = "email") String email,
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

	@PostMapping(value = "/updateCrystals")
	public User updateCrystals(@RequestParam(name = "id") int id) {
		Optional<User> userForUpdate = userRepo.findById(id);
		if (userForUpdate.isPresent()) {
			User realUserForUpdate = userForUpdate.get();
			realUserForUpdate.setCrystal((short) (realUserForUpdate.getCrystal() + 30));
			return userRepo.saveAndFlush(realUserForUpdate);

		}
		return null;

	}

	@PostMapping(value = "/updateCrystalsForAllUsers")
	public ArrayList<User> updateCrystalsForAllUsers() {
		List<User> users = userRepo.findAll();
		List<User> userList = new ArrayList<User>();
		for (int i = 0; i < users.size(); i++) {
			User currentUser = users.get(i);
			userList.add(currentUser);

		}
		userList.remove(0);
		for (int i = 0; i < userList.size(); i++) {
			User currentUser = userList.get(i);
			updateCrystals(currentUser.getId());
		}
		return (ArrayList<User>) userList;
	}

	@PostMapping(value = "/updateCrystalsDaily")
	public void updateCrystalsDaily() {
		ZonedDateTime now = ZonedDateTime.now(ZoneId.of("GMT+3"));
		ZonedDateTime nextRun = now.withHour(15).withMinute(35).withSecond(0);
		if (now.compareTo(nextRun) > 0)
			nextRun = nextRun.plusMinutes(1);

		Duration duration = Duration.between(now, nextRun);
		long initalDelay = duration.getSeconds();

		ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
		scheduler.scheduleAtFixedRate(new RunnableResourceUpdate(), initalDelay, TimeUnit.MINUTES.toSeconds(1),
				TimeUnit.SECONDS);
	}

	/*
	 * @PostMapping(value = "/updateCrystalsDaily") public void
	 * updateCrystalsDaily() { try { TimeUnit.MINUTES.sleep(1); } catch
	 * (InterruptedException e) { // TODO Auto-generated catch block
	 * e.printStackTrace(); } updateCrystalsForAllUsers(); updateCrystalsDaily(); }
	 */

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