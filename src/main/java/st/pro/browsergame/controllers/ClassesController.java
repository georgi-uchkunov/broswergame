package st.pro.browsergame.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Basic view controller to enable reaching classes page
 * @author GU
 */
@Controller
public class ClassesController {
	
	@GetMapping("/classes")
	public String redirectToClassesPage() {
		return "classes";
	}

}
