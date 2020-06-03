package st.pro.browsergame.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Basic view controller to enable reaching missions page
 * @author GU
 */
@Controller
public class MissionsController {
	
	@GetMapping("/missions")
	public String redirectToMissionsPage() {
		return "missions";
	}

}