/**
 * 
 */
package st.pro.browsergame.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


/**
 * @author Pc
 *
 */
@Controller
public class MissionCreatorController {

	@GetMapping("/mission_creator")
	public String redirectToMissionCreator() {
		return "mission_creator";
	}
	
}