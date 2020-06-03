package st.pro.browsergame.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Basic view controller to enable reaching admin portal page
 * @author GU
 */
@Controller
public class AdminPortalController {
	
	@GetMapping("/admin_portal")
	public String redirectToAdminPortal() {
		return "admin_portal";
	}

}