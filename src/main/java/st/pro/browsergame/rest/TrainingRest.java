/**
 * 
 */
package st.pro.browsergame.rest;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import st.pro.browsergame.models.Character;
import st.pro.browsergame.models.Training;
import st.pro.browsergame.models.User;
import st.pro.browsergame.repos.TrainingRepository;

/**
 * @author Pc
 *
 */
@RestController
public class TrainingRest {

	private TrainingRepository trainingRepo;

	@Autowired
	public TrainingRest(TrainingRepository trainingRepo) {
		this.trainingRepo = trainingRepo;
	}

	@PostMapping(value = "/createTraining")
	public Training training(@RequestParam(name = "title") String title,
			@RequestParam(name = "trainingTime") int trainingTime,
			@RequestParam(name = "trainingSkill") String trainingSkill,
			@RequestParam(name = "trainingDifficulty") String trainingDifficulty,
			@RequestParam(name = "trainingCost") int trainingCost,
			@RequestParam(name = "description") String description,
			@RequestParam(name = "trainingImage") String trainingImage) {
		final Training newTraining = new Training(title, trainingTime, trainingSkill, trainingDifficulty, trainingCost,
				description, trainingImage);
		return trainingRepo.saveAndFlush(newTraining);
	}

	@GetMapping("/getAllTrainings")
	public Page<Training> getAllTrainings(Pageable pageable) {
		return trainingRepo.findAll(pageable);
	}

	@GetMapping(value = "/getTrainingById/{id}")
	public Training selectedTraining(@PathVariable int id) {
		return trainingRepo.findById(id).orElseThrow(null);
	}

	@GetMapping("/getSelectedTrainingById")
	public Training getSelectedTrainingById(@RequestParam(name = "id") int id) {
		List<Training> trainings = trainingRepo.findAll();
		for (int i = 0; i < trainings.size(); i++) {
			Training currentTraining = trainings.get(i);
			if (currentTraining.getId() == id) {
				return currentTraining;
			}

		}
		return null;
	}

	@PostMapping(value = "/updateTraining")
	public Training updateTraining(Training trainingForUpdate) {

		return trainingRepo.saveAndFlush(trainingForUpdate);
	}

	@PostMapping(value = "/updateTrainingTimesChosen")
	public Training updateTrainingTimesChosen(@RequestParam(name = "id") int id) {
		Optional<Training> trainingForUpdate = trainingRepo.findById(id);
		if (trainingForUpdate.isPresent()) {
			Training realTrainingForUpdate = trainingForUpdate.get();
			realTrainingForUpdate.setTimesChosen((realTrainingForUpdate.getTimesChosen() + 1));
			return trainingRepo.saveAndFlush(realTrainingForUpdate);
		}
		return null;

	}

	@PostMapping("/deleteTraining")
	public ResponseEntity<String> deleteTraining(@RequestParam(name = "id") int id, HttpSession session) {
		List<st.pro.browsergame.models.Training> trainings = trainingRepo.findAll();
		Training trainingForDelete = trainings.stream().filter(training -> id == training.getId()).findFirst()
				.orElse(null);
		if (null != trainingForDelete) {
			trainings.remove(trainingForDelete);
			trainingRepo.deleteById(trainingForDelete.getId());
		}
		return ResponseEntity.ok().body("Training with id " + id + " has been deleted");
	}

}