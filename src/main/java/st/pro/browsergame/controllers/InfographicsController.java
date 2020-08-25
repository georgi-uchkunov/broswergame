package st.pro.browsergame.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Basic view controller to enable reaching infographics page
 * @author GU
 */
@Controller
public class InfographicsController {
	
	@GetMapping("/infographics")
	public String  redirectToInfographics(){
		return "infographics";
	}

}