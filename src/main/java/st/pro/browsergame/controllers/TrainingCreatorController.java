package st.pro.browsergame.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Basic view controller to enable reaching training creator page
 * @author GU
 */
@Controller
public class TrainingCreatorController {
	
	@GetMapping("/training_creator")
	public String redirectToTrainingCreatorPage() {
		return "training_creator";
	}

}