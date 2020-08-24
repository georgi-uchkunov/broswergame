/**
 * 
 */
package st.pro.browsergame.rest;


import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import st.pro.browsergame.models.Mission;
import st.pro.browsergame.models.Training;
import st.pro.browsergame.repos.MissionRepository;


/**
 * @author Pc
 *
 */
@RestController
public class MissionRest {

	
	private MissionRepository missionRepo;


	@Autowired
	public MissionRest(MissionRepository missionRepo) {
		this.missionRepo = missionRepo;
	}
	
	@PostMapping(value = "/createMission")
	public Mission mission(@RequestParam(name = "title") String title, @RequestParam(name="crystalCost") int crystalCost,
			@RequestParam(name="rewardGold") int rewardGold, @RequestParam(name="rewardGuildPoints") int rewardGuildPoints,
			@RequestParam(name="description") String description, @RequestParam(name="missionTime") int missionTime, 
			@RequestParam(name="statOne") String statOne, @RequestParam(name="statTwo") String statTwo, 
			@RequestParam(name="skillOne") String skillOne, @RequestParam(name="skillTwo") String skillTwo,
			@RequestParam(name="difficulty") String difficulty, @RequestParam(name = "image") String image) {
		final Mission newMission = new Mission(title, crystalCost, rewardGold, rewardGuildPoints, description, missionTime, 
				statOne, statTwo, skillOne, skillTwo, difficulty, image);
		return missionRepo.saveAndFlush(newMission);
	}
	
	@GetMapping("/getAllMissions")
    public Page<Mission> getAllMissions(Pageable pageable) {
        return missionRepo.findAll(pageable);
    }
	
	@PostMapping(value = "/updateMission")
	public Mission updateMission(Mission missionForUpdate) {

		return missionRepo.saveAndFlush(missionForUpdate);
	}
	
	@PostMapping("/deleteMission")
	public ResponseEntity<String> deleteMission(@RequestParam(name = "id") int id, HttpSession session) {
		List<st.pro.browsergame.models.Mission> missions = missionRepo.findAll();
		Mission missionForDelete = missions.stream().filter(mission -> id == mission.getId()).findFirst()
				.orElse(null);
		if (null != missionForDelete) {
			missions.remove(missionForDelete);
			missionRepo.deleteById(missionForDelete.getId());
		}
		return ResponseEntity.ok().body("Mission with id " + id + " has been deleted");
	}
	
}