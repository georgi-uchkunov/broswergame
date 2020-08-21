/**
 * 
 */
package st.pro.browsergame.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


/**
 * Basic view controller to enable reaching training page
 * @author GU
 */
@Controller
public class TrainingController {

	@GetMapping("/training")
	public String redirectToTraining() {
		return "training";
	}
	
}