package st.pro.browsergame.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Basic view controller to enable reaching the ranking page
 * 
 * @author GU
 */
@Controller
public class RankingController {

	@GetMapping("/ranking")
	public String redirectToRanking() {
		return "ranking";
	}

}