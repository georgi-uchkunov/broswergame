package st.pro.browsergame.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Basic view controller to enable reaching user panel page
 * @author GU
 */
@Controller
public class  UserPanelController{
	
	@GetMapping("/user_panel")
	public String redirectToUserPanel() {
		return "user_panel";
	}

}