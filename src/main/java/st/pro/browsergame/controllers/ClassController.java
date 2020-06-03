package st.pro.browsergame.controllers;

import org.springframework.web.bind.annotation.GetMapping;

/**
 * Basic view controller to enable reaching classes page
 * @author GU
 */
public class ClassController {
	
	@GetMapping("/classes")
	public String redirectToClassPage() {
		return "classes";
	}

}
