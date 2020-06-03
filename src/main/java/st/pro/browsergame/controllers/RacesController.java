package st.pro.browsergame.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Basic view controller to enable reaching races page
 * @author GU
 */
@Controller
public class RacesController {
	
	@GetMapping("/races")
	public String redirectToRacesPage() {
		return "races";
	}

}
