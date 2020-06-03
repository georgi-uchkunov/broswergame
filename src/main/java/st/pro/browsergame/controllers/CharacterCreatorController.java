package st.pro.browsergame.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Basic view controller to enable reaching character creator page
 * @author GU
 */
@Controller
public class CharacterCreatorController {
	
	@GetMapping("/character_creator")
	public String redirectToCharacterCreatorPage() {
		return "character_creator";
	}

}
