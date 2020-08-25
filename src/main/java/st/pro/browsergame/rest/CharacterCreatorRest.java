package st.pro.browsergame.rest;

import java.util.ArrayList;
import java.util.List;

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

import st.pro.browsergame.models.Character;
import st.pro.browsergame.models.News;
import st.pro.browsergame.models.User;
import st.pro.browsergame.repos.CharacterRepository;
import st.pro.browsergame.repos.UserRepository;

@RestController
public class CharacterCreatorRest {

	private CharacterRepository charRepo;
	private UserRepository userRepo;

	@Autowired
	public CharacterCreatorRest(CharacterRepository charRepo, UserRepository userRepo) {
		this.charRepo = charRepo;
		this.userRepo = userRepo;
	}

	@PostMapping("/createCharacter")
	public ResponseEntity<Character> createCharacter(@RequestParam(name = "name") String name,
			@RequestParam(name = "race") String race, @RequestParam(name = "characterClass") String characterClass,
			@RequestParam(name = "level") int level, @RequestParam(name = "strength") int strength,
			@RequestParam(name = "agility") int agility, @RequestParam(name = "fortitude") int fortitude,
			@RequestParam(name = "intelligence") int intelligence, @RequestParam(name = "magic") int magic,
			@RequestParam(name = "luck") int luck, @RequestParam(name = "swordfighting") char swordfighting,
			@RequestParam(name = "acrobatics") char acrobatics, @RequestParam(name = "defense") char defense,
			@RequestParam(name = "investigation") char investigation,
			@RequestParam(name = "spellcasting") char spellcasting, @RequestParam(name = "gambit") char gambit,
			HttpSession session) {

		final User user = (User) session.getAttribute("currentUser");
		if (null == user) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}
		final Character character = new Character(name, race, characterClass, level, strength, agility, fortitude,
				intelligence, magic, luck, swordfighting, acrobatics, defense, investigation, spellcasting, gambit);
		character.setOwner(user);
		user.addCharacter(character);
		session.setAttribute("currentUser", userRepo.save(user));

		return ResponseEntity.ok(character);
	}

	@GetMapping("/getMyCharacters")
	public ResponseEntity<List<Character>> getAllCharacters(HttpSession session) {
		final List<Character> characters = new ArrayList<>();
		final User user = (User) session.getAttribute("currentUser");
		if (null == user) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(characters);
		} else {
			characters.addAll(user.getCharacters());
		}
		return ResponseEntity.ok(characters);
	}

	@GetMapping("/getAllCharacters")
	public Page<Character> getAllCharacters(Pageable pageable) {

		return charRepo.findAll(pageable);
	}

	@PostMapping("/deleteMyCharacter")
	public ResponseEntity<String> deleteCharacter(@RequestParam(name = "id") int id, HttpSession session) {
		final User user = (User) session.getAttribute("currentUser");
		if (null == user) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("");
		}
		List<st.pro.browsergame.models.Character> characters = user.getCharacters();
		Character characterForDelete = characters.stream().filter(character -> id == character.getId()).findFirst()
				.orElse(null);
		if (null != characterForDelete) {
			characters.remove(characterForDelete);
			session.setAttribute("currentUser", userRepo.save(user));
			// charRepo.delete(characterForDelete);
			charRepo.deleteById(characterForDelete.getId());
		}
		return ResponseEntity.ok().body("Character with id: " + id + " has been deleted");
	}
}
