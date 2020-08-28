package st.pro.browsergame.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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

import st.pro.browsergame.models.Character;
import st.pro.browsergame.models.News;
import st.pro.browsergame.models.Training;
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

	@GetMapping("/getSelectedCharacterById")
	public Character getAllUsers(@RequestParam(name = "id") int id) {
		List<Character> characters = charRepo.findAll();
		for (int i = 0; i < characters.size(); i++) {
			Character currentCharacter = characters.get(i);
			if (currentCharacter.getId() == id) {
				return currentCharacter;
			}

		}
		return null;
	}

	@PostMapping(value = "/switchCharacterStatus")
	public Character switchCharacterStatus(@RequestParam(name = "id") int id) {
		Optional<Character> characterForUpdate = charRepo.findById(id);
		if (characterForUpdate.isPresent()) {
			Character realCharacterForUpdate = characterForUpdate.get();
			realCharacterForUpdate.setBusy(!realCharacterForUpdate.isBusy());
			return charRepo.saveAndFlush(realCharacterForUpdate);
		}
		return null;

	}

	@GetMapping("/performTraining")
	public ResponseEntity<String> performTraining(@RequestParam(name = "trainingTime") int trainingTime,
			@RequestParam(name = "trainingSkill") String trainingSkill, @RequestParam(name = "id") int id,
			@RequestParam(name = "trainingDifficulty") String trainingDifficulty) {

		if (trainingTime == 300) {

			try {
				TimeUnit.MINUTES.sleep(1);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			updateHeroSkillBasedOnTraining(trainingSkill, id, trainingDifficulty);
			return ResponseEntity.ok().body("Training has been finished!");
		} else if (trainingTime == 900) {
			try {
				TimeUnit.MINUTES.sleep(2);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			updateHeroSkillBasedOnTraining(trainingSkill, id, trainingDifficulty);
			return ResponseEntity.ok().body("Training has been finished!");
		} else if (trainingTime == 1800) {
			try {
				TimeUnit.MINUTES.sleep(3);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			updateHeroSkillBasedOnTraining(trainingSkill, id, trainingDifficulty);
			return ResponseEntity.ok().body("Training has been finished!");
		} else if (trainingTime == 3600) {
			try {
				TimeUnit.MINUTES.sleep(4);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			updateHeroSkillBasedOnTraining(trainingSkill, id, trainingDifficulty);
			return ResponseEntity.ok().body("Training has been finished!");
		} else if (trainingTime == 5200) {
			try {
				TimeUnit.MINUTES.sleep(5);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			updateHeroSkillBasedOnTraining(trainingSkill, id, trainingDifficulty);
			return ResponseEntity.ok().body("Training has been finished!");
		}
		return null;

	}

	public void updateHeroSkillBasedOnTraining(String trainingSkill, int id, String trainingDifficulty) {
		switch (trainingSkill) {
		case "swordfighting":
			updateSwordfighting(id, trainingDifficulty);
			break;
		case "acrobatics":
			updateAcrobatics(id, trainingDifficulty);
			break;
		case "defense":
			updateDefense(id, trainingDifficulty);
			break;
		case "investigation":
			updateInvestigation(id, trainingDifficulty);
			break;
		case "spellcasting":
			updateSpellcasting(id, trainingDifficulty);
			break;
		case "gambit":
			updateGambit(id, trainingDifficulty);
			break;
		}
	}

	@PostMapping(value = "/updateSwordfighting")
	public Character updateSwordfighting(@RequestParam(name = "id") int id,
			@RequestParam(name = "trainingDifficulty") String trainingDifficulty) {
		Optional<Character> characterForUpdate = charRepo.findById(id);
		int progressIncrease = 0;
		if (trainingDifficulty.equalsIgnoreCase("Easy")) {
			progressIncrease = 1;
		} else if (trainingDifficulty.equalsIgnoreCase("Medium")) {
			progressIncrease = 2;
		} else if (trainingDifficulty.equalsIgnoreCase("Hard")) {
			progressIncrease = 3;
		}
		if (characterForUpdate.isPresent()) {
			Character realCharacterForUpdate = characterForUpdate.get();
			realCharacterForUpdate
					.setSwordfightingProgress(realCharacterForUpdate.getSwordfightingProgress() + progressIncrease);
			if (realCharacterForUpdate.getSwordfightingProgress() < 5) {
				realCharacterForUpdate.setBusy(false);
				return charRepo.saveAndFlush(realCharacterForUpdate);

			}

			if (realCharacterForUpdate.getSwordfightingProgress() >= 5) {
				if (realCharacterForUpdate.getSwordfighting() == 'E') {
					realCharacterForUpdate.setSwordfighting('D');
					realCharacterForUpdate.setSwordfightingProgress(0);
					realCharacterForUpdate.setBusy(false);
					return charRepo.saveAndFlush(realCharacterForUpdate);
				} else if (realCharacterForUpdate.getSwordfighting() == 'D') {
					realCharacterForUpdate.setSwordfighting('C');
					realCharacterForUpdate.setSwordfightingProgress(0);
					realCharacterForUpdate.setBusy(false);
					return charRepo.saveAndFlush(realCharacterForUpdate);
				} else if (realCharacterForUpdate.getSwordfighting() == 'C') {
					realCharacterForUpdate.setSwordfighting('B');
					realCharacterForUpdate.setSwordfightingProgress(0);
					realCharacterForUpdate.setBusy(false);
					return charRepo.saveAndFlush(realCharacterForUpdate);
				} else if (realCharacterForUpdate.getSwordfighting() == 'B') {
					realCharacterForUpdate.setSwordfighting('A');
					realCharacterForUpdate.setSwordfightingProgress(0);
					realCharacterForUpdate.setBusy(false);
					return charRepo.saveAndFlush(realCharacterForUpdate);
				} else if (realCharacterForUpdate.getSwordfighting() == 'A') {
					realCharacterForUpdate.setSwordfighting('S');
					realCharacterForUpdate.setSwordfightingProgress(0);
					realCharacterForUpdate.setBusy(false);
					return charRepo.saveAndFlush(realCharacterForUpdate);
				}
			}
		}
		return null;
	}

	@PostMapping(value = "/updateAcrobatics")
	public Character updateAcrobatics(@RequestParam(name = "id") int id,
			@RequestParam(name = "trainingDifficulty") String trainingDifficulty) {
		Optional<Character> characterForUpdate = charRepo.findById(id);
		int progressIncrease = 0;
		if (trainingDifficulty.equalsIgnoreCase("Easy")) {
			progressIncrease = 1;
		} else if (trainingDifficulty.equalsIgnoreCase("Medium")) {
			progressIncrease = 2;
		} else if (trainingDifficulty.equalsIgnoreCase("Hard")) {
			progressIncrease = 3;
		}
		if (characterForUpdate.isPresent()) {
			Character realCharacterForUpdate = characterForUpdate.get();
			realCharacterForUpdate
					.setAcrobaticsProgress(realCharacterForUpdate.getAcrobaticsProgress() + progressIncrease);
			if (realCharacterForUpdate.getAcrobaticsProgress() < 5) {
				realCharacterForUpdate.setBusy(false);
				return charRepo.saveAndFlush(realCharacterForUpdate);

			}

			if (realCharacterForUpdate.getAcrobaticsProgress() >= 5) {
				if (realCharacterForUpdate.getAcrobatics() == 'E') {
					realCharacterForUpdate.setAcrobatics('D');
					realCharacterForUpdate.setAcrobaticsProgress(0);
					realCharacterForUpdate.setBusy(false);
					return charRepo.saveAndFlush(realCharacterForUpdate);
				} else if (realCharacterForUpdate.getAcrobatics() == 'D') {
					realCharacterForUpdate.setAcrobatics('C');
					realCharacterForUpdate.setAcrobaticsProgress(0);
					realCharacterForUpdate.setBusy(false);
					return charRepo.saveAndFlush(realCharacterForUpdate);
				} else if (realCharacterForUpdate.getAcrobatics() == 'C') {
					realCharacterForUpdate.setAcrobatics('B');
					realCharacterForUpdate.setAcrobaticsProgress(0);
					realCharacterForUpdate.setBusy(false);
					return charRepo.saveAndFlush(realCharacterForUpdate);
				} else if (realCharacterForUpdate.getAcrobatics() == 'B') {
					realCharacterForUpdate.setAcrobatics('A');
					realCharacterForUpdate.setAcrobaticsProgress(0);
					realCharacterForUpdate.setBusy(false);
					return charRepo.saveAndFlush(realCharacterForUpdate);
				} else if (realCharacterForUpdate.getAcrobatics() == 'A') {
					realCharacterForUpdate.setAcrobatics('S');
					realCharacterForUpdate.setAcrobaticsProgress(0);
					realCharacterForUpdate.setBusy(false);
					return charRepo.saveAndFlush(realCharacterForUpdate);
				}
			}
		}
		return null;
	}

	@PostMapping(value = "/updateDefense")
	public Character updateDefense(@RequestParam(name = "id") int id,
			@RequestParam(name = "trainingDifficulty") String trainingDifficulty) {
		Optional<Character> characterForUpdate = charRepo.findById(id);
		int progressIncrease = 0;
		if (trainingDifficulty.equalsIgnoreCase("Easy")) {
			progressIncrease = 1;
		} else if (trainingDifficulty.equalsIgnoreCase("Medium")) {
			progressIncrease = 2;
		} else if (trainingDifficulty.equalsIgnoreCase("Hard")) {
			progressIncrease = 3;
		}
		if (characterForUpdate.isPresent()) {
			Character realCharacterForUpdate = characterForUpdate.get();
			realCharacterForUpdate.setDefenseProgress(realCharacterForUpdate.getDefenseProgress() + progressIncrease);
			if (realCharacterForUpdate.getDefenseProgress() < 5) {
				realCharacterForUpdate.setBusy(false);
				return charRepo.saveAndFlush(realCharacterForUpdate);

			}

			if (realCharacterForUpdate.getDefenseProgress() >= 5) {
				if (realCharacterForUpdate.getDefense() == 'E') {
					realCharacterForUpdate.setDefense('D');
					realCharacterForUpdate.setDefenseProgress(0);
					realCharacterForUpdate.setBusy(false);
					return charRepo.saveAndFlush(realCharacterForUpdate);
				} else if (realCharacterForUpdate.getDefense() == 'D') {
					realCharacterForUpdate.setDefense('C');
					realCharacterForUpdate.setDefenseProgress(0);
					realCharacterForUpdate.setBusy(false);
					return charRepo.saveAndFlush(realCharacterForUpdate);
				} else if (realCharacterForUpdate.getDefense() == 'C') {
					realCharacterForUpdate.setDefense('B');
					realCharacterForUpdate.setDefenseProgress(0);
					realCharacterForUpdate.setBusy(false);
					return charRepo.saveAndFlush(realCharacterForUpdate);
				} else if (realCharacterForUpdate.getDefense() == 'B') {
					realCharacterForUpdate.setDefense('A');
					realCharacterForUpdate.setDefenseProgress(0);
					realCharacterForUpdate.setBusy(false);
					return charRepo.saveAndFlush(realCharacterForUpdate);
				} else if (realCharacterForUpdate.getDefense() == 'A') {
					realCharacterForUpdate.setDefense('S');
					realCharacterForUpdate.setDefenseProgress(0);
					realCharacterForUpdate.setBusy(false);
					return charRepo.saveAndFlush(realCharacterForUpdate);
				}
			}
		}
		return null;
	}

	@PostMapping(value = "/updateInvestigation")
	public Character updateInvestigation(@RequestParam(name = "id") int id,
			@RequestParam(name = "trainingDifficulty") String trainingDifficulty) {
		Optional<Character> characterForUpdate = charRepo.findById(id);
		int progressIncrease = 0;
		if (trainingDifficulty.equalsIgnoreCase("Easy")) {
			progressIncrease = 1;
		} else if (trainingDifficulty.equalsIgnoreCase("Medium")) {
			progressIncrease = 2;
		} else if (trainingDifficulty.equalsIgnoreCase("Hard")) {
			progressIncrease = 3;
		}
		if (characterForUpdate.isPresent()) {
			Character realCharacterForUpdate = characterForUpdate.get();
			realCharacterForUpdate
					.setInvestigationProgress(realCharacterForUpdate.getInvestigationProgress() + progressIncrease);
			if (realCharacterForUpdate.getInvestigationProgress() < 5) {
				realCharacterForUpdate.setBusy(false);
				return charRepo.saveAndFlush(realCharacterForUpdate);

			}

			if (realCharacterForUpdate.getInvestigationProgress() >= 5) {
				if (realCharacterForUpdate.getInvestigation() == 'E') {
					realCharacterForUpdate.setInvestigation('D');
					realCharacterForUpdate.setInvestigationProgress(0);
					realCharacterForUpdate.setBusy(false);
					return charRepo.saveAndFlush(realCharacterForUpdate);
				} else if (realCharacterForUpdate.getInvestigation() == 'D') {
					realCharacterForUpdate.setInvestigation('C');
					realCharacterForUpdate.setInvestigationProgress(0);
					realCharacterForUpdate.setBusy(false);
					return charRepo.saveAndFlush(realCharacterForUpdate);
				} else if (realCharacterForUpdate.getInvestigation() == 'C') {
					realCharacterForUpdate.setInvestigation('B');
					realCharacterForUpdate.setInvestigationProgress(0);
					realCharacterForUpdate.setBusy(false);
					return charRepo.saveAndFlush(realCharacterForUpdate);
				} else if (realCharacterForUpdate.getInvestigation() == 'B') {
					realCharacterForUpdate.setInvestigation('A');
					realCharacterForUpdate.setInvestigationProgress(0);
					realCharacterForUpdate.setBusy(false);
					return charRepo.saveAndFlush(realCharacterForUpdate);
				} else if (realCharacterForUpdate.getInvestigation() == 'A') {
					realCharacterForUpdate.setInvestigation('S');
					realCharacterForUpdate.setInvestigationProgress(0);
					realCharacterForUpdate.setBusy(false);
					return charRepo.saveAndFlush(realCharacterForUpdate);
				}
			}
		}
		return null;
	}

	@PostMapping(value = "/updateSpellcasting")
	public Character updateSpellcasting(@RequestParam(name = "id") int id,
			@RequestParam(name = "trainingDifficulty") String trainingDifficulty) {
		Optional<Character> characterForUpdate = charRepo.findById(id);
		int progressIncrease = 0;
		if (trainingDifficulty.equalsIgnoreCase("Easy")) {
			progressIncrease = 1;
		} else if (trainingDifficulty.equalsIgnoreCase("Medium")) {
			progressIncrease = 2;
		} else if (trainingDifficulty.equalsIgnoreCase("Hard")) {
			progressIncrease = 3;
		}
		if (characterForUpdate.isPresent()) {
			Character realCharacterForUpdate = characterForUpdate.get();
			realCharacterForUpdate
					.setSpellcastingProgress(realCharacterForUpdate.getSpellcastingProgress() + progressIncrease);
			if (realCharacterForUpdate.getSpellcastingProgress() < 5) {
				realCharacterForUpdate.setBusy(false);
				return charRepo.saveAndFlush(realCharacterForUpdate);

			}

			if (realCharacterForUpdate.getSpellcastingProgress() >= 5) {
				if (realCharacterForUpdate.getSpellcasting() == 'E') {
					realCharacterForUpdate.setSpellcasting('D');
					realCharacterForUpdate.setSpellcastingProgress(0);
					realCharacterForUpdate.setBusy(false);
					return charRepo.saveAndFlush(realCharacterForUpdate);
				} else if (realCharacterForUpdate.getSpellcasting() == 'D') {
					realCharacterForUpdate.setSpellcasting('C');
					realCharacterForUpdate.setSpellcastingProgress(0);
					realCharacterForUpdate.setBusy(false);
					return charRepo.saveAndFlush(realCharacterForUpdate);
				} else if (realCharacterForUpdate.getSpellcasting() == 'C') {
					realCharacterForUpdate.setSpellcasting('B');
					realCharacterForUpdate.setSpellcastingProgress(0);
					realCharacterForUpdate.setBusy(false);
					return charRepo.saveAndFlush(realCharacterForUpdate);
				} else if (realCharacterForUpdate.getSpellcasting() == 'B') {
					realCharacterForUpdate.setSpellcasting('A');
					realCharacterForUpdate.setSpellcastingProgress(0);
					realCharacterForUpdate.setBusy(false);
					return charRepo.saveAndFlush(realCharacterForUpdate);
				} else if (realCharacterForUpdate.getSpellcasting() == 'A') {
					realCharacterForUpdate.setSpellcasting('S');
					realCharacterForUpdate.setSpellcastingProgress(0);
					realCharacterForUpdate.setBusy(false);
					return charRepo.saveAndFlush(realCharacterForUpdate);
				}
			}
		}
		return null;
	}

	@PostMapping(value = "/updateGambit")
	public Character updateGambit(@RequestParam(name = "id") int id,
			@RequestParam(name = "trainingDifficulty") String trainingDifficulty) {
		Optional<Character> characterForUpdate = charRepo.findById(id);
		int progressIncrease = 0;
		if (trainingDifficulty.equalsIgnoreCase("Easy")) {
			progressIncrease = 1;
		} else if (trainingDifficulty.equalsIgnoreCase("Medium")) {
			progressIncrease = 2;
		} else if (trainingDifficulty.equalsIgnoreCase("Hard")) {
			progressIncrease = 3;
		}
		if (characterForUpdate.isPresent()) {
			Character realCharacterForUpdate = characterForUpdate.get();
			realCharacterForUpdate.setGambitProgress(realCharacterForUpdate.getGambitProgress() + progressIncrease);
			if (realCharacterForUpdate.getGambitProgress() < 5) {
				realCharacterForUpdate.setBusy(false);
				return charRepo.saveAndFlush(realCharacterForUpdate);

			}

			if (realCharacterForUpdate.getGambitProgress() >= 5) {
				if (realCharacterForUpdate.getGambit() == 'E') {
					realCharacterForUpdate.setGambit('D');
					realCharacterForUpdate.setGambitProgress(0);
					realCharacterForUpdate.setBusy(false);
					return charRepo.saveAndFlush(realCharacterForUpdate);
				} else if (realCharacterForUpdate.getGambit() == 'D') {
					realCharacterForUpdate.setGambit('C');
					realCharacterForUpdate.setGambitProgress(0);
					realCharacterForUpdate.setBusy(false);
					return charRepo.saveAndFlush(realCharacterForUpdate);
				} else if (realCharacterForUpdate.getGambit() == 'C') {
					realCharacterForUpdate.setGambit('B');
					realCharacterForUpdate.setGambitProgress(0);
					realCharacterForUpdate.setBusy(false);
					return charRepo.saveAndFlush(realCharacterForUpdate);
				} else if (realCharacterForUpdate.getGambit() == 'B') {
					realCharacterForUpdate.setGambit('A');
					realCharacterForUpdate.setGambitProgress(0);
					realCharacterForUpdate.setBusy(false);
					return charRepo.saveAndFlush(realCharacterForUpdate);
				} else if (realCharacterForUpdate.getGambit() == 'A') {
					realCharacterForUpdate.setGambit('S');
					realCharacterForUpdate.setGambitProgress(0);
					realCharacterForUpdate.setBusy(false);
					return charRepo.saveAndFlush(realCharacterForUpdate);
				}
			}
		}
		return null;
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
